import { createBrowserRouter } from "react-router-dom";
import ProductDetails from "../Components/Details/ProductDetails";
import Home from "../Home/Home";
import MainLayout from "../Layouts/MainLayout";
import AddProduct from "../Pages/Dashboard/AddProduct";
import Login from "../Provider/Login";
import SignUp from "../Provider/SignUp";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Products from "../Page/Products";
import AdminRoute from "./AdminRoute";
import MyOrders from "../Pages/Dashboard/MyOrders";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: "/products",
        element:<Products></Products>,
      },
      {
        path: '/product/:id',
        element: <ProductDetails/>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            
          </PrivateRoute>
        ),
      },
      {
        path: 'add-plant',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AddProduct/>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <SellerRoute>
              {/* <MyInventory/> */}
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              {/* <ManageUsers /> */}
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            {/* <Profile /> */}
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute>
            <SellerRoute>
              {/* <ManageOrders/> */}
            </SellerRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
])