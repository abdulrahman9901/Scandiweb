import axios from "axios";
 
const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(
      `${API_URL}`,
      {
        action: "add",
        sku: product.sku,
        name: product.name,
        price: product.price,
        attributes: product.attributes,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response contains the word "Error"
    if (response.data.error) {
      console.error("Server error:", response.data);
      return { error: response.data.error }; // Return the error message from the server
    }

    // If no error, return the successful response data
    return response.data;
  } catch (error) {
    // Catch any network or server-related error
    console.error("Failed to add product:", error);
    return { error: "Failed to add product. Please try again." };
  }
};

export const updateProduct = async (product) => {
  await axios.put(`${API_URL}/${product.sku}`, product);
};


export const deleteProducts = async (skus) => {
  try {
    const response = await axios.post(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      skus , // Axios expects `data` in the request body for DELETE
      action:"delete"
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete products:", error);
    throw error;
  }
};