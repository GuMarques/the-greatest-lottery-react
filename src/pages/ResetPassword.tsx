import { useState } from "react";
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

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  return (
    <Background>
      <Title />
      <Container>
        <AuthText>Reset password</AuthText>
        <CustomForm>
          <CustomInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <CustomHr />
          <CustomLoginButton>Send link</CustomLoginButton>
        </CustomForm>
        <CustomSignUpButton>Back</CustomSignUpButton>
      </Container>
    </Background>
  );
};

export default ResetPassword;
