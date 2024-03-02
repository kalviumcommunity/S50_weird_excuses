import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignupForm = ({ goToLoginPage }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/users", data);
      console.log(response.data);
      Cookies.set("username", data.User_Name);
      navigate("/firstpage");
    } catch (error) {
      console.error(error.response.data, "error in the link");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <input
        {...register("User_Name", { required: true })}
        className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Username"
        type="text"
      />
      {errors.username && <p className="text-red-500">Username is required</p>}
      <input
        {...register("Email", { required: true })}
        className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Email"
        type="text"
      />
      {errors.email && <p className="text-red-500">Email is required</p>}
      <input
        {...register("Password", { required: true })}
        className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Password"
        type="password"
      />
      {errors.password && <p className="text-red-500">Password is required</p>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 w-full"
        onClick={handleSubmit(onSubmit)}
      >
        Sign Up
      </button>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={goToLoginPage}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
