import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../Components/LoadingSpinner';
import axios from 'axios';
import ProductCards from '../Shared/ProductCards/ProductCards';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/products`);
            return data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

    return (
        <div>
            <h2 className="text-center text-2xl font-bold pt-28 text-white">Products</h2>

            {currentProducts && currentProducts.length > 0 ? (
                <div className='w-11/12 mx-auto grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 gap-5'>
                    {currentProducts.map(product => (
                        <ProductCards key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-red-500">No Data Available</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-3 my-5 mt-10">
                <button
                    className={`px-3 py-2 backdrop-blur-3xl bg-white/20 text-white shadow-2xl  font-bold border-white  rounded-tl-lg border-l-2 rounded-br-2xl border-b-2 ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className="font-bold text-white">Page {currentPage} of {totalPages}</span>

                <button
                    className={`px-3 py-2 backdrop-blur-3xl bg-white/20 text-white shadow-2xl  font-bold border-white  rounded-tl-lg border-l-2 rounded-br-2xl border-b-2 ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
