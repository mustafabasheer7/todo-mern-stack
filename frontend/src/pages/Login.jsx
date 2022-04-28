import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginRequest } from "../apiRequests";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="relative h-screen w-screen bg-black flex justify-center items-center">
      <div className="h-full w-full filter blur bg-login-image bg-cover z-0"></div>
      <div className="absolute bg-gray-100 p-8 sm:w-2/4 lg:w-1/4 rounded-md shadow-2xl bg-gray-50">
        <h1 className="text-3xl font-light mx-auto text-align-center">
          SIGN IN
        </h1>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="username"
            required
            minLength="3"
            className="flex-1 min-w-2/5 mt-6 mr-3 p-3 border-2 rounded-md text-lg outline-none"
            ref={username}
          />
          <input
            type="password"
            placeholder="password"
            required
            className="flex-1 min-w-2/5 mt-6 mr-3 p-3 border-2 rounded-md text-lg outline-none"
            ref={password}
          />
          {error && (
            <p className="text-red-500 font-semibold text-center mt-2">
              Wrong Credentials!
            </p>
          )}
          <button
            className={
              "py-2 px-4 border-2 text-lg font-medium bg-white hover:bg-gray-800 hover:text-white hover:border-white duration-300 ease-in-out rounded-md cursor-pointer w-1/2 mt-6"
            }
            type="submit"
          >
            {loading ? (
              <CircularProgress color="secondary" size="21px" />
            ) : (
              "Sign In"
            )}
          </button>
          <Link to="/register">
            <p className="mb-1 cursor-pointer mt-6 text-sm underline" href="#">
              CREATE A NEW ACCOUNT
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
