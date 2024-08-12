import React from "react";

const ProductDetails = ({ product }) => {
  if (!product) return <div>Select a product to see details.</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <div>SKU: {product.sku}</div>
      <div>Price: ${product.price}</div>
      <div>Attributes: {JSON.stringify(product.attributes)}</div>
    </div>
  );
};

export default ProductDetails;
