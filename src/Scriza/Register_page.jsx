import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Register_page() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const register = async (e) => {
    e.preventDefault();
    console.log("submitted");
    // navigate("/Blog");

    const formData = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await fetch(
        `http://192.168.20.156:5000/api/admin/auth/register`,

        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Registration Successful");
        navigate("/blog");
      } else {
        alert(postData.message);
      }
    } catch (error) {
      console.log("Error is", error);
      alert("Try after sometime!");
    }
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        id="logincontainer"
      >
        <form id="loginform" onSubmit={register}>
          <div className="mb-3">
            <label htmlFor="FullName" className="form-label">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              className="form-control"
              id="FullName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="form-control"
            />
          </div>
          <div className="dropdown">
            <button
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="bg-light mb-3 mt-3 btn border dropdown-toggle"
            >
              Select Role
            </button>
            <ul className="dropdown-menu">
              <li onClick={() => setRole("admin")} className="dropdown-item">
                Admin
              </li>
              <li onClick={() => setRole("author")} className="dropdown-item">
                author
              </li>
            </ul>
          </div>

          <button type="submit" className="btn btn-primary" disabled={!role}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
