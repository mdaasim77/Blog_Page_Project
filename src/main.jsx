import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import Blog from "./Scriza/Blog.jsx";
import "./style.css";
import Login_page from "./Scriza/Login_page";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register_page from "./Scriza/Register_page.jsx";
import AddBlog from "./Scriza/AddBlog.jsx";
import AddBlogCategory from "./Scriza/AddBlogCategory.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/blog" />} />
        <Route path="/login" element={<Login_page />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<Register_page />}></Route>
        <Route path="/add-blog" element={<AddBlog />}></Route>
        <Route path="/add-category" element={<AddBlogCategory />}></Route>
      </Routes>
    </Router>
  </>
);
