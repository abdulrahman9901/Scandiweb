import React, { useState } from "react";
import ProductList from "../components/ProductsList";
import { deleteProducts} from "../services/productService";
import Footer from "../components/Footer";
import { useData } from "../contexts/DataContext";
import useFetchProducts from "../hooks/useFetchProducts";
import Header from "../components/Header";
const ProductListPage = () => {
 const [selectedSkus, setSelectedSkus] = useState([]);
 const { setNeedsRefetch, needsRefetch } = useData();
 const { products, isLoading } = useFetchProducts(
   needsRefetch,
   setNeedsRefetch
 );

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

  window.onload = () => {
    const loadTime = performance.now(); // Measures the time it took to load the page
    console.log(`Page load time: ${loadTime}ms`);
  };

  return (
    <div className="product-list-page">
      <Header
        title="Product List"
        leftBtnAction={() => {}}
        leftBtnName="ADD"
        rightBtnAction={handleDeleteSelected}
        rightBtnName="MASS DELETE"
        ahref="/add-product"
      />
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList
          products={products}
          selectedSkus={selectedSkus}
          setSelectedSkus={setSelectedSkus}
        />
      )}
      <Footer />
    </div>
  );
};

export default ProductListPage;
