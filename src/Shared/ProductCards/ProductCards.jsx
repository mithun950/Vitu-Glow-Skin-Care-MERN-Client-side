import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { TbListDetails } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const ProductCards = ({ product }) => {
    const { productName, image, price, quantity, _id } = product || {};

    return (
        <div className="relative w-64  rounded-tl-[20px] rounded-br-[20px] backdrop-blur-lg border-gray-300  border-l-2 border-b-2 shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white/10 p-2">
            
            {/* Card Image */}
            <div className="w-full flex items-center justify-center ">
                <img
                    src={image}
                    alt={productName}
                    className="w-full h-auto max-h-48 object-contain transition-all duration-500 ease-in-out hover:scale-105"
                />
            </div>

            {/* Card Content */}
            <div className="p-4 text-white">
                <h3 className="text-md font-semibold text-nowrap">{productName}</h3>
                <p className="text-md font-medium flex items-center gap-1">
                    <FaBangladeshiTakaSign /> {price}
                </p>
                <p className="text-sm">{quantity ? `Stock: ${quantity}` : "Out of stock"}</p>

                {/* Buttons Section */}
                <div className="flex justify-between items-center mt-4">
                    <Link to={`/product/${_id}`} className="outline cursor-pointer text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-black">
                        <div className='flex items-center gap-2'>
                            <TbListDetails /> View Details
                        </div>
                    </Link>
                    <button className="text-white bg-white/10 cursor-pointer p-3 rounded-full transition-all duration-300 hover:bg-gray-900">
                        <FaShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCards;
