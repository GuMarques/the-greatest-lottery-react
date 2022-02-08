import Title from "@components/Title";
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
} from "@global/global-styles";
import arrow from "@icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendSignUpRequest, userActions } from "@slices/user-slice";
import { useEffect } from "react";
import { useAppSelector } from "@hooks/custom-useSelector";
import { notificationActions } from "@slices/notification-slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(16).required(),
});

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(errors);
    if (errors.name?.message)
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: errors.name?.message,
        })
      );
    else if (errors.email?.message)
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
  }, [dispatch, navigate]);

  const backHandler = () => {
    navigate(-1);
  };

  const signUpHandler = handleSubmit((data) =>
    dispatch(sendSignUpRequest(data.name, data.email, data.password))
  );

  return (
    <Background>
      <Title />
      <Container>
        <AuthText>Registration</AuthText>
        <CustomForm onSubmit={signUpHandler}>
          <CustomInput
            id="name"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          <CustomHr />
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
