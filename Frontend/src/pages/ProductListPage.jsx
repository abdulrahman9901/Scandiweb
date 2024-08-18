import { deleteProducts } from "../services/productService";
import Footer from "../components/Footer";
import { useData } from "../contexts/DataContext";
import useFetchProducts from "../hooks/useFetchProducts";
import Header from "../components/Header";
import React, { useState, useRef } from "react";

const ProductListPage = () => {
  const { setNeedsRefetch, needsRefetch } = useData();
  const { products, isLoading } = useFetchProducts(
    needsRefetch,
    setNeedsRefetch
  );
  const formRef = useRef(null); // Create a reference for the form

  // Handler for mass deletion
  const handleMassDelete = async (e) => {
    e.preventDefault(); // Ensure that the default form action (redirect) is prevented

    const formData = new FormData(formRef.current);
    const selectedSkus = formData.getAll("selectedSkus");
    console.log("selectedSkus from form ", selectedSkus);
    if (selectedSkus.length > 0) {
      try {
        await deleteProducts(selectedSkus);
        setNeedsRefetch(true); // Trigger a refetch of products
      } catch (error) {
        console.error("Failed to delete products:", error);
      }
    } else {
      console.log("No products selected for deletion.");
    }
  };

  // Render logic
  return (
    <div className="product-list-page">
      <Header
        title="Product List"
        leftBtnAction={() => {}}
        leftBtnName="ADD"
        rightBtnAction={handleMassDelete} // Call handleMassDelete on button click
        rightBtnName="MASS DELETE"
        ahref="/add-product"
      />
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <form ref={formRef} className="product-list">
          {products.map((product) => (
            <div className="product-list-item" key={product.sku}>
              <div className="product" key={product.sku}>
                <input
                  type="checkbox"
                  name="selectedSkus"
                  value={product.sku}
                />
                <div>{product.sku}</div>
                <div>{product.name}</div>
                <div>{product.price} $</div>
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </form>
      )}
      <Footer />
    </div>
  );
};

export default ProductListPage;

