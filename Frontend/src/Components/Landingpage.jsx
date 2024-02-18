import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";
import bcrypt from 'bcryptjs'
import guyImage from '../Images/man.png';

const LandingPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      console.log("Hashed password:", hashedPassword);

      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-500 relative">
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 max-w-4xl w-full flex">
        <div className="w-1/2 relative">
          <div className="absolute inset-0">
            <img src={guyImage} alt="Office" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
            <h1 className="text-3xl font-bold mb-2">Weirdest Excuses</h1>
            <p className="text-lg text-center">"Step into a world where lateness is an art form. Share your quirkiest excuses with us!"</p>
          </div>
        </div>
        <div className="w-1/2 px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Discover the Art of Fashionably Late</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {registrationSuccess && (
              <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
                <h3>Registration Successful!!!</h3>
              </div>
            )}
            <InputWithError
              register={register}
              name="fullname"
              label="Full Name"
              rules={{ required: true, minLength: 4 }}
              errors={errors}
            />

            <InputWithError
              register={register}
              name="lastName"
              label="Unique UserName"
              rules={{ required: true, minLength: 4 }}
              errors={errors}
            />

            <InputWithError
              register={register}
              name="email"
              label="Email"
              rules={{ required: true, minLength: 4, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ }}
              errors={errors}
            />

            <InputWithError
              register={register}
              name="password"
              label="Password"
              rules={{ required: true, minLength: 8 }}
              errors={errors}
              type="password"
            />

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 w-full">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputWithError = ({ register, name, label, rules, errors, type = 'text' }) => (
  <>
    <input
      {...register(name, rules)}
      className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
      placeholder={label}
      type={type}
    />
    {errors[name]?.type === "required" && (
      <p className="text-red-500"> {label} is required</p>
    )}
    {errors[name]?.type === "minLength" && (
      <p className="text-red-500"> {label} should contain at least {rules.minLength} characters</p>
    )}
    {errors[name]?.type === "pattern" && (
      <p className="text-red-500">Invalid {label} format</p>
    )}
  </>
);

export default LandingPage;
