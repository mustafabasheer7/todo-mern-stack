import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords do not match");
      confirmPassword.current.reportValidity();
      return;
    } else {
      const userInput = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("auth/register", userInput);
        navigate("/login");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account has been created! Please log in...",
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black flex justify-center items-center">
      <div className="h-full w-full filter blur bg-register-image bg-cover z-0"></div>
      <div className="absolute bg-gray-100 p-8 w-4/5 sm:w-3/5 md:w-2/5 xl:w-1/5 rounded-md shadow-2xl bg-gray-50">
        <h1 className="text-3xl font-light">CREATE AN ACCOUNT</h1>
        <form
          className="flex flex-wrap items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="username"
            className="flex-1 min-w-2/5 mt-6 mr-3 p-3 border-2 rounded-md text-lg outline-none"
            ref={username}
            required
            minLength="3"
          />
          <input
            type="email"
            placeholder="email"
            className="flex-1 min-w-2/5 mt-6 mr-3 p-3 border-2 rounded-md text-lg outline-none"
            ref={email}
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="password"
            className="flex-1 min-w-2/5 mt-6 mr-3 p-3 border-2 rounded-md text-lg outline-none"
            ref={password}
            required
          />
          <input
            type="password"
            placeholder="confirm password"
            className="flex-1 min-w-2/5 mt-6 mr-3 p-3 border-2 rounded-md text-lg outline-none"
            ref={confirmPassword}
            required
          />
          <p className="text-sm my-6 tracking-wide">
            By clicking '<span className="font-bold">Submit</span>' you agree to
            the adiClub Terms & Conditions,
            <span className="font-bold"> Privacy Policy</span> and the{" "}
            <span className="font-bold">Terms & Conditions</span>
          </p>
          <button
            className="py-2 px-4 border-2 text-lg font-medium bg-white hover:bg-gray-800 hover:text-white hover:border-white duration-300 ease-in-out rounded-md cursor-pointer w-1/2"
            type="submit"
          >
            Submit
          </button>
          <Link to="/login">
            <p className="mb-1 cursor-pointer mt-6 text-sm underline">
              You have an account? Click here to login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
