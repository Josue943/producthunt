import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Form, InputSubmit, Error } from "../components/ui/Form";
import useForm from "../components/hooks/useForm";
import firebase from "../firebase/index";
import Router from "next/router";
import { registerValidation } from "../components/validation/validation";
import Spinner from "../components/ui/Spinner";
import FormControl from "../components/ui/FormControl";

const Register = () => {
  const user = {
    name: "",
    email: "",
    password: ""
  };
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);

  const onSubmit = async () => {
    try {
      await firebase.register(name, email, password);
      setSpinner(true);
      setTimeout(() => {
        setSpinner(false);
        Router.replace("/");
      }, 4000);
    } catch (error) {
      setError(error.message);
    }
  };

  const { values, errors, handleChange, handleSubmit, handleBlur } = useForm(
    user,
    registerValidation,
    onSubmit
  );
  const { name, email, password } = values;

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <Error>{error}</Error>}
        <FormControl
          name="name"
          Label="Name"
          onChange={handleChange}
          placeholder="Your Name"
          value={name}
          onBlur={handleBlur}
        />
        {errors.name && <Error>{errors.name}</Error>}
        <FormControl
          name="email"
          Label="email"
          onChange={handleChange}
          placeholder="Your email"
          value={email}
          onBlur={handleBlur}
        />
        {errors.email && <Error>{errors.email}</Error>}
        <FormControl
          name="password"
          Label="password"
          onChange={handleChange}
          placeholder="Your password"
          value={password}
          onBlur={handleBlur}
          type="password"
        />
        {errors.password && <Error>{errors.password}</Error>}
        <InputSubmit type="submit" value="Register" />
      </Form>
      {spinner && <Spinner />}
    </Layout>
  );
};

export default Register;
