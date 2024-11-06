"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listOptions } from "@/api/order";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Empty from "@/components/Empty";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const orderList = useQuery(listOptions({ sort: "-1", sortBy: "created" }));

  useEffect(() => {
    if (orderList.data) {
      console.log("Order data:", orderList.data);
    }
  }, [orderList.data]);

  if (orderList.isLoading) return <Loading />;
  if (orderList.isError)
    return <Error message={orderList.error?.message || "An error occurred"} />;
  if (!orderList.data || orderList.data.length === 0) return <Empty />;

  // Filter and search logic
  const filteredOrders = orderList.data.filter((order) => {
    const matchesSearch =
      order.nid?.toString().includes(searchTerm) ||
      order.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen py-24 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          Your Orders
        </h1>

        {/* Search and Filter Section */}
        {/* ... (unchanged) ... */}

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center">
              <Package className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No orders found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "You haven't placed any orders yet."}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Link
                href={
                  order.type === "digital"
                    ? "/tutorial"
                    : `/shop/orders/${order._id}`
                }
                key={order._id || order.nid}
                className="block transition-shadow bg-white rounded-lg shadow hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Order #{order.nid || "N/A"}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status
                        ? order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        : "N/A"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                    <div>
                      <p className="text-gray-500">Ordered on</p>
                      <p className="font-medium">
                        {order.created
                          ? new Date(order.created).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Amount</p>
                      <p className="font-medium">
                        &#8377; {order.amount ? order.amount.toFixed(2) : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Items</p>
                      <p className="font-medium">
                        {order.items ? order.items.length : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payment</p>
                      <p
                        className={`font-medium ${
                          order.paymentStatus === "paid"
                            ? "text-green-600"
                            : order.paymentStatus === "failed"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.paymentStatus
                          ? order.paymentStatus.charAt(0).toUpperCase() +
                            order.paymentStatus.slice(1)
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {order.items &&
                      order.items
                        .slice(0, 2)
                        .map((item, index) => (
                          <img
                            key={index}
                            src={item.hero}
                            alt={item.name}
                            className="object-cover w-16 h-16 rounded"
                          />
                        ))}
                    {order.items && order.items.length > 2 && (
                      <div className="flex items-center justify-center w-16 h-16 text-sm text-gray-500 bg-gray-100 rounded">
                        +{order.items.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
