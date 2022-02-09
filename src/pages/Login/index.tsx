import { ForgetPasswordLink } from "./styles";
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
} from "@global/global-styles";
import Title from "@components/Title";
import arrow from "@icons/arrow.svg";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendLoginRequest, userActions } from "@slices/user-slice";
import { useNavigate } from "react-router-dom";
import { notificationActions } from "@slices/notification-slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import checkToken from "@utils/checkToken";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(16).required(),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if(checkToken()){
    navigate("/");
  } else {
    dispatch(userActions.logout());
  }

  useEffect(() => {
    if (errors.email?.message)
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: errors.email?.message,
        })
      );
    else if (errors.password?.message)
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: errors.password?.message,
        })
      );
  }, [errors]);

  const loginHandler = handleSubmit((data) =>
    dispatch(sendLoginRequest(data.email, data.password))
  );

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
            id="email"
            type="text"
            placeholder="Email"
            {...register("email")}
          />
          <CustomHr />
          <CustomInput
            id="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <CustomHr />
          <ForgetPasswordLink id="forget-password" to="/reset-password">
            I forget my password
          </ForgetPasswordLink>
          <CustomConfirmButton id="login">
            Log In <CustomGreenArrow src={arrow} />
          </CustomConfirmButton>
        </CustomForm>
        <CustomBackButton id="signup" onClick={registrationRedirect}>
          Sign Up <CustomGrayArrow src={arrow} />
        </CustomBackButton>
      </Container>
    </Background>
  );
};

export default Login;
