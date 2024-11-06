"use client";
import React, { useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  HomeIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as AddressApi from "@/api/address";

export default function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressType, setAddressType] = useState("home");
  const queryClient = useQueryClient();

  const { data: addresses = [], isLoading } = useQuery({
    mutateFn: AddressApi.getQueryOptions,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const addAddressMutation = useMutation({
    mutationFn: (newAddress) => {
      const options = AddressApi.createOptions(newAddress);
      return options.mutationFn();
    },
    onMutate: async (newAddress) => {
      await queryClient.cancelQueries(["/shop/address", "query"]);
      const previousAddresses = queryClient.getQueryData([
        "/shop/address",
        "query",
      ]);
      queryClient.setQueryData(["/shop/address", "query"], (old = []) => [
        ...old,
        { ...newAddress, uid: `temp-${Date.now()}` },
      ]);
      return { previousAddresses };
    },
    onError: (err, newAddress, context) => {
      queryClient.setQueryData(
        ["/shop/address", "query"],
        context.previousAddresses
      );
      toast.error(err.message || "Failed to add address");
    },
    onSuccess: () => {
      toast.success("Address added successfully");
      handleCloseModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["/shop/address", "query"]);
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ uid, data }) => {
      const options = AddressApi.updateOptions(uid, data);
      return options.mutationFn();
    },
    onMutate: async ({ uid, data }) => {
      await queryClient.cancelQueries(["/shop/address", "query"]);
      const previousAddresses = queryClient.getQueryData([
        "/shop/address",
        "query",
      ]);
      queryClient.setQueryData(["/shop/address", "query"], (old = []) =>
        old.map((address) =>
          address.uid === uid ? { ...address, ...data } : address
        )
      );
      return { previousAddresses };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["/shop/address", "query"],
        context.previousAddresses
      );
      toast.error(err.message || "Failed to update address");
    },
    onSuccess: () => {
      toast.success("Address updated successfully");
      handleCloseModal();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["/shop/address", "query"]);
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (uid) => {
      const options = AddressApi.deleteOptions(uid);
      return options.mutationFn();
    },
    onMutate: async (uid) => {
      await queryClient.cancelQueries(["/shop/address", "query"]);
      const previousAddresses = queryClient.getQueryData([
        "/shop/address",
        "query",
      ]);
      queryClient.setQueryData(["/shop/address", "query"], (old = []) =>
        old.filter((address) => address.uid !== uid)
      );
      return { previousAddresses };
    },
    onError: (err, uid, context) => {
      queryClient.setQueryData(
        ["/shop/address", "query"],
        context.previousAddresses
      );
      toast.error(err.message || "Failed to delete address");
    },
    onSuccess: () => {
      toast.success("Address deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["/shop/address", "query"]);
    },
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    setAddressType("home");
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingAddress) {
        await updateAddressMutation.mutateAsync({
          uid: editingAddress.uid,
          data: { ...formData, type: addressType },
        });
      } else {
        await addAddressMutation.mutateAsync({
          ...formData,
          type: addressType,
        });
      }
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  const handleDeleteAddress = async (uid) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddressMutation.mutateAsync(uid);
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const addressTypeIcons = {
    home: <HomeIcon className="w-6 h-6" />,
    office: <BuildingOffice2Icon className="w-6 h-6" />,
    other: <BuildingStorefrontIcon className="w-6 h-6" />,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-24">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">My Addresses</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
            disabled={addAddressMutation.isLoading}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="card bg-base-100 p-8 text-center">
            <BuildingStorefrontIcon className="w-12 h-12 mx-auto text-base-content/50" />
            <h3 className="mt-2 font-medium">No addresses</h3>
            <p className="mt-1 text-sm text-base-content/70">
              Get started by adding a new address.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-sm mt-4"
            >
              Add Address
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <AddressCard
                key={address.uid}
                address={address}
                onEdit={() => {
                  setEditingAddress(address);
                  setAddressType(address.type || "home");
                  setIsModalOpen(true);
                }}
                onDelete={() => handleDeleteAddress(address.uid)}
                icon={addressTypeIcons[address.type || "home"]}
              />
            ))}
          </div>
        )}

        {isModalOpen && (
          <AddressModal
            onClose={handleCloseModal}
            editingAddress={editingAddress}
            addressType={addressType}
            setAddressType={setAddressType}
            onSubmit={handleSubmit}
            isSubmitting={
              addAddressMutation.isLoading || updateAddressMutation.isLoading
            }
          />
        )}
      </div>
    </div>
  );
}

function AddressCard({ address, onEdit, onDelete, icon }) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              {icon}
            </div>
            <h3 className="text-lg font-medium">{address.name}</h3>
          </div>
          <div className="flex space-x-2">
            <button onClick={onEdit} className="btn btn-ghost btn-sm">
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="btn btn-ghost btn-sm text-error"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-start space-x-2">
            <MapPinIcon className="w-5 h-5 flex-shrink-0 text-base-content/50" />
            <p className="text-sm">
              {address.address}, {address.city}, {address.state} -{" "}
              {address.pincode}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-5 h-5 text-base-content/50" />
            <p className="text-sm">{address.phone}</p>
          </div>
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="w-5 h-5 text-base-content/50" />
            <p className="text-sm">{address.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddressModal({
  onClose,
  editingAddress,
  addressType,
  setAddressType,
  onSubmit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    ...editingAddress,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addressTypes = [
    { id: "home", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
    {
      id: "office",
      label: "Office",
      icon: <BuildingOffice2Icon className="w-6 h-6" />,
    },
    {
      id: "other",
      label: "Other",
      icon: <BuildingStorefrontIcon className="w-6 h-6" />,
    },
  ];

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h3>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={onClose}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Address Type
            </label>
            <div className="grid grid-cols-3 gap-4">
              {addressTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setAddressType(type.id)}
                  className={`btn ${
                    addressType === type.id ? "btn-primary" : "btn-ghost"
                  } flex-col h-auto gap-2 py-3`}
                >
                  {type.icon}
                  <span className="text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
              />
            </div>
            <Input
              label="PIN Code"
              name="pincode"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
              required
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {editingAddress ? "Updating..." : "Saving..."}
                </>
              ) : (
                <span>
                  {editingAddress ? "Update Address" : "Save Address"}
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
    </dialog>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
}
