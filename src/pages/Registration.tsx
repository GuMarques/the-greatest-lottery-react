import Title from "../components/Title";
import { Background, Container } from "../components/GlobalComponents";
import {
  CustomForm,
  CustomHr,
  CustomInput,
  CustomLoginArrow,
  CustomLoginButton,
  CustomSignUpButton,
  AuthText
} from "../components/LoginComponents";
import arrow from "../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendSignUpRequest, userActions } from "../store/user-slice";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/custom-useSelector";
const Registration = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAppSelector(store => store.user.token);

  useEffect(() => {
    if(token.expires_at != "") {
      const expireAt = new Date(token.expires_at).getTime();
      var isExpired = expireAt - new Date().getTime() < 0;
      if(isExpired) {
        dispatch(userActions.logout());
      } else {
        navigate('/');
      }
    }
  }, [token])

  const backHandler = () => {
    navigate(-1);
  };

  const signUpHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(sendSignUpRequest(name, email, password));
  };

  return (
    <Background>
      <Title />
      <Container>
        <AuthText>Registration</AuthText>
        <CustomForm onSubmit={signUpHandler}>
          <CustomInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <CustomHr />
          <CustomInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <CustomHr />
          <CustomInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <CustomHr />
          <CustomLoginButton type="submit">
            Register <CustomLoginArrow src={arrow} />
          </CustomLoginButton>
        </CustomForm>
        <CustomSignUpButton onClick={backHandler}>Back</CustomSignUpButton>
      </Container>
    </Background>
  );
};

export default Registration;
