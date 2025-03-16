import React, { useEffect, useState } from "react";
import ProductContext from "./ProductContext";
import axios from "./Axios";


const Context = (props) => {
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
