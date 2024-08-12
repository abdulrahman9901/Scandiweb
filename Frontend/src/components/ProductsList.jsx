
import Product from "./Product";
import React from "react";

const ProductList = ({
  products,
  selectedSkus,
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
    <main className="product-list">
      {products.map((product) => (
        <div className="product-list-item" key={product.sku}>
          <input
            type="checkbox"
            checked={selectedSkus.includes(product.sku)}
            onChange={() => handleCheckboxChange(product.sku)}
            className="delete-checkbox"
          />
          <Product product={product} />
        </div>
      ))}
    </main>
  );
};

export default ProductList;
