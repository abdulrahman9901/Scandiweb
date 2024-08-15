import React from "react";

const ProductForm = ({ product , setProduct }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setProduct({
      ...product,
      type,
      attributes: {}, // Reset attributes when changing type
    });
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    console.log(product, name, value);
    setProduct({
      ...product,
      attributes: {
        ...product.attributes,
        [name]: value,
      },
    });
  };

  return (
    <main className="product_form-container">
      <form id="product_form">
        <div className="product-input-field">
          <label htmlFor="sku">SKU : </label>
          <input
            type="text"
            name="sku"
            id="sku"
            value={product.sku}
            onChange={handleChange}
            placeholder="SKU"
            required
          />
        </div>
        <div className="product-input-field">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="product-input-field">
          <label htmlFor="price">Price ($) : </label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>
        <div className="product-input-field">
          <label htmlFor="type">Product Type : </label>
          <select
            id="productType"
            name="type"
            value={product.type}
            onChange={handleTypeChange}
          >
            <option value="">Select Type</option>
            <option id="DVD" value="DVD">
              DVD
            </option>
            <option id="Book" value="Book">
              Book
            </option>
            <option id="Furniture" value="Furniture">
              Furniture
            </option>
          </select>
        </div> 
        <div className="dynamic-field-container">
          {product.type === "DVD" && (
            <div className="product-input-field">
              <label htmlFor="Size">Size (MB) </label>
              <input
                type="number"
                id="size"
                name="Size"
                value={product.attributes.Size || ""}
                onChange={handleAttributeChange}
                placeholder="Size"
              />
              <div className="description">Please, provide the size in MB</div>
            </div>
          )}

          {product.type === "Book" && (
            <div className="product-input-field">
              <label htmlFor="Weight">Weight (KG) </label>
              <input
                type="number"
                id="weight"
                name="Weight"
                value={product.attributes.Weight || ""}
                onChange={handleAttributeChange}
                placeholder="Weight"
              />
              <div className="description">
                Please, provide the weight in KG
              </div>
            </div>
          )}

          {product.type === "Furniture" && (
            <div className="dynamic-field-container">
              <div className="product-input-field">
                <label htmlFor="height">Height (CM) </label>
                <input
                  type="number"
                  id="height"
                  name="Height"
                  value={product.attributes.Height || ""}
                  onChange={handleAttributeChange}
                  placeholder="Height"
                />
              </div>
              <div className="product-input-field">
                <label htmlFor="width">Width (CM) </label>
                <input
                  type="number"
                  id="width"
                  name="Width"
                  value={product.attributes.Width || ""}
                  onChange={handleAttributeChange}
                  placeholder="Width"
                />
              </div>
              <div className="product-input-field">
                <label htmlFor="length">Length (CM) </label>
                <input
                  type="number"
                  id="length"
                  name="Length"
                  value={product.attributes.Length || ""}
                  onChange={handleAttributeChange}
                  placeholder="Length"
                />
              </div>
              <div className="description">
                Please, provide dimensions in HxWxL Format
              </div>
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default ProductForm;
