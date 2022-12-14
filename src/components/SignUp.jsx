import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const handleRegister = async (email, password) => {
    const result = createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
    navigate("/");
  };
  return <Form title="register" handleClick={handleRegister} />;
};

export default SignUp;
