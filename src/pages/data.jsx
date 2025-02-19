import React from "react";


const Data = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const Creatuser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, Password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });

      alert("Sign Up successfully");
      navigate("/home");  // Redirect after successful signup
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="button" onClick={Creatuser}>SIGN UP</button>
    </form>
  );
};


export default Data;