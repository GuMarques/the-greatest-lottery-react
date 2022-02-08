import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Background,
  Container,
  CustomForm,
  CustomHr,
  CustomInput,
  CustomGreenArrow,
  CustomConfirmButton,
  CustomBackButton,
  AuthText,
  CustomInvertedGrayArrow,
} from "@global/global-styles";
import Title from "@components/Title";
import { useAppSelector } from "@hooks/custom-useSelector";
import { notificationActions } from "@slices/notification-slice";
import { sendResetPasswordRequest } from "@slices/user-slice";
import arrow from "@icons/arrow.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.email?.message)
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: errors.email?.message,
        })
      );
  }, [errors]);

  const resetPasswordToken = useAppSelector(
    (state) => state.user.resetPasswordToken
  );

  useEffect(() => {
    if (resetPasswordToken !== "") {
      navigate("/change-password");
    }
  }, [resetPasswordToken, navigate]);

  const sendLinkHandler = handleSubmit((data) =>
    dispatch(sendResetPasswordRequest(data.email))
  );

  const backButtonHandler = () => {
    navigate(-1);
  };
  return (
    <Background>
      <Title />
      <Container>
        <AuthText>Reset password</AuthText>
        <CustomForm onSubmit={sendLinkHandler}>
          <CustomInput
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <CustomHr />
          <CustomConfirmButton type="submit">
            Confirm Email <CustomGreenArrow src={arrow} />
          </CustomConfirmButton>
        </CustomForm>
        <CustomBackButton onClick={backButtonHandler}>
          <CustomInvertedGrayArrow src={arrow} /> Back
        </CustomBackButton>
      </Container>
    </Background>
  );
};

export default ResetPassword;
