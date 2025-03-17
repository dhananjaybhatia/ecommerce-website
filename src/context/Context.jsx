import React, { useEffect, useState } from "react";
import ProductContext from "./ProductContext";
// import axios from "./Axios";

const Context = (props) => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));

    if (!storedProducts || storedProducts.length === 0) {
      const defaultProducts = [
        {
          id: 1,
          title: "Example Product",
          category: "Category",
          price: "100",
          image: "https://via.placeholder.com/150",
          description: "This is a sample product.",
        },
      ];
      localStorage.setItem("products", JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    } else {
      setProducts(storedProducts);
    }
  }, []);

  // const getProducts = async () => {
  //   try {
  //     const { data } = await axios.get("/products");
  //     setProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
