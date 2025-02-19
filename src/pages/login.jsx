import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Login with Email & Password
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // Social login handler
  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/home"); // Redirect to home after login
    } catch (err) {
      setError("Authentication failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div
        id="back-div"
        className="bg-white rounded-[26px] m-4 flex w-3/4 max-w-4xl shadow-lg overflow-hidden"
      >
        {/* Login Section */}
        <div className="w-1/2 p-8">
          <h1 className="pt-8 pb-6 font-bold text-5xl text-center text-blue-600 cursor-default">
            Login
          </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 text-lg text-black">
                Email
              </label>
              <input
                id="email"
                className="border p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300 text-black"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 text-lg text-black">
                Password
              </label>
              <input
                id="password"
                className="border p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300 text-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              LOGIN
            </button>
          </form>

          <div id="third-party-auth" className="flex items-center justify-center mt-5 flex-wrap">
            <button
              onClick={() => handleSocialLogin(new GoogleAuthProvider())}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 m-1 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                className="w-6 h-6"
                src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                alt="Google"
              />
              <span>Sign in with Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin(new GithubAuthProvider())}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 m-1 bg-gray-900 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                className="w-6 h-6 filter dark:invert"
                src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                alt="GitHub"
              />
              <span>Sign in with GitHub</span>
            </button>
          </div>
        </div>

        {/* Signup Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center items-center bg-blue-600 rounded-r-[26px]">
          <h1 className="font-bold text-4xl text-white text-center cursor-default mb-4">
            Welcome to Buffer Cloud
          </h1>
          <span className="text-lg text-white mb-2 block text-center">
            Don't have an account?
          </span>
          <a
            onClick={()=>navigate("/Samplesignup")}
            className="group text-blue-600 bg-white hover:scale-105 transition duration-300 ease-in-out shadow-lg p-3 rounded-full text-center w-3/4"
          >
            SIGN UP
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
