import React, { useContext } from "react";
import Nav from "./Nav";
import { Link, useSearchParams } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import Loading from "./Loading";

function Home() {
  const { products } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const filteredProducts = category
  ? products.filter((product) => product.category === category)
  : products;

  return products ? (
    <>
      <Nav category={category}/>

      <div className="home-page w-[85%] h-full p-10 overflow-y-auto flex flex-wrap gap-4 justify-start items-start">
        {filteredProducts.map((product, id) => (
          <Link
            key={id}
            to={`/details/${product.id}`}
            className="card-container h-[25vh] w-[18%]  bg-[#ffff] rounded-md shadow-lg p-3 hover:scale-110 transition-transform duration-300 "
          >
            <div
              className="h-[70%] bg-contain bg-center bg-no-repeat rounded-md "
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
            <h1 className="text-lg p-2 overflow-hidden text-center whitespace-nowrap text-ellipsis">
              {product.title}
            </h1>

            <h2 className="text-lg items-center flex justify-center p-3">
              $ {product.price}
            </h2>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
