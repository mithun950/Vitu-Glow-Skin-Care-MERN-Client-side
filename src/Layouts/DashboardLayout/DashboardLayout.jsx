import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { FaJediOrder, FaUserClock } from "react-icons/fa";
import { IoLogOutOutline, IoPersonAdd } from "react-icons/io5";
import { MdInventory2, MdManageAccounts, MdManageHistory } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);



  return (
    <div className="flex">
      {/* Toggle Button */}
      <button
        className="absolute top-4 left-4 backdrop-blur-lg text-white p-2 rounded md:hidden"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 h-screen backdrop-blur-xl   bg-white/10  text-white p-4 fixed transform ${
          open ? "translate-x-0" : "-translate-x-64"
        } transition-transform md:translate-x-0`}
      >
        <nav className="mt-4">
          <ul>
            <div className="flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <FaJediOrder />
            <li className="">
              <Link to="/dashboard/myOrders"> My Order</Link>
            </li>
            </div>
            <div className="flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <FaUserClock />
            <li>
              <Link to="/dashboard/seller">Become A Seller</Link>
            </li>
            </div>
            <div className="flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <IoPersonAdd />
            <li>
              <Link to="/dashboard/add-product">Add Product</Link>
            </li>
            </div>
            <div className="flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <MdInventory2 />
            <li>
              <Link to="/dashboard/my-inventory">My Inventory</Link>
            </li>
            </div>
                
            <div className="flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <MdManageHistory /> 
            <li>
              <Link to="/dashboard/manage-order">Manage Orders</Link>
            </li>
            </div>

            <div className="flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <TfiStatsUp />
            <li>
              <Link to="/dashboard/statistics">Statistics</Link>
            </li>
            </div>

            <div className="flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <MdManageAccounts />
            <li>
              <Link to="/dashboard/my-inventory">Manage Users</Link>
            </li>
            </div>

            <hr className="mt-10"/>
            <div className=" mt-28 flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <CgProfile />
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li>
            </div>

            <div className="flex items-center py-2 px-4 hover:bg-gray-700 rounded gap-3">
            <IoLogOutOutline />
            <li>
              <Link to="/dashboard/profile">Logout</Link>
            </li>
            </div>

          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-4 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
