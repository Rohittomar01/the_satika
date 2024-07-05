import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import Category from "./Admin/Components/Category";


function App() {
  return (
    <Router className="App">
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/category" element={<Category />} />
    </Routes>
    </Router>
  );
}

export default App;
