import {
  Background,
  Container,
  StartTitle,
  MiddleTitle,
  EndTitle,
  AuthText,
  CustomForm,
  CustomInput,
  CustomHr,
  ForgetPasswordLink,
  CustomLoginButton,
  CustomSignUpButton,
  CustomLoginArrow,
  CustomSignUpArrow,
} from "../components/LoginComponents";

import arrow from "../assets/icons/arrow.svg";

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { authActions } from "../store";

import axios from "axios";

const Login: React.FC = () => {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  /* const [login, setlogin] = useState();
  useEffect(() => {
    axios.post('http://127.0.0.1:3333/login', {
      email: 'user@teste.com',
      password: 'secret'
    }).then((res) => {
      console.log(res);
    })
  }, []) */

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(authActions.login({
      email: Email,
      password: Password
    }));
  };

  return (
    <Background>
      <Container>
        <StartTitle>The</StartTitle>
        <StartTitle>Greatest</StartTitle>
        <StartTitle>App</StartTitle>
        <MiddleTitle>for</MiddleTitle>
        <EndTitle>LOTTERY</EndTitle>
      </Container>
      <Container>
        <AuthText>Authentication</AuthText>
        <CustomForm onSubmit={loginHandler}>
          <CustomInput
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <CustomHr />
          <CustomInput
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <CustomHr />
          <ForgetPasswordLink href="#">I forget my password</ForgetPasswordLink>
          <CustomLoginButton>
            Log In <CustomLoginArrow src={arrow} />
          </CustomLoginButton>
        </CustomForm>
        <CustomSignUpButton>
          Sign Up <CustomSignUpArrow src={arrow} />
        </CustomSignUpButton>
      </Container>
    </Background>
  );
};

export default Login;
