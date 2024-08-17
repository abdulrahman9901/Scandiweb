import React, { useState ,  useRef  } from "react";
import ProductList from "../components/ProductsList";
import { deleteProducts} from "../services/productService";
import Footer from "../components/Footer";
import { useData } from "../contexts/DataContext";
import useFetchProducts from "../hooks/useFetchProducts";
import Header from "../components/Header";

const ProductListPage = () => {
  const [selectedSkus, setSelectedSkus] = useState([]);
  const { setNeedsRefetch, needsRefetch } = useData();
  const { products, isLoading } = useFetchProducts(
    needsRefetch,
    setNeedsRefetch
  );
  const formRef = useRef(null); // Create a reference for the form

  const handleMassDelete = () => {
    if (formRef.current) {
      handleDeleteSelected({
        target: formRef.current,
        preventDefault: () => {},
      });
    }
  };

 const handleDeleteSelected = async (e) => {
   e.preventDefault(); 

   const formData = new FormData(e.target);
  
   const selectedSkus = formData.getAll("selectedSkus");
   console.log("selectedSkus:", selectedSkus);

   try {
     if (selectedSkus.length > 0) {
      deleteProducts(selectedSkus).then(()=>{
        setSelectedSkus([]);
        setNeedsRefetch(true); 
      }).catch((error) => {
        console.error("Error deleting products:", error);
      });

     } else {
       console.log("No products selected for deletion.");
     }
   } catch (error) {
     console.error("Failed to delete products:", error);
   }
 };


  return (
    <div className="product-list-page">
      <Header
        title="Product List"
        leftBtnAction={() => {}}
        leftBtnName="ADD"
        rightBtnAction={handleMassDelete}
        rightBtnName="MASS DELETE"
        ahref="/add-product"
      />
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList
          products={products}
          formRef={formRef}
          handleDeleteSelected={handleDeleteSelected}
          setSelectedSkus={setSelectedSkus}
        />
      )}
      <Footer />
    </div>
  );
};

export default ProductListPage;
