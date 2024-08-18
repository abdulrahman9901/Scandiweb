import { deleteProducts } from "../services/productService";
import Footer from "../components/Footer";
import { useData } from "../contexts/DataContext";
import useFetchProducts from "../hooks/useFetchProducts";
import Header from "../components/Header";
import React, { useState, useRef, useEffect } from "react";


// Main ProductListPage Component
const ProductListPage = () => {
  const [selectedSkus, setSelectedSkus] = useState([]);
  const { setNeedsRefetch, needsRefetch } = useData();
  const { products, isLoading } = useFetchProducts(
      needsRefetch,
      setNeedsRefetch
    );
  const formRef = useRef(null); // Create a reference for the form

  // Handler for mass deletion
  const handleMassDelete = () => {
    if (formRef.current) {
      handleDeleteSelected({
        target: formRef.current,
        preventDefault: () => {},
      });
    }
  };

  // Function to handle deletion of selected products
  const handleDeleteSelected = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const selectedSkus = formData.getAll("selectedSkus");
    console.log("selectedSkus:", selectedSkus);

    try {
      if (selectedSkus.length > 0) {
        await deleteProducts(selectedSkus);
        setSelectedSkus([]); // Clear selected SKUs after deletion
        setNeedsRefetch(true); // Trigger a refetch of products
      } else {
        console.log("No products selected for deletion.");
      }
    } catch (error) {
      console.error("Failed to delete products:", error);
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
        <form
          ref={formRef}
          className="product-list"
          method="post"
          onSubmit={handleDeleteSelected} // This handles the deletion logic
        >
          {products.map((product) => (
            <div className="product-list-item" key={product.sku}>
              <div className="product" key={product.sku}>
                <input
                  type="checkbox"
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
        </form>
      )}
       <Footer />
    </div>
  );
};

export default ProductListPage;
