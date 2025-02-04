import React, { useContext, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../Provider/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const[loading,setLoading] = useState(false)
  const axiosSecure = useAxiosSecure()
  const handleSubmit = async(e) => {
    e.preventDefault();

    // post add product in database
    
     setLoading(true)
    const form = e.target;
    const productName = form.productName.value;
    const category = form.category.value;
    const image = form.image.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const description = form.description.value;

    //seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    const productData = {
      productName,
      category,
      image,
      price,
      quantity,
      description,
      seller,
    };
    console.log(productData);

      // post product database
      try{
             await axiosSecure.post('/products',productData)
      toast.success("Product Added Successfully!")  
      }
      catch(err){
      console.log(err)

      } 
      finally{
        setLoading(false)
      }    
  };



  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="backdrop-blur-3xl bg-white/10  border-gray-300 p-8 rounded-t-[40px] rounded-br-[40px] border-l-2 border-b-2 shadow-2xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>         
           <label
              htmlFor="productName"
              className="block text-lg font-medium mb-2 text-gray-200"
            >
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              name="productName"
              className="w-full text-white p-4 outline rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-[#FFDFC4] placeholder-gray-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-lg font-medium mb-2 text-gray-200"
            >
              Category
            </label>
            <input
              name="category"
              placeholder="Enter category"
              className="w-full p-4 outline placeholder-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDFC4]"
              required
            ></input>
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-lg font-medium mb-2 text-gray-300">
              Product Image URL
            </label>
            <input
              type="url"
              placeholder="Enter image URL"
              name="image"
              className="w-full p-4 outline-1 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFDFC4] placeholder-gray-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-lg font-medium mb-2 text-gray-200">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              name="price"
              className="w-full p-4 outline placeholder-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDFC4]"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-lg font-medium mb-2 text-gray-200"
            >
              Quantity
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              name="quantity"
              className="w-full p-4 outline placeholder-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDFC4]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2 text-gray-200"
            >
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              name="description"
              className="w-full p-4 outline placeholder-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDFC4]"
              rows="4"
              required
            />
          </div>

          {/* Save and Continue Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 outline-2 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#FFDFC4]"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto text-white"></TbFidgetSpinner>
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default AddProduct;
