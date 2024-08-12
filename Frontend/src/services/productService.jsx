import axios from "axios";
 
const API_URL = REACT_APP_API_URL;

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

export const addProduct = async (product) => {
  await axios.post(API_URL, product);
};

export const updateProduct = async (product) => {
  await axios.put(`${API_URL}/${product.sku}`, product);
};


export const deleteProducts = async (skus) => {
  try {
    const response = await axios.delete(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { skus }, // Axios expects `data` in the request body for DELETE
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete products:", error);
    throw error;
  }
};