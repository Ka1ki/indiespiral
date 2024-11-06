"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getOneOptions } from "@/api/order";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentStatusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

export default function OrderPage() {
  const [isItemsExpanded, setIsItemsExpanded] = useState(true);

  const { uid } = useParams();
  const order = useQuery(getOneOptions(uid));
  if (order.isLoading) return <Loading />;
  if (order.isError) return <Error message={order.error.message} />;
  if (!order.data) return <Error message="Order not found" />;

  return (
    <div className="min-h-screen py-24 bg-gray-50">
      <div className="max-w-2xl px-4 mx-auto">
        <Link
          href="/shop/orders"
          className="inline-flex items-center mb-4 text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Orders
        </Link>
        <div className="bg-white rounded-lg shadow">
          {/* Order Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Order #{order.data.nid}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on {new Date(order.data.created).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium Rs {
										statusColors[order.data.status]
									}`}
                >
                  {order.data.status.charAt(0).toUpperCase() +
                    order.data.status.slice(1)}
                </span>
                <span
                  className={`mt-2 px-3 py-1 rounded-full text-sm font-medium Rs {
										paymentStatusColors[order.data.paymentStatus]
									}`}
                >
                  Payment:{" "}
                  {order.data.paymentStatus.charAt(0).toUpperCase() +
                    order.data.paymentStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping Details
                </h2>
                <div className="mt-3">
                  <p className="font-medium">{order.data.name}</p>
                  <p>{order.data.address.line1}</p>
                  {order.data.address.line2 && (
                    <p>{order.data.address.line2}</p>
                  )}
                  <p>
                    {order.data.address.city}, {order.data.address.state}{" "}
                    {order.data.address.postal}
                  </p>
                  <p>{order.data.address.country}</p>
                  <p className="mt-2">{order.data.phone}</p>
                  <p className="text-gray-600">{order.data.email}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rs {order.data.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Rs {order.data.totalShipping.toFixed(2)}</span>
                  </div>
                  {order.data.totalDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">
                        -Rs {order.data.totalDiscount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 mt-2 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>Rs {order.data.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6">
            <button
              className="flex items-center justify-between w-full mb-4"
              onClick={() => setIsItemsExpanded(!isItemsExpanded)}
            >
              <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
              {isItemsExpanded ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {isItemsExpanded && (
              <div className="space-y-4">
                {order.data.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.hero}
                      alt={item.name}
                      className="object-cover w-20 h-20 rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.variation}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Rs {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
