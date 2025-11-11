import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [IsLogin, setIsLogin] = useState(false);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }

    fetchBlogApi();
  }, []);
  const fetchBlogApi = async () => {
    try {
      const response = await axios.get(
        `http://192.168.20.156:5000/api/admin/blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`fetched data of blog api is=======`, response.data);
      setBlogs(response.data);
    } catch (error) {
      console.log("Getting this error", error);
    }
  };

  {
    /* .........................................................................................................................................delete btn function........................................................... ....................................................................................................................................................................................................*/
  }

  const deleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return; // user cancelled
    }

    try {
      const response = await axios.delete(
        `http://192.168.20.156:5000/api/admin/blogs/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog deleted successfully");
      fetchBlogApi();

      // setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== blogId));
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <>
      <nav
        id="navbar-top"
        className=" fixed-top navbar navbar-expand-lg bg-body-tertiary"
      >
        <div id="navbar" className="container-fluid">
          <a className="navbar-brand mx-5" href="#">
            <img
              src="src/assets/logo.jpg"
              alt="Bootstrap"
              width="200"
              height="60"
            />
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li id="nav-item" className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li id="nav-item" className="nav-item">
                <a className="nav-link " href="#">
                  About Us
                </a>
              </li>
              <li id="nav-item" className="nav-item">
                <a className="nav-link" href="#">
                  Our Products
                </a>
              </li>
              <li id="nav-item" className="nav-item">
                <a className="nav-link" href="#">
                  Core Services
                </a>
              </li>
              <li id="nav-item" className="nav-item">
                <a className="nav-link " href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <button
            onClick={() => navigate("/add-category")}
            type="button"
            className="btn mx-2 btn-outline-success"
          >
            Add Blog Category
          </button>
          <button
            onClick={() => navigate("/add-blog")}
            type="button"
            className="btn mx-2 btn-outline-success"
          >
            Add Blog
          </button>

          {!IsLogin ? (
            <>
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="btn mx-2 btn-outline-success"
              >
                Register here
              </button>
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="btn mx-2 btn-outline-success"
              >
                Login
              </button>
            </>
          ) : (
            <button
              className="btn mx-2 btn-outline-success"
              onClick={() => {
                localStorage.removeItem("token");
                setIsLogin(false);
                navigate("/login");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <h1
        id="blogtext"
        className=" fw-bolder mx-2 position-absolute  "
        style={{ top: "200px", left: "100px" }}
      >
        Blog
      </h1>
      <div className="imagebgc position-relative d-flex align-items-center ps-5"></div>
      <div className="container mt-5 mb-5">
        <h6 className="pt-5">Home/Blog</h6>
      </div>
      <div className=" d-flex">
        {/* .........................................................................................................................................................................first card of blog........................... ....................................................................................................................................................................................................*/}

        <div className="container row  col-8  g-2 ">
          {blogs?.map((blog) => (
            <div key={blog._id} className="card  col-md-6 col-xs-12">
              <img
                src={`http://192.168.20.156:5000/${blog.featureImage}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  <b>Card title:</b> {blog.title}
                </h5>
                <div className="d-flex justify-content-between mx-3 text-justify">
                  <p className="card-text ">Date: {blog.createdAt}</p>
                  <p className="card-text">
                    <b>Status: </b>
                    {blog.status}
                  </p>
                </div>
                <p className="card-text">{blog.content}</p>
              </div>
              <div className="blogCardBtn d-flex justify-content-around ">
                <button
                  onClick={() => {
                    navigate(`/edit-blog/${blog._id}`);
                  }}
                  className="mb-3 btn btn-outline-success"
                >
                  Edit Blog
                </button>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="mb-3 btn btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ..............................second card of blog.............................. */}

        <div className="col-4 mx-5 w-25 col-xs-12">
          <div className="card mb-3  ">
            <img
              src="src/assets/office.jpg"
              className=" card-img-top "
              style={{ height: "100px" }}
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
