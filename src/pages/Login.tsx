import { ForgetPasswordLink } from "../components/LoginComponents";
import {
  Background,
  Container,
  CustomConfirmButton,
  CustomBackButton,
  CustomGreenArrow,
  CustomGrayArrow,
  AuthText,
  CustomForm,
  CustomInput,
  CustomHr,
} from "../components/GlobalComponents";
import Title from "../components/Title";
import arrow from "../assets/icons/arrow.svg";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendLoginRequest, userActions } from "../store/user-slice";
import { useAppSelector } from "../hooks/custom-useSelector";
import { useNavigate } from "react-router-dom";
import { notificationActions } from "../store/notification-slice";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token.expires_at !== "") {
      const expireAt = new Date(token.expires_at).getTime();
      const isExpired = expireAt - new Date().getTime() <= 0;
      if (isExpired) {
        dispatch(userActions.logout());
      } else {
        navigate("/");
      }
    }
  }, [token, dispatch, navigate]);

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const emailValidate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/i;
    if (!email.match(emailValidate)) {
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: "This is not a valid email adress.",
        })
      );
    } else {
      dispatch(sendLoginRequest(email, password));
    }
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
          <ForgetPasswordLink to="/reset-password">
            I forget my password
          </ForgetPasswordLink>
          <CustomConfirmButton>
            Log In <CustomGreenArrow src={arrow} />
          </CustomConfirmButton>
        </CustomForm>
        <CustomBackButton onClick={registrationRedirect}>
          Sign Up <CustomGrayArrow src={arrow} />
        </CustomBackButton>
      </Container>
    </Background>
  );
};

export default Login;
