import React, { useState } from "react";
import ProductList from "../components/ProductsList";
import { deleteProducts} from "../services/productService";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useData } from "../contexts/DataContext";
import useFetchProducts from "../hooks/useFetchProducts";

const ProductListPage = () => {
  const [selectedSkus, setSelectedSkus] = useState([]);
  const { setNeedsRefetch, needsRefetch } = useData();
  const navigate = useNavigate();
  const products = useFetchProducts(needsRefetch, setNeedsRefetch);

  const handleDeleteSelected = async () => {
    try {
      if (selectedSkus.length > 0) {
        await deleteProducts(selectedSkus);
        setSelectedSkus([]);
        setNeedsRefetch(true);
      } else {
        alert("No products selected for deletion.");
      }
    } catch (error) {
      console.error("Failed to delete products:", error);
    }
  };

  const handleAddProduct = () => {
    navigate("/addproduct");
  };

  return (
    <div className="product-list-page">
      {/* <Header
        title="Product List"
        leftBtnAction={handleAddProduct}
        leftBtnName="ADD"
        rightBtnAction={handleDeleteSelected}
        rightBtnName="MASS DELETE"
      /> */}
      <header className="header">
        <h1>Product List</h1>
        <div className="btn-container">
          <link className={"leftBtn"} onClick={leftBtnAction}>
            {leftBtnName}
          </link>
          <link
            className={classNames({
              cancelBtn: rightBtnName === "Cancel",
              rightBtn: rightBtnName === "MASS DELETE",
            })}
            onClick={rightBtnAction}
          >
            {rightBtnName}
          </link>
        </div>
      </header>
      <ProductList
        products={products}
        selectedSkus={selectedSkus}
        setSelectedSkus={setSelectedSkus}
      />
      <Footer />
    </div>
  );
};

export default ProductListPage;
