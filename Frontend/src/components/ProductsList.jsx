import Product from "./Product";
import React from "react";

const ProductList = ({
  products = [],
  formRef,
  handleDeleteSelected,
  setSelectedSkus,
}) => {
  const handleCheckboxChange = (sku) => {
    setSelectedSkus((prevState) =>
      prevState.includes(sku)
        ? prevState.filter((item) => item !== sku)
        : [...prevState, sku]
    );
  };

  return (
    <form
      ref={formRef}
      className="product-list"
      method="post" // Ensure that the backend expects POST data from this form
      onSubmit={handleDeleteSelected} // Function to handle form submission
    >
      {products.map((product) => (
        <div className="product-list-item" key={product.sku}>
          <Product
            product={product}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      ))}
      {/* Optional: Add a submit button if needed */}
      <button type="submit">Delete Selected</button>
    </form>
  );
};

export default ProductList;
