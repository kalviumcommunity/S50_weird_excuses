import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USERS_URL } from "../constant/api";
import bcrypt from "bcryptjs";

const LoginForm = ({ goToSignUpPage }) => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get(USERS_URL)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("Error while fetching the data of Users", err);
      });
  }, []);

  const handleLogin = async () => {
    const user = userData.find((user) => user.Email === email);

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    // Assuming user.Password is the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
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
          className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
