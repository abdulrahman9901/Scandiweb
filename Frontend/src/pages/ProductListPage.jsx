import React, { useState } from "react";
import ProductList from "../components/ProductsList";
import { deleteProducts } from "../services/productService";
import Footer from "../components/Footer";
import { useData } from "../contexts/DataContext";
import useFetchProducts from "../hooks/useFetchProducts";
import Header from "../components/Header";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";

const ProductListPage = () => {
  const [selectedSkus, setSelectedSkus] = useState([]);
  const { setNeedsRefetch, needsRefetch } = useData();
  const { products, isLoading } = useFetchProducts(
    needsRefetch,
    setNeedsRefetch
  );

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const alertOpen = () => {
    setOpen(true);
  };

  const alertClose = () => {
    setOpen(false);
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedSkus.length > 0) {
        await deleteProducts(selectedSkus);
        setSelectedSkus([]);
        setNeedsRefetch(true);
      } else {
         setMsg("No products selected for deletion.");
         alertOpen();
      }
    } catch (error) {
      console.error("Failed to delete products:", error);
      setMsg("Failed to delete products");
      alertOpen();
    }
  };

  window.onload = () => {
    const loadTime = performance.now(); // Measures the time it took to load the page
    console.log(`Page load time: ${loadTime}ms`);
  };

  return (
    <div className="product-list-page">
      <Header
        title="Product List"
        leftBtnAction={() => {}}
        leftBtnName="ADD"
        rightBtnAction={handleDeleteSelected}
        rightBtnName="MASS DELETE"
        ahref="/add-product"
      />
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList
          products={products}
          selectedSkus={selectedSkus}
          setSelectedSkus={setSelectedSkus}
        />
      )}
      <Dialog
        open={open}
        onClose={alertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert variant="outlined" severity="error">
              {msg}
            </Alert>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ProductListPage;
