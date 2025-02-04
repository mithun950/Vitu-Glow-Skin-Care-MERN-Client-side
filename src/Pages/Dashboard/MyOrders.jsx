import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";

const MyOrders = ({ products }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["order", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/customer-order/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <div className="overflow-x-auto max-w-full">
        <table className="table-auto w-full mx-auto border-collapse border border-gray-300 backdrop-blur-md bg-white/10">
          <thead className="bg-white/20 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center text-white">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{order.name}</td>
                <td className="border border-gray-300 px-4 py-2">{order.category}</td>
                <td className="border border-gray-300 px-4 py-2">৳{order.price}</td>
                <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.status === "In Stock" ? (
                    <span className="text-green-400">{order.status}</span>
                  ) : (
                    <span className="text-red-400">{order.status}</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="outline text-white px-3 py-1 rounded hover:bg-red-500 cursor-pointer"
                    onClick={() => alert(`Action on ${order.name}`)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
