import {
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
import { Background, Container } from "../components/GlobalComponents";
import Title from "../components/Title";
import arrow from "../assets/icons/arrow.svg";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendLoginRequest, userActions } from "../store/user-slice";
import { useAppSelector } from "../hooks/custom-useSelector";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token.expires_at != "") {
      const expireAt = new Date(token.expires_at).getTime();
      console.log(expireAt - new Date().getTime());
      var isExpired = expireAt - new Date().getTime() <= 0;
      console.log(isExpired);
      if (isExpired) {
        dispatch(userActions.logout());
      } else {
        navigate("/");
      }
    }
  }, [token]);

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(sendLoginRequest(email, password));
  };

  const registrationRedirect = () => {
    navigate("/registration");
  };

  return (
    <Background>
      <Title />
      <Container>
        <AuthText>Authentication</AuthText>
        <CustomForm onSubmit={loginHandler}>
          <CustomInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <CustomHr />
          <CustomInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <CustomHr />
          <ForgetPasswordLink to="/reset-password">I forget my password</ForgetPasswordLink>
          <CustomLoginButton>
            Log In <CustomLoginArrow src={arrow} />
          </CustomLoginButton>
        </CustomForm>
        <CustomSignUpButton onClick={registrationRedirect}>
          Sign Up <CustomSignUpArrow src={arrow} />
        </CustomSignUpButton>
      </Container>
    </Background>
  );
};

export default Login;
