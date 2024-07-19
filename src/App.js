import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import Discounts from "./Admin/Components/Discounts";
import Promotions from "./Admin/Components/Promotions";
import Home from "./User/Pages/Home";
import FilterPage from "./User/Pages/FilterPage";
import ProductDetailsPage from "./User/Pages/ProductDetailsPage";
import AddToCart from "./User/Pages/AddToCart";


function App() {
  return (
    <Router >
      <Routes>
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="/discounts" element={<Discounts />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/" element={<Home />} />
      <Route path="/filter" element={<FilterPage />} />
      <Route path="/productdetails" element={<ProductDetailsPage />} />
      <Route path="/addtocart" element={<AddToCart />} />
    </Routes>
    </Router>
  );
}

export default App;
