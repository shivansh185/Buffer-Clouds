import React, { useState, useEffect } from "react";
import { auth, db, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, collection, addDoc } from "../firebase";
import { useNavigate } from "react-router-dom";

const Samplesignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        email: email,
      });
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: user.displayName || "", 
        email: user.email,
      });
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white rounded-[26px] m-4 flex w-3/4 max-w-4xl shadow-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <h1 className="pt-8 pb-6 font-bold text-5xl text-center text-blue-600">Sign Up</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="border p-3 mb-2 w-full text-black" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-3 mb-2 w-full text-black" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-3 mb-2 w-full text-black" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">SIGN UP</button>
          </form>
          <h4 className=" flex items-center justify-center text-black">or</h4>
          <div className="flex items-center justify-center mt-5 flex-wrap">
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
        <div className="w-1/2 p-8 flex flex-col justify-center items-center bg-blue-600 rounded-r-[26px]">
          <h1 className="text-4xl text-white text-center mb-4">Welcome to Buffer Cloud</h1>
          <span className="text-lg text-white mb-2">Already have an account?</span>
          <a href="/login" className="text-blue-600 bg-white p-3 rounded-full">LOGIN</a>
        </div>
      </div>
    </div>
  );
};

export default Samplesignup;


