import {
    createBrowserRouter,

  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import AddProduct from "../Pages/Dashboard/AddProduct";
import SignUp from "../Provider/SignUp";
import Login from "../Provider/Login";
import Products from "../Page/Products";
import ProductDetails from "../Components/Details/ProductDetails";
import MyOrders from "../Pages/Dashboard/MyOrders";

 export  const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      children:[
        {
            path: '/',
            element:<Home></Home>
        },
        {
          path: "/products",
          element:<Products></Products>,
        },
        {
          path: "/product/:id",
          element:<ProductDetails></ProductDetails>
        },
      ]
    },
    {
        path: '/login',
        element:<Login></Login> 
    },
    {
        path: '/signUp',
        element:<SignUp></SignUp>
    },

    // dashboard start
    {
      path:'/dashboard',
      element:<DashboardLayout></DashboardLayout>,
      children: [
        {
          path:"add-product",
          element: <AddProduct></AddProduct>
        },
        {
           path:'myOrders',
           element:<MyOrders></MyOrders>
        },
      ]

    }
  ]);