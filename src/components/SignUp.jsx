import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const handleRegister = async (email, password) => {
    try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
    navigate("/");
  } catch (error) {
    console.log(error);
    alert(error);
  }
  };
  return <Form title="register" handleClick={handleRegister} />;
};

export default SignUp;
