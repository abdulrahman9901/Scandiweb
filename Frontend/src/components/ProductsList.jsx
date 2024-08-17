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
      method="post" // Change to 'post'
      onSubmit={handleDeleteSelected} // This handles the deletion logic
    >
      {products.map((product) => (
        <div className="product-list-item" key={product.sku}>
          <Product
            product={product}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      ))}
    </form>
  );
};

export default ProductList;
