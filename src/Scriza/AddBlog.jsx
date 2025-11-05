import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const [categories, setCategories] = useState([]);

  // console.log("this is categories result", categories);

  const [selectedCategory, setSelectedCategory] = useState("");

  // console.log("blog selectedCategory", selectedCategory);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const navigate = useNavigate();

  //  ........................................................................................................................................................................................................................... Getting response of category from server using GET APIs............................................................................................................................................................................................................................

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("aad blog token is here", token);
        const response = await fetch(
          `http://192.168.20.156:5000/api/admin/categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jsonResponse = await response.json();
        setCategories(jsonResponse || []);
        console.log("API response geting ", jsonResponse);
      } catch (error) {
        console.log("Error is ", error);
      }
    };
    fetchCategory();
  }, []);

  //  ........................................................................................................................................................................................................................... Add blog code into server using POST API.............................................................................................................................................................................................................................

  const uploadBlog = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("category", selectedCategory);
      formData.append("title", title);
      formData.append("status", status);
      formData.append("scheduled_at", date);
      formData.append("content", blogContent);
      if (image) formData.append("featureImage", image);

      const response = await fetch(
        `http://192.168.20.156:5000/api/admin/blogs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const result = await response.json();
      console.log("POST APIs response result is ", result);

      if (response.ok) {
        alert("Blog Added");
        navigate("/blog");
      } else {
        alert(result.message || "Blog Content unable to add");
      }
    } catch {
      console.error("Error uploading blog:");
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div
        className="container d-block  justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className=" my-5 justify-content-center d-flex">
          <img
            className=""
            src="src/assets/logo.jpg"
            alt="Scriza_logo"
            style={{ height: "40px", width: "150px" }}
          />
        </div>
        <h2 id="blogh2">Add Blog here!</h2>

        <form
          onSubmit={uploadBlog}
          className="addblogform"
          style={{ width: "100%" }}
        >
          <div className="mb-3">
            <label className="form-label labeldesign">Upload Cover image</label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              className="design border form-control"
              type="file"
              accept="image/*"
              name="image"
              style={{ width: "100%" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label labeldesign">
              Select Blog Category
            </label>
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label labeldesign">Blog Tittle</label>
            <textarea
              onChange={(e) => setTitle(e.target.value)}
              className="border form-control"
              required
              type="text"
              name="Tittle"
              placeholder="Add your Tittle here"
              style={{
                width: "100%",
              }}
            />
          </div>

          {/* <div className="mb-3">
            <label className="form-label labeldesign">Creater Name</label>
            <textarea
              onChange={(e) => setCreaterName(e.target.value)}
              className=" border form-control"
              type="text"
              required
              style={{ width: "100%" }}
              name="Name"
              placeholder="Your Name"
            />
          </div> */}
          <div className="mb-3">
            <label className="form-label labeldesign">Date</label>
            <input
              onChange={(e) => setDate(e.target.value)}
              className=" border form-control"
              style={{ width: "100%" }}
              required
              type="date"
              name="Date"
            />
          </div>

          <div className="mb-3">
            <label className="form-label labeldesign">Select Status</label>

            {/*................... draft dropdown...................... */}

            <select
              className="form-control"
              status={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              value={status}
            >
              <option value="">-- Select Draft --</option>

              <option value="draft">Draft</option>
              <option value="publish">Publish not in use</option>
              <option value="archived">Archive not in use</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label labeldesign">Blog content</label>

            <textarea
              onChange={(e) => setBlogContent(e.target.value)}
              className="design border form-control"
              required
              style={{ width: "100%" }}
              type="text"
              name="BlogContent"
              placeholder="Write your content here..."
            />
          </div>
          <button
            onClick={uploadBlog}
            className="btn btn-outline-secondary mb-5"
            style={{ width: "100%" }}
            type="submit"
          >
            Upload Blog
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/blog")}
            style={{ width: "100%" }}
            type="button"
          >
            Back
          </button>
        </form>
      </div>
    </>
  );
}
