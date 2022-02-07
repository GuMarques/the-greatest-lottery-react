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
} from "../../shared/global/global-styles";
import Title from "../../components/Title";
import { useAppSelector } from "../../shared/hooks/custom-useSelector";
import { notificationActions } from "../../store/slices/notification-slice";
import { sendResetPasswordRequest } from "../../store/slices/user-slice";
import arrow from "../assets/icons/arrow.svg";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetPasswordToken = useAppSelector(
    (state) => state.user.resetPasswordToken
  );

  useEffect(() => {
    if (resetPasswordToken !== "") {
      navigate("/change-password");
    }
  }, [resetPasswordToken, navigate]);

  const sendLinkHandler = (event: React.FormEvent) => {
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
      dispatch(sendResetPasswordRequest(email));
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <CustomHr />
          <CustomConfirmButton type="submit">Confirm Email <CustomGreenArrow src={arrow} /></CustomConfirmButton>
        </CustomForm>
        <CustomBackButton onClick={backButtonHandler}>
        <CustomInvertedGrayArrow src={arrow} /> Back
        </CustomBackButton>
      </Container>
    </Background>
  );
};

export default ResetPassword;
