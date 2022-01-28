import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Background, Container } from "../components/GlobalComponents";
import {
  CustomForm,
  CustomHr,
  CustomInput,
  CustomLoginArrow,
  CustomLoginButton,
  CustomSignUpButton,
  AuthText,
} from "../components/LoginComponents";
import Title from "../components/Title";
import { sendResetEmailRequest } from "../store/user-slice";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendLinkHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(sendResetEmailRequest(email));
  }

  const backButtonHandler = () => {
    navigate(-1);
  }
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
          <CustomLoginButton type="submit">Send link</CustomLoginButton>
        </CustomForm>
        <CustomSignUpButton onClick={backButtonHandler}>Back</CustomSignUpButton>
      </Container>
    </Background>
  );
};

export default ResetPassword;
