import React, { useState } from "react";
import ProductList from "../components/ProductsList";
import { deleteProducts} from "../services/productService";
import Footer from "../components/Footer";
import { useData } from "../contexts/DataContext";
import useFetchProducts from "../hooks/useFetchProducts";

const ProductListPage = () => {
  const [selectedSkus, setSelectedSkus] = useState([]);
  const { setNeedsRefetch, needsRefetch } = useData();
  const products = useFetchProducts(needsRefetch, setNeedsRefetch);

  const handleDeleteSelected = async () => {
    try {
      if (selectedSkus.length > 0) {
        await deleteProducts(selectedSkus);
        setSelectedSkus([]);
        setNeedsRefetch(true);
      } else {
        alert("No products selected for deletion.");
      }
    } catch (error) {
      console.error("Failed to delete products:", error);
    }
  };


  return (
    <div className="product-list-page">
      <div className="header">
        <h1>Product List</h1>
        <div className="btn-container">
          <a name="ADD" href="/add-product">
            <button name="ADD" className="leftBtn">
              ADD
            </button>
          </a>
          <button
            className="rightBtn"
            id="delete-product-btn"
            onClick={handleDeleteSelected}
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <ProductList
        products={products}
        selectedSkus={selectedSkus}
        setSelectedSkus={setSelectedSkus}
      />
      <Footer />
    </div>
  );
};

export default ProductListPage;
