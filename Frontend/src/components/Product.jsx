import React from "react";

const Product = ({ product, handleCheckboxChange }) => {
  let attributes = product.attributes;
  return (
    <div className="product" key={product.sku}>
      <input
        id="check"
        class="delete-checkbox"
        type="checkbox"
        onChange={() => handleCheckboxChange(product.sku)}
      />
      <div>{product.sku}</div>
      <div>{product.name}</div>
      <div>{product.price} $</div>
      {Object.entries(attributes).map(([key, value]) => (
        <div key={key}>
          {key}:{value}
        </div>
      ))}
    </div>
  );
};

export default Product;
