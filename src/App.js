import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import Discounts from "./Admin/Components/Discounts";
import Promotions from "./Admin/Components/Promotions";


function App() {
  return (
    <Router className="App">
      <Routes>
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="/discounts" element={<Discounts />} />
      <Route path="/promotions" element={<Promotions />} />
    </Routes>
    </Router>
  );
}

export default App;
