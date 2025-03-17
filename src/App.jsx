import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details.jsx";
import CreateProduct from "./components/CreateProduct.jsx";
import Edit from "./components/Edit.jsx";

function App() {
  return (
    <div className="h-screen w-screen flex bg-[#DAD7CD]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
