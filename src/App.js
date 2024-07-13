import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import Discounts from "./Admin/Components/Discounts";
import Promotions from "./Admin/Components/Promotions";
import Home from "./User/Pages/Home";


function App() {
  return (
    <Router style={{Margin:0,Padding:0}}>
      <Routes>
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="/discounts" element={<Discounts />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </Router>
  );
}

export default App;
