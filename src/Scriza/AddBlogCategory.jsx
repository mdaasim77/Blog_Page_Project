import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddBlogCategory() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  const categorySubmit = async (e) => {
    e.preventDefault();
    console.log("category submitted");

    const data = {
      name: categoryName,
    };

    const categoryToken = localStorage.getItem("token");

    console.log("category token is =", categoryToken);

    try {
      const categoryResponse = await fetch(
        `http://192.168.20.156:5000/api/admin/categories`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${categoryToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      const categoryJsonResponse = await categoryResponse.json();

      // console.log("Category API response", categoryJsonResponse);

      if (categoryResponse.ok) {
        alert("Category Submitted Succesfully");
        navigate("/blog");
      }
    } catch (error) {}
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
        <h2 id="blogh2">Choose Blog Category</h2>

        <form
          onSubmit={categorySubmit}
          className="addblogform"
          style={{ width: "100%" }}
        >
          <div className="mb-3">
            <label className="form-label labeldesign">Add Category</label>
            <textarea
              onChange={(e) => setCategoryName(e.target.value)}
              className=" border form-control"
              type="text"
              required
              style={{ width: "100%" }}
              name="Name"
              placeholder="Add your Blog category here..."
            />
          </div>

          <button
            className=" mt-3 btn btn-outline-secondary mb-5"
            style={{ width: "100%" }}
            type="submit"
          >
            Submit
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
