import React from "react";

const Product = ({ product }) => {
      let attributes = product.attributes;
  return (
    <div className="product" key={product.sku}>
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
