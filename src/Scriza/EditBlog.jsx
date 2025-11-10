import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [image, setimage] = useState(null);
  const [oldimage, setoldimage] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `http://192.168.20.156:5000/api/admin/blogs/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const blog = response.data;

        settitle(blog.title);
        setcontent(blog.content);
        setselectedCategory(blog.category);
        setoldimage(blog.featureImage);
      } catch (error) {
        console.log("Error is", error);
      }
    };

    const getCat = async () => {
      try {
        const response = await axios.get(
          `http://192.168.20.156:5000/api/admin/categories`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCategories(response.data);
      } catch (err) {
        console.log("Category list error is", err);
      }
    };

    getBlog();
    getCat();
  }, [id]);

  // .......................................................................................................................................Blog update API......................................................................................................................................................................................

  const updateBlog = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("categoryId", selectedCategory);

      if (image) {
        formData.append("featureImage", image);
      }

      const response = await axios.put(
        `http://192.168.20.156:5000/api/admin/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("updated response ", response.data);
      alert("blog updated");
      navigate("/blog");
    } catch (error) {
      console.log("error updating blog", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center m-5 ">Edit Blog</h1>
        <form onSubmit={updateBlog} className=" d-flex flex-column">
          {oldimage && (
            <img
              src={`http://192.168.20.156:5000/${oldimage}`}
              alt="Old"
              style={{ width: "150px", borderRadius: "10px" }}
            />
          )}

          <label className="form-label m-2 labeldesign ">Add Image</label>
          <input
            className="form-control m-2 "
            type="file"
            onChange={(e) => setimage(e.target.files[0])}
          />
          <label className="form-label m-2 labeldesign ">Select category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setselectedCategory(e.target.value)}
            className="form-control m-2 "
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <label className="form-label m-2 labeldesign ">Blog Title</label>
          <input
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            className="form-control m-2 "
            placeholder="Add your title here..."
          />
          <label className="form-label m-2 labeldesign">Blog Content </label>
          <input
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            type="text"
            className="form-control m-2 design"
            placeholder="Add your content"
          />

          <button type="submit" className="btn btn-success m-2">
            Update Blog
          </button>

          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="btn btn-secondary m-2"
          >
            Back
          </button>
        </form>
      </div>
    </>
  );
}
