import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Sidebar from "./components/SideBar";
import FoodItem from "./pages/FoodItem";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminOrderManagement from "./pages/AdminOrderManagement";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-8">
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<FoodItem />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />{" "}
            {/* Corrected line */}
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </div>
      </div>
      <Routes>
        <Route path="/admin" element={<AdminOrderManagement />} />
      </Routes>
    </BrowserRouter>
  );
}
