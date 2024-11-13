import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import OurTeam from '../pages/OurTeam';
import WhatWeDo from "../pages/WhatWeDo";
import Contact from "../pages/Contact";
import ProductList from "./ProductList";
import Cart from "./Cart";
import WhatWeDoSingle from "./WhatWeDoSingle"; // Import the single post component

const Links = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/ourteam" element={<OurTeam />} />
      <Route path="/whatwedo" element={<WhatWeDo />} />
      <Route path="/productList" element={<ProductList />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/whatwedo/:id" element={<WhatWeDoSingle />} />
    </Routes>
  );
};

export default Links;
