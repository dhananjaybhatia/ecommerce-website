import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import ProductContext from "../context/ProductContext";

const Details = () => {


  const { id } = useParams();
  const { products } = useContext(ProductContext); 
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const product = products?.find((product) => product.id === parseInt(id));

  if (!product) return <Loading />;

  return (
    <div className="w-[70%] h-[70%] m-auto flex flex-col py-10 px-10 bg-[#ffff] rounded-4xl">
      <div className="w-full h-[10%] border-b border-b-gray-300 flex justify-between items-center ">
        <div onClick={goBack} className="flex justify-start items-center hover:scale-110 cursor-pointer">
          <span className="text-5xl text-[#284B63]">
            <i className="ri-arrow-left-wide-line"></i>
          </span>
          <h2 className="text-[#284B63]">BACK</h2>
        </div>
        <span className="text-3xl mr-5 text-[#284B63]">
          <i className="ri-heart-line"></i>
        </span>
      </div>

      <div className="w-full h-[80%] flex flex-row">
        <div className="w-[40%] border-r border-r-gray-300 overflow-hidden p-5">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-[60%] p-10 flex flex-col">
          <h1 className="text-5xl mt-2 flex justify-center text-orange-600">
            {product.title}
          </h1>
          <h2 className="text-2xl text-[#1d4345] flex justify-end">
            Rating: {product.rating?.rate || "N/A"}
          </h2>
          <h2 className="text-5xl text-orange-600 my-10">$ {product.price}</h2>
          <p className="mt-10 tracking-wider text-xl ">
            {product.description}
          </p>

          <div className="mt-auto flex gap-8 justify-center items-center">
            <Link
              className="py-3 px-10 border border-gray-300 text-2xl rounded-md tracking-wider hover:scale-110 transition-transform hover:bg-amber-200"
              to="#"
            >
              EDIT
            </Link>
            <Link
              className="py-3 px-10 border border-gray-300 text-2xl rounded-md tracking-wider hover:scale-110 transition-transform hover:bg-red-300"
              to="#"
            >
              DELETE
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-[10%]"></div>
    </div>
  );
};

export default Details;
