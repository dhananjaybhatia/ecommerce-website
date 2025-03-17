import React, { useContext, useState } from "react";
import Loading from "./Loading";
import ProductContext from "../context/ProductContext";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateProduct = () => {
  const { setProducts } = useContext(ProductContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const wordCounter = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  // Handle description input with word limit
  const handleDescriptionChange = (e) => {
    const words = wordCounter(e.target.value);
    if (words <= 50) {
      setDescription(e.target.value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!image.trim()) newErrors.image = "Image is required";
    if (!price.trim()) newErrors.price = "Price is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ Returns true if no errors
  };

  const addNewProductHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        message: "Please fill all required fields!",
        type: "error",
      });
      return;
    }

    setLoading(true);

    const product = {
      id: uuidv4(),
      title,
      category,
      image,
      price,
      description,
    };

    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, product];

      // ✅ Store the updated product list in localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return updatedProducts;
    });

    setToast({ message: "Product added successfully!", type: "success" });

    setTitle("");
    setCategory("");
    setPrice("");
    setImage("");
    setDescription("");
    setErrors({});
    setLoading(false);
  };

  return (
    <>
      <div className="">
        <Link to="/" className="flex items-center p-5">
          <span className="text-5xl text-[#284B63]">
            <i className="ri-arrow-left-wide-line"></i>
          </span>
          <h2 className="text-[#284B63] text-xl">GO HOME</h2>
        </Link>
      </div>
      <div className="w-[50%] border-2 rounded-2xl h-[60%] mx-auto my-auto grid grid-cols-2">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <div className="left-img  p-5 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center border-2 border-orange-300 rounded-2xl">
            {image ? (
              <img
                className="w-full h-full object-cover rounded-md"
                src={image}
                alt="Product Preview"
              />
            ) : (
              <p className="text-red-500">No Image to Display</p>
            )}
          </div>
        </div>

        <div className="right-form ">
          {loading ? (
            <Loading />
          ) : (
            <form
              className="p-5 h-full flex flex-col gap-3"
              onSubmit={addNewProductHandler}
            >
              <input
                className="p-5 border-orange-300 border-2 rounded-2xl hover:scale-105"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
              <input
                className="p-5 border-orange-300 border-2 rounded-2xl hover:scale-105"
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}

              <input
                className="p-5 border-orange-300 border-2 rounded-2xl hover:scale-105"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}

              <input
                className="p-5 border-orange-300 border-2 rounded-2xl hover:scale-105"
                type="text"
                placeholder="Image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}

              <textarea
                className="p-5 border-orange-300 border-2 rounded-2xl hover:scale-105"
                rows="5" // ✅ Controls the height (number of rows)
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}

              <p
                className={`text-sm ${
                  wordCounter(description) > 50
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
              >
                {wordCounter(description)}/50 words
              </p>
              <button
                type="submit"
                className="p-5 text-xl bg-orange-400 mt-auto rounded-2xl hover:scale-105 hover:bg-amber-600"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add New Product"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
