
import Product from "./Product";
import React from "react";

const ProductList = ({ products = [], setSelectedSkus }) => {

  const handleCheckboxChange = (sku) => {
    setSelectedSkus((prevState) =>
      prevState.includes(sku)
        ? prevState.filter((item) => item !== sku)
        : [...prevState, sku]
    );
  };

  return (
    <main className="product-list">
      {products.map((product) => (
        <div className="product-list-item" key={product.sku}>
          <input
            id="check"
            class="delete-checkbox"
            type="checkbox"
            onChange={() => handleCheckboxChange(product.sku)}
            name="delete-checkbox[]"
          />
          <Product product={product} />
        </div>
      ))}
    </main>
  );
};

export default ProductList;
