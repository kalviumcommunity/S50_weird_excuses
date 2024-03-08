import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { USERS_URL } from "../constant/api";

const LoginForm = ({ goToSignUpPage }) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    axios
      .get(USERS_URL)
      .then((res) => {
        // console.log(res.data)
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("Error while fetching the data of Users", err);
      });
  }, []);

  const handleLogin = async (data) => {
    const { email, password } = data;

    const user = userData.find((user) => user.email === email);
    console.log(user);

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    if (user.password !== password) {
      setError("Invalid email or password");
      return;
    }

    console.log("Login successful!");
    navigate("/firstpage");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <input
          {...register("email", { required: true })}
          className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Email"
          type="text"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        <input
          {...register("password", { required: true })}
          className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={goToSignUpPage}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
