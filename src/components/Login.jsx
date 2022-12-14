import React from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return <Form title="sign in" handleClick={handleLogin} />;
};

export default Login;
