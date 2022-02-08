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
import { useAppSelector } from "@hooks/custom-useSelector";
import { useNavigate } from "react-router-dom";
import { notificationActions } from "@slices/notification-slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  useEffect(() => {
    const token_expires_at = localStorage.getItem('token_expires_at');

    if (token_expires_at) {
      const expireAt = new Date(token_expires_at).getTime();
      const isExpired = expireAt - new Date().getTime() <= 0;
      if (isExpired) {
        dispatch(userActions.logout());
      } else {
        navigate("/");
      }
    }
  }, []);

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
