import React, { useState } from "react";
import { deleteProducts } from "../services/productService";
import Footer from "../components/Footer";
import { useData } from "../contexts/DataContext";
import useFetchProducts from "../hooks/useFetchProducts";
import Header from "../components/Header";

// Main ProductListPage Component
const ProductListPage = () => {
  const [selectedSkus, setSelectedSkus] = useState([]);
  const { setNeedsRefetch, needsRefetch } = useData();
  const { products, isLoading } = useFetchProducts(
    needsRefetch,
    setNeedsRefetch
  );

  // Handler for mass deletion
  const handleMassDelete = async () => {
    if (selectedSkus.length > 0) {
      try {
        await deleteProducts(selectedSkus);
        setSelectedSkus([]); // Clear selected SKUs after deletion
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
        rightBtnAction={handleMassDelete}
        rightBtnName="MASS DELETE"
        ahref="/add-product"
      />
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div className="product-list-item" key={product.sku}>
              <div className="product" key={product.sku}>
                <input
                  type="checkbox"
                  className="custom-control-input delete-checkbox"
                  name="selectedSkus"
                  value={product.sku}
                  onChange={() => {
                    setSelectedSkus((prevState) =>
                      prevState.includes(product.sku)
                        ? prevState.filter((item) => item !== product.sku)
                        : [...prevState, product.sku]
                    );
                  }}
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
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductListPage;
