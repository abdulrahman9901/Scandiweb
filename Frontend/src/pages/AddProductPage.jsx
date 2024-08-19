import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useData } from "../contexts/DataContext";
import { validateProduct } from "../utils/validation";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";

const AddProductPage = () => {
  const { setNeedsRefetch } = useData();
  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: "",
    type: "", // Default type is empty
    attributes: {},
  });
   const [open, setOpen] = React.useState(false);
   const [msg, setMsg] = React.useState("");

   const alertOpen = () => {
     setOpen(true);
   };

   const alertClose = () => {
     setOpen(false);
   };

  const navigate = useNavigate();  

  const handleCancel = () => {
    navigate("/");
  };

  const handleSave = async () => {
      if (product.type === "Furniture") {
          var attributes = {
            Dimensions: `${product.attributes.Height}x${product.attributes.Width}x${product.attributes.Length}`,
          };
      } else {
          attributes = product.attributes;
      }
      const trimmedProduct = {
        sku: product.sku,
        name: product.name,
        price: product.price,
        attributes: attributes,
      };
      const errors = validateProduct(product);
      if(errors.hasMissingData){
        setMsg("Please, submit required data");
        alertOpen();
      }else if(errors.hasWrongDataType){
        setMsg("Please, provide the data of indicated type");
        alertOpen();
      }else{
        console.log("product : ", trimmedProduct);
        try{
          const res = await addProduct(trimmedProduct);
          if(res.error)
              throw res.error
          setNeedsRefetch(true);
          navigate("/");
        }catch(error){
          setMsg(error);
          alertOpen();
        }
      }
  };

  return (
    <div className="add-product-page">
      <Header
        title="Add Product"
        leftBtnAction={handleSave}
        leftBtnName="Save"
        rightBtnAction={handleCancel}
        rightBtnName="Cancel"
      />
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
      <ProductForm product={product} setProduct={setProduct} />
      <Footer />
    </div>
  );
};

export default AddProductPage;
