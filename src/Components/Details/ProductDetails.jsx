import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import PurchaseModal from '../Modal/PurcheaseModal';

const ProductDetails = () => {
    const { id } = useParams();
    let [isOpen, setIsOpen] = useState(false);

    // tanstack query
    const { data: product = {}, isLoading, refetch } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/product/${id}`);
            return data;
            
        }
    });

    const { category, description, image, price, productName, seller, quantity } = product;

    // loading
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
       < div className='pt-32'>
        <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-6 items-center justify-evenly bg-white/10 backdrop-blur-3xl rounded-tl-[30px] rounded-br-[40px] border-b border-l border-white/50 shadow-2xl p-6">
            <div className="flex justify-center items-center shadow-2xl bg-white/10 rounded-2xl">
                <img
                    src={image}
                    alt={productName}
                    className="max-h-[400px] object-contain rounded-xl shadow-lg"
                />
            </div>
            <div className="text-white space-y-4 w-full">
                <div>
                    <h2 className="text-2xl font-bold">{productName}</h2>
                    <p className="text-sm">Category: {category}</p>
                </div>
                <hr className="border-gray-300/50" />
                <div className="flex items-center gap-4">
                    <p>Seller: {seller?.name}</p>
                    {seller?.image && (
                        <img
                            src={seller.image}
                            alt={seller.name}
                            className="w-12 h-12 rounded-full border-2 border-white"
                        />
                    )}
                </div>
                <hr className="border-gray-300/50" />
                <div>
                    <p>{description}</p>
                </div>
                <hr className="border-gray-300/50" />
                <div>
                    <p>Quantity: {quantity}</p>
                </div>
                <hr className="border-gray-300/50" />
                <div className="flex justify-between items-center">
                    <h2 className="flex items-center text-lg font-semibold">
                        Price: <FaBangladeshiTakaSign className="ml-1" /> {price}
                    </h2>
                    <button
                        className={`px-4 py-2 font-semibold rounded-lg shadow-md ${
                            quantity > 0
                                ? 'outline cursor-pointer hover:bg-black text-white'
                                : 'bg-red-500 hover:bg-red-600 text-white cursor-not-allowed'
                        }`}
                        onClick={() => setIsOpen(true)}
                        disabled={quantity <= 0}
                    >
                        {quantity > 0 ? 'Buy Now' : 'Stock Out'}
                    </button>
                </div>
                <hr className="border-gray-300/50" />
            </div>
            <PurchaseModal product={product} refetch={refetch} closeModal={closeModal} isOpen={isOpen}></PurchaseModal>
        </div>
        </div>
    );
};

export default ProductDetails;
