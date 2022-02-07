import Title from "../../components/Title";
import {
  Background,
  Container,
  CustomForm,
  CustomHr,
  CustomInput,
  CustomInvertedGrayArrow,
  CustomConfirmButton,
  CustomBackButton,
  AuthText,
  CustomGreenArrow,
} from "../../shared/global/global-styles";
import arrow from "../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendSignUpRequest, userActions } from "../../store/slices/user-slice";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../shared/hooks/custom-useSelector";
import { notificationActions } from "../../store/slices/notification-slice";
const Registration = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAppSelector((store) => store.user.token);

  useEffect(() => {
    if (token.expires_at !== "") {
      const expireAt = new Date(token.expires_at).getTime();
      var isExpired = expireAt - new Date().getTime() < 0;
      if (isExpired) {
        dispatch(userActions.logout());
      } else {
        navigate("/");
      }
    }
  }, [token, dispatch, navigate]);

  const backHandler = () => {
    navigate(-1);
  };

  const signUpHandler = (event: React.FormEvent) => {
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
      dispatch(sendSignUpRequest(name, email, password));
    }
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
          <CustomConfirmButton type="submit">
            Register <CustomGreenArrow src={arrow} />
          </CustomConfirmButton>
        </CustomForm>
        <CustomBackButton onClick={backHandler}>
          <CustomInvertedGrayArrow src={arrow} /> Back
        </CustomBackButton>
      </Container>
    </Background>
  );
};

export default Registration;
