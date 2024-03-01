import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ goToSignUpPage }) => {
  const { register, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        // console.log(res.data)
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("Error while fetching the data of Users", err);
      });
  }, []);

  const handleLogin = async (data) => {
    // console.log(fo);
    const { email, password } = data;
    // console.log("Email:", email);
    // console.log("Password:", password);
  
    // Check if the email is present in the database
    const user = userData.find((user) => user.email === email);
    console.log(user)
  
    if (!user) {
      setError("Invalid email or password");
      return; // Exit early if user with the entered email is not found
    }
  
    // Check if the entered password matches the user's password
    if (user.password !== password) {
      setError("Invalid email or password");
      return; // Exit early if the password is incorrect
    }
  
    // If both email and password are correct, proceed to the next page
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
          // value={formData.email}
        />
        {errors.email && (
          <p className="text-red-500">Email is required</p>
        )}
        <input
          {...register("password", { required: true })}
          className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Password"
          type="password"
          // value={formData.password}
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
        <span
          className="text-blue-500 cursor-pointer"
          onClick={goToSignUpPage}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
