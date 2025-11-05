import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

export default function Login_page() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const loginsubmit = async (e) => {
    e.preventDefault();
    console.log("Login Successfully");

    const loginData = {
      email,
      password,
    };

    try {
      const loginResponse = await fetch(
        `http://192.168.20.156:5000/api/admin/auth/login`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      const getLoginData = await loginResponse.json();

      // saving API in local storage

      console.log("this is api response", getLoginData);

      const saveToken = getLoginData.token;
      console.log("Token is ", saveToken);
      localStorage.setItem("token", saveToken);

      // get response of token from local storage

      const getToken = localStorage.getItem("token");
      console.log("I get token", getToken);

      if (loginResponse.ok) {
        alert("Login Successfully");
        navigate("/blog");
      } else {
        alert(getLoginData.message);
      }
    } catch (error) {
      console.log("Error is ", error);
      alert("Try again");
    }
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        id="logincontainer"
      >
        <form id="loginform" onSubmit={loginsubmit}>
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
              Enter Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <button
            onClick={() => {
              navigate("/register");
            }}
            type="button"
            className="mx-2 btn btn-primary"
          >
            Registration
          </button>
        </form>
      </div>
    </>
  );
}
