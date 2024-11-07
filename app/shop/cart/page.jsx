"use client";
import React, { useEffect, useState } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import * as orderApi from "@/api/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import useCartStore from "@/stores/useCartStore";
import Loading from "@/components/Loading";
import { crud } from "@/api/crud";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Empty from "@/components/Empty";

export default function CartPage() {
  const [addressList, setAddressList] = useState([]);
  const [addressIndex, setAddressIndex] = useState(null);
  const [paymentMode, setPaymentMode] = useState("online");
  const [ordering, setOrdering] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const order = useQuery(orderApi.previewOrderOptions({ cart: cart }));
  const router = useRouter();

  if (cart.length == 0) return <Empty message="Your cart is empty" />;

  const handleQuantityChange = (productId, variantId, newQuantity) => {
    useCartStore
      .getState()
      .updateCartItemQuantity(productId, variantId, newQuantity);
  };

  const handleRemoveItem = (productId, variantId) => {
    useCartStore.getState().removeFromCart(productId, variantId);
  };

  async function completeOrder() {
    if (addressIndex === null) {
      toast.error("Please select a delivery address");
      return;
    }

    const orderDataT = {
      cart: cart,
      address: addressList[addressIndex]._id || addressList[addressIndex],
    };

    setOrdering(true);
    try {
      const res = await crud.post("/shop/order", orderDataT);
      if (res.error) throw new Error(res.error);

      if (paymentMode === "cod") {
        toast.success("Order Placed Successfully");
        useCartStore.getState().clearCart();
        router.push("/shop/orders/" + res.data._id);
        return;
      }

      const res2 = await crud.get("/shop/order/razorpay", {
        order_id: res.data._id,
      });
      if (res2.error) throw new Error(res2.error);

      useCartStore.getState().clearCart();
      const query = new URLSearchParams({
        orderId: res2.data.pgData.id,
        order: res.data._id,
        phone: addressList[addressIndex].phone,
      });
      router.push("/shop/payment?" + query.toString());
    } catch (error) {
      toast.error(error.message || "Failed to create order");
      console.error(error);
    } finally {
      setOrdering(false);
    }
  }

  if (order.isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingOverlay isLoading={ordering} />
      <div className="container px-4 py-8 mx-auto max-w-7xl lg:py-12">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 space-y-6 divide-y divide-gray-200">
                {order.data.items.map((item) => (
                  <CartItem
                    key={`${item.product}-${item.variant}`}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 lg:col-span-4 lg:mt-0">
            <div className="space-y-6">
              <OrderSummary
                totalCost={order.data.totalCost}
                totalPrice={order.data.totalPrice}
                totalShipping={order.data.totalShipping}
                totalDiscount={order.data.totalDiscount}
                amount={order.data.amount}
              />

              <AddressSelection
                addressList={addressList}
                setAddressList={setAddressList}
                selectedAddress={addressIndex}
                setSelectedAddress={setAddressIndex}
              />

              <PaymentModeSelection
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
              />

              <button
                onClick={completeOrder}
                className="w-full px-6 py-4 text-lg font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <div className="flex pt-6 first:pt-0">
      <div className="relative w-24 h-36 overflow-hidden rounded-lg sm:w-32">
        <img
          src={item.hero}
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-1 ml-4 sm:ml-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.variation}</p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              ₹{item.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.product, item.variant)}
            className="p-2 text-gray-400 transition-colors duration-200 rounded-full hover:bg-gray-100 hover:text-red-500"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center mt-4 sm:mt-auto">
          <div className="inline-flex items-center px-2 border border-gray-200 rounded-md">
            <button
              onClick={() =>
                onQuantityChange(
                  item.product,
                  item.variant,
                  Math.max(1, item.quantity - 1)
                )
              }
              className="p-1 text-gray-500 transition-colors hover:text-gray-600"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
            <button
              onClick={() =>
                onQuantityChange(item.product, item.variant, item.quantity + 1)
              }
              className="p-1 text-gray-500 transition-colors hover:text-gray-600"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({
  totalCost,
  totalPrice,
  totalShipping,
  totalDiscount,
  amount,
}) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">
            ₹{totalCost.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Discount</dt>
          <dd className="text-sm font-medium text-red-600">
            -₹{totalDiscount.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Shipping</dt>
          <dd className="text-sm font-medium text-gray-900">
            ₹{totalShipping.toFixed(2)}
          </dd>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <dt className="text-base font-medium text-gray-900">Order Total</dt>
            <dd className="text-base font-medium text-gray-900">
              ₹{amount.toFixed(2)}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}

function AddressSelection({
  addressList,
  setAddressList,
  selectedAddress,
  setSelectedAddress,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleNewAddressFormChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewAddress({ ...newAddress, [e.target.name]: value });
  };

  const handleNewAddressFormSubmit = (e) => {
    e.preventDefault();
    setSelectedAddress(addressList.length);
    setAddressList([...addressList, newAddress]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
      <div className="grid gap-4 mt-6 sm:grid-cols-2">
        {addressList.map((address, index) => (
          <div
            key={address._id}
            onClick={() => setSelectedAddress(index)}
            className={`cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
              selectedAddress === index
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
            }`}
          >
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{address.name}</p>
              <p className="text-sm text-gray-500">{address.address}</p>
              <p className="text-sm text-gray-500">
                {address.city}, {address.state} {address.pincode}
              </p>
              <p className="text-sm text-gray-500">{address.phone}</p>
            </div>
          </div>
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center h-full min-h-[120px] rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div className="space-y-1">
            <PlusIcon className="w-6 h-6 mx-auto text-gray-400" />
            <p className="text-sm font-medium text-blue-600">Add New Address</p>
          </div>
        </button>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newAddress={newAddress}
        onChange={handleNewAddressFormChange}
        onSubmit={handleNewAddressFormSubmit}
      />
    </div>
  );
}

function AddressModal({ isOpen, onClose, newAddress, onChange, onSubmit }) {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-gray-900"
                >
                  Add New Address
                </Dialog.Title>
                <button
                  className="absolute text-gray-400 top-4 right-4 hover:text-gray-500"
                  onClick={onClose}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={newAddress.name}
                    onChange={onChange}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={newAddress.phone}
                    onChange={onChange}
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={newAddress.email}
                    onChange={onChange}
                    required
                  />
                  <Input
                    label="Address"
                    name="address"
                    value={newAddress.address}
                    onChange={onChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={newAddress.city}
                      onChange={onChange}
                      required
                    />
                    <Input
                      label="State"
                      name="state"
                      value={newAddress.state}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <Input
                    label="PIN Code"
                    name="pincode"
                    value={newAddress.pincode}
                    onChange={onChange}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 mt-6 text-base font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Address
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
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

function PaymentModeSelection({ paymentMode, setPaymentMode }) {
  const paymentOptions = [
    {
      id: "online",
      title: "Online Payment",
      description: "Pay securely using Card, UPI, or Net Banking",
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      description: "Pay when your order arrives",
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
      <div className="mt-6 space-y-4">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`relative flex cursor-pointer rounded-lg border p-4 ${
              paymentMode === option.id
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <input
              type="radio"
              name="payment-mode"
              value={option.id}
              checked={paymentMode === option.id}
              onChange={() => setPaymentMode(option.id)}
              className="sr-only"
            />
            <div className="flex items-center">
              <div className="flex-shrink-0">{option.icon}</div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">{option.title}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
      {paymentMode === "online" && (
        <div className="p-4 mt-4 text-sm text-blue-700 bg-blue-50 rounded-lg">
          <p className="flex items-center">
            <svg
              className="flex-shrink-0 w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            You'll be redirected to our secure payment gateway to complete your
            payment
          </p>
        </div>
      )}
    </div>
  );
}

const LoadingOverlay = ({
  isLoading,
  message = "Processing your order...",
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="px-8 py-6 text-center bg-white rounded-lg shadow-xl">
        <div className="w-16 h-16 mx-auto border-4 border-gray-200 rounded-full border-t-blue-600 animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-900">{message}</p>
        <p className="mt-2 text-sm text-gray-500">
          Please don't close this window
        </p>
      </div>
    </div>
  );
};
