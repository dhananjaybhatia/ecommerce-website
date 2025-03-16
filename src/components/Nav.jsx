import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { Link } from "react-router-dom";

function Nav({ category }) {
  const { products } = useContext(ProductContext);

  const uniqueCategories = products
    ? [...new Set(products.map((p) => p.category))]
    : [];

  const getRandomColor = () => {
    const random255 = () => Math.floor(Math.random() * 256); // Ensures whole number 0-255
    return `rgba(${random255()}, ${random255()}, ${random255()}, 0.7)`;
  };

  return (
    <nav className="w-[15%] h-full p-10 bg-[#faedcd] flex flex-col items-center overflow-y-auto">
      <Link
        className="py-5 px-8 border-2 border-amber-800 text-2xl font-semibold rounded-full hover:scale-110 hover:bg-blue-500 hover:text-amber-100"
        to="/create"
      >
        Add Products
      </Link>
      <h1 className="text-2xl mt-10 mb-5 w-[80%]">Categories</h1>
      <div className="w-[80%] flex flex-col">
        {uniqueCategories.map((c, i) => (
          <Link
            to={`/?category=${encodeURIComponent(c)}`}
            key={i}
            className="p-2 flex items-center gap-2 text-lg font-medium"
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getRandomColor() }}
            ></span>

            {c.toUpperCase()}
          </Link>
        ))}
      </div>
      {category && (
        <Link
          className="py-3 px-5 border-2 border-amber-800 text-xl mt-5 rounded-full font-semibold hover:scale-110 hover:bg-emerald-400"
          to="/"
        >
          Clear Filter
        </Link>
      )}
    </nav>
  );
}

export default Nav;
