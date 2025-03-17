import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import Loading from "./Loading";
import Toast from "../components/Toast";

const Edit = () => {
  const { products, setProducts } = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Find the product to edit
  const product = products?.find(
    (product) => String(product.id) === String(id)
  );

  // ✅ Initialize form fields with product data
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Pre-fill form when component mounts
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setCategory(product.category);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.description);
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!image.trim()) newErrors.image = "Image is required";
    if (!price.trim()) newErrors.price = "Price is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProductHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: "Please fill all required fields!", type: "error" });
      return;
    }

    // ✅ Update existing product
    const updatedProducts = products.map((p) =>
      p.id === product.id
        ? { ...p, title, category, image, price, description }
        : p
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setLoading(true);
    setToast({ message: "Product updated successfully!", type: "success" });
    setTimeout(() => {
      setLoading(true);
    }, 2000);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div>
          <Link to="/" className="flex items-center p-5">
            <span className="text-5xl text-[#284B63]">
              <i className="ri-arrow-left-wide-line"></i>
            </span>
            <h2 className="text-[#284B63] text-xl">GO HOME</h2>
          </Link>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <div className="w-[50%] border-2 rounded-2xl h-[60%] mx-auto my-auto grid grid-cols-2">
          <div className="left-img p-5 flex items-center justify-center overflow-hidden">
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

          <div className="right-form">
            <form
              className="p-5 h-full flex flex-col gap-3"
              onSubmit={updateProductHandler}
            >
              <input
                className="p-5 border-orange-300 border-2 rounded-2xl"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}

              <input
                className="p-5 border-orange-300 border-2 rounded-2xl"
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}

              <input
                className="p-5 border-orange-300 border-2 rounded-2xl"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}

              <input
                className="p-5 border-orange-300 border-2 rounded-2xl"
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}

              <textarea
                className="p-5 border-orange-300 border-2 rounded-2xl"
                rows="5"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}

              <button
                type="submit"
                className="p-5 text-xl bg-orange-400 mt-auto rounded-2xl hover:bg-amber-600"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
