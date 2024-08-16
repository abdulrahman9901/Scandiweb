import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import { DataProvider } from "./contexts/DataContext";

import './styles/App.scss'
const App = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
