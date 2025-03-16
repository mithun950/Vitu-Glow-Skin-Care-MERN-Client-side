/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";

import DeleteModal from "../../Components/Modal/DeleteModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CustomerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { name, image, category, price, quantity, _id, status, productId } =
    order;

  // handle order delete/cancellation
  const handleDelete = async () => {
    try {
      // Fetch delete request
      await axiosSecure.delete(`/order/${_id}`);
     
      // Increase quantity from plant collection
      await axiosSecure.patch(`/products/quantity/${productId}`, {
        quantityToUpdate: quantity,
        status: "increase",
      });
      // Call refetch(fetch orders data again)
      refetch();
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };

  return (
    <>

    <tr className="bg-white/10 bg-opacity-10 backdrop-blur-md text-white ">
      <td className="px-5 py-5 border-b border-gray-500 text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-500 text-sm">
        <p className="whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-500 text-sm">
        <p className="whitespace-no-wrap">{category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-500 text-sm">
        <p className="whitespace-no-wrap">{price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-500 text-sm">
        <p className="whitespace-no-wrap">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-500 text-sm">
        <p className="whitespace-no-wrap">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-500 text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative cursor-pointer">Cancel</span>
        </button>

        <DeleteModal
          handleDelete={handleDelete}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
    </>
  );
};

export default CustomerOrderDataRow;
