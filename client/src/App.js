import "./App.css";
import Category from "./components/Category";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from './components/Register';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
