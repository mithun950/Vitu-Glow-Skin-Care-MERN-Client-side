
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PurchaseModal = ({ closeModal, isOpen, product,refetch }) => {
    const { _id,productName, category, description, image, seller, quantity, price } =product;

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [totalQuantity,setTotalQuantity] = useState(1)
  const [totalPrice,setTotalPrice] = useState(price)
  const [purchaseInfo, setPurchaseInfo] = useState({
    customer :{
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,

    },
    productId: _id,
    price: totalPrice,
    quantity: totalQuantity,
    seller: seller?.email,
    address: "",
    status: "pending",


})


  const handlePurchase = async() => {
    console.log(purchaseInfo)
    // post order in db
    try{
        await axiosSecure.post('/order',purchaseInfo)
        //decrease quantity from db
        await axiosSecure.patch(`/products/quantity/${_id}`, {
            quantityToUpdate: totalQuantity

            })
        toast.success('Order Successful !')
        refetch()
    }
    catch(err){
        console.log(err)
    }
    finally{
        closeModal()
    }
  }




//   if over the quantity
const handleQuantity = value => {
  if(value>quantity){
    setTotalQuantity(quantity)
    return toast.error('Quantity exceeds available stock!')
  
  }
  if(value< 0){
    // setTotalQuantity(1)
    return toast.error('Quantity cannot be less then 1!')
  
  }
  setTotalQuantity(value)
//   set total price
setTotalPrice(value*price)

// purchaseIfo update
setPurchaseInfo(prv => ({
    ...prv,
    quantity: value,
    price: value * price,
  }));
}
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm opacity-60 " />
        </TransitionChild>
         <ToastContainer></ToastContainer>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl  bg-white/20 backdrop-blur-lg p-6 text-left align-middle shadow-xl transition-all rounded-br-2xl border-b rounded-tl-2xl border-l border-white">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-white">Product: {productName}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-white">Category: {category}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-white">
                    Customer: {user.displayName}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-white flex items-center gap-1">
                    Price: {price}
                    <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white">
                    {" "}
                    Available Quantity: {quantity}
                  </p>
                </div>

                {/* Quantity input */}
                <div className="flex items-center gap-2 mt-2">
                  <div>
                    <p className="text-md text-white">Quantity:</p>
                  </div>

                  <div>
                    <input
                      type="number"
                      value={totalQuantity}
                      onChange={e => handleQuantity(parseInt((e.target.value)))}
                      name="quantity"
                      className="w-full p-2 outline text-white placeholder-gray-500 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDFC4]"
                      required
                    />
                  </div>
                </div>
                {/* address input field */}
                <div className="flex items-center gap-2 mt-2">
                  <div>
                    <p className="text-md text-white">Address:</p>
                  </div>

                  <div>
                    <input
                      type="text"
                      onChange={e => setPurchaseInfo(prv => {
                        return {...prv, address: e.target.value}
                      })}
                      placeholder="Shipping Address..."
                      name="address"
                      className="w-full p-2 text-white outline placeholder-gray-300 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFDFC4]"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button onClick={handlePurchase} className="outline btn">{`Pay ${totalPrice}`}<FaBangladeshiTakaSign></FaBangladeshiTakaSign></button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
