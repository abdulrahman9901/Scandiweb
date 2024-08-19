import React from "react";

const Product = ({ product, handleCheckboxChange }) => {
  const { sku, name, price, attributes } = product;

  return (
    <div className="product" key={sku}>
      <div>{sku}</div>
      <div>{name}</div>
      <div>{price} $</div>
      {Object.entries(attributes).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </div>
  );
};

export default Product;
