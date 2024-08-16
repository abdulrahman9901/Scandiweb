import { useState, useEffect } from "react";
import {getProducts } from "../services/productService";

const useFetchProducts = (needsRefetch, setNeedsRefetch) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    setIsLoading(false);
  }, [needsRefetch, setNeedsRefetch, products.length]);

  return {products , isLoading};
};

export default useFetchProducts;
