import { useState, useEffect } from "react";
import {getProducts } from "../services/productService";

const useFetchProducts = (needsRefetch, setNeedsRefetch) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setNeedsRefetch(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (needsRefetch || products.length === 0) {
      fetchProducts();
    }
  }, [needsRefetch, setNeedsRefetch, products.length]);

  return products;
};

export default useFetchProducts;
