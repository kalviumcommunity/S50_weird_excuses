import { useState } from "react";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import guyImage from "../Images/man.png";
import { useNavigate } from "react-router-dom";
import SignupForm from "./Forms/SignupForm";
import LoginForm from "./Forms/LoginForm";

const LandingPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const hashedPassword = await bcrypt.hash(data.Password, 10);
      console.log("Hashed password:", hashedPassword);
      setRegistrationSuccess(true);
      handleLogin();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToLoginPage = () => {
    setIsLoginPage(true);
    setCurrentPage(4);
  };

  const goToSignUpPage = () => {
    setIsLoginPage(false);
    setCurrentPage(4);
  };

  const handleLogin = () => {
    navigate("/firstpage");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-500 relative">
      <div
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 max-w-4xl w-full flex"
        style={{ height: "55%" }}
      >
        <div className="w-1/2 relative">
          <div className="absolute inset-0">
            <img
              src={guyImage}
              alt="Office"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
            <h1 className="text-3xl font-bold mb-2">Weirdest Excuses</h1>
            <p className="text-lg text-center">
              "Step into a world where lateness is an art form. Share your
              quirkiest excuses with us!"
            </p>
          </div>
        </div>
        <div className="w-1/2 px-4 flex flex-col items-center">
          {currentPage === 1 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Welcome to the World of Weirdest Excuses!
              </h2>
              <p className="text-lg mb-4">
                Enter a realm where tardiness becomes an art, and imagination
                reigns supreme. Celebrate the quirkiest excuses for workplace
                lateness, from intergalactic traffic to mischievous leprechauns.
                Join us on this delightful journey and share your tales of
                absurdity in the wonderfully weird world of tardiness.
              </p>
            </div>
          )}
          {currentPage === 2 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Discover the Art of Fashionably Late
              </h2>
              <p className="text-lg mb-4">
                Indulge in the fascinating world of late arrivals, where timing
                is an art and lateness is a statement. Learn about the various
                styles of tardiness and uncover the secrets of perfecting your
                excuse game. Prepare to be amused and enlightened as you delve
                into the artistry of arriving just a tad behind schedule.
              </p>
            </div>
          )}
          {currentPage === 3 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Share Your Quirkiest Excuses
              </h2>
              <p className="text-lg mb-4">
                Let your creativity shine with inventive excuses for being
                fashionably late to work. From cosmic calamities to mythical
                encounters, share your bizarre tales with us. Join in spreading
                laughter and camaraderie as we revel in the wonderfully weird
                excuses that turn the journey to work into a memorable
                adventure.
              </p>
            </div>
          )}

          {currentPage <= 3 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
              onClick={nextPage}
            >
              Continue
            </button>
          )}

          {currentPage === 4 && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {registrationSuccess && (
                <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded">
                  <h3>Registration Successful!!!</h3>
                </div>
              )}

              {
              isLoginPage ? (
                <SignupForm
                goToLoginPage={goToSignUpPage}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                />
                ) : (
                <LoginForm
                  goToSignUpPage={goToLoginPage}
                  onSubmit={handleSubmit(onSubmit)}
                  register={register}
                  errors={errors}
                />
              )
              }
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
