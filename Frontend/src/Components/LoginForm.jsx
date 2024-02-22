import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ goToSignUpPage }) => { 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/users', {data});
      console.log(response.data);
      if (response.data.success) {
        navigate('/firstpage'); 
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Email"
          type="text"
        />
        {errors.email && (
          <p className="text-red-500">Email is required</p>
        )}
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
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 w-full"
        >
          Login
        </button>
      </form>
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
