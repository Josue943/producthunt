import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Form, InputSubmit, Error } from "../components/ui/Form";
import FormControl from "../components/ui/FormControl";
import useForm from "../components/hooks/useForm";
import { loginValidation } from "../components/validation/validation";
import Spinner from "../components/ui/Spinner";
import Router from "next/router";
import firebase from "../firebase/index";

const Login = () => {
  const user = {
    email: "",
    password: ""
  };
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const user = await firebase.login(email, password);
      setSpinner(true);
      setTimeout(() => {
        setSpinner(false);
        Router.push("/");
      }, 4000);
    } catch (error) {
      setError("THE PASSWORD IS INVALID ");
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    user,
    loginValidation,
    login
  );

  const { email, password } = values;

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <Error>{error}</Error>}
        <FormControl
          name="email"
          Label="email"
          onChange={handleChange}
          placeholder="Your email"
          value={email}
          /*  onBlur={handleBlur} */
        />
        {errors.email && <Error>{errors.email}</Error>}
        <FormControl
          name="password"
          Label="password"
          onChange={handleChange}
          placeholder="Your password"
          value={password}
          /*   onBlur={handleBlur} */
          type="password"
        />
        {errors.password && <Error>{errors.password}</Error>}
        <InputSubmit type="submit" value="Login" />
      </Form>
      {spinner && <Spinner />}
    </Layout>
  );
};

export default Login;
