import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./User/Login";
import Signup from "./User/Signup";
import Uhome from "./User/Uhome";
import Products from "./User/Products";
import Cart from "./User/Cart";
import MyOrders from "./User/MyOrders";
import Wishlist from "./User/Wishlist";
import AuthenticatedHome from "./Components/AuthenticatedHome";
import Slogin from "./Seller/Slogin";
import Ssignup from "./Seller/Ssignup";
import Shome from "./Seller/Shome";
import Addbook from "./Seller/Addbook";
import MyProducts from "./Seller/MyProducts";
import Orders from "./Seller/Orders";
import Alogin from "./Admin/Alogin";
import Asignup from "./Admin/Asignup";
import Ahome from "./Admin/Ahome";
import AdminProfile from "./Admin/AdminProfile";
import Users from "./Admin/Users";
import Seller from "./Admin/Seller";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<AuthenticatedHome />} />
        <Route path="/books" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-orders" element={<MyOrders />} />
        
        {/* User Routes */}
        <Route path="/user" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/home" element={<Uhome />} />
        <Route path="/user/products" element={<Products />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/orders" element={<MyOrders />} />
        
        {/* Seller Routes */}
        <Route path="/seller" element={<Slogin />} />
        <Route path="/seller/login" element={<Slogin />} />
        <Route path="/seller/signup" element={<Ssignup />} />
        <Route path="/seller/home" element={<Shome />} />
        <Route path="/seller/addbook" element={<Addbook />} />
        <Route path="/seller/products" element={<MyProducts />} />
        <Route path="/seller/orders" element={<Orders />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Alogin />} />
        <Route path="/admin/login" element={<Alogin />} />
        <Route path="/adminsignup" element={<Asignup />} />
        <Route path="/admin/home" element={<Ahome />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/sellers" element={<Seller />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;