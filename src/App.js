import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import Discounts from "./Admin/Components/Discounts";
import Promotions from "./Admin/Components/Promotions";
import Home from "./User/Pages/Home";
import FilterPage from "./User/Pages/FilterPage";
import ProductDetailsPage from "./User/Pages/ProductDetailsPage";
import AddToCart from "./User/Pages/AddToCart";
import Gallery from "./User/Pages/Gallery";
import OTPDialog from "./User/Components/OTPDialog/OTPDialog";
import WishList from "./User/Pages/WishList";
import SignUpDialog from "./User/Pages/SignUpDialog";
import QuickView from "./User/Pages/QuickView";
import CheckoutComponent from "./User/Pages/checkOutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/productdetails" element={<ProductDetailsPage />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/otp" element={<OTPDialog />} />
        <Route path="/SignUpDialog" element={<SignUpDialog />} />
        <Route path="/OTPDialog" element={<OTPDialog />} />
        <Route path="/quickview" element={<QuickView />} />
        <Route path="/checkout" element={<CheckoutComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
