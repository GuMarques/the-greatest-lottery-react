import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Background,
  Container,
  AuthText,
  CustomForm,
  CustomHr,
  CustomInput,
  CustomConfirmButton,
  CustomBackButton,
  CustomGreenArrow,
  CustomInvertedGrayArrow,
} from "@global/global-styles";
import Title from "@components/Title";
import { useAppSelector } from "@hooks/custom-useSelector";
import { notificationActions } from "@slices/notification-slice";
import { sendChangePasswordRequest, userActions } from "@slices/user-slice";
import arrow from "@icons/arrow.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let schema = yup.object().shape({
  password: yup.string().min(6).max(16).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
});

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const resetPasswordToken = useAppSelector(
    (state) => state.user.resetPasswordToken
  );
  const navigateTo = useAppSelector((state) => state.user.navigateTo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.password?.message)
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: errors.password?.message,
        })
      );
    else if (errors.confirmPassword)
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message:
            "New Password and Confirm Password do not match, please try again.",
        })
      );
  }, [errors, dispatch]);

  useEffect(() => {
    if (resetPasswordToken === "") {
      navigate("/login");
    }
  }, [resetPasswordToken, navigate]);

  useEffect(() => {
    if (navigateTo !== "") {
      dispatch(userActions.navigateAfterResetPassword(""));
      navigate(navigateTo);
    }
  }, [navigate, dispatch, navigateTo]);

  const changePasswordHandler = handleSubmit((data) =>
    dispatch(sendChangePasswordRequest(resetPasswordToken, data.password))
  );

  const backButtonHandler = () => {
    navigate(-1);
    dispatch(userActions.resetPasswordSetToken(""));
  };

  return (
    <Background>
      <Title />
      <Container>
        <AuthText>Reset password</AuthText>
        <CustomForm onSubmit={changePasswordHandler}>
          <CustomInput
            id="password"
            type="password"
            placeholder="New Password"
            {...register("password")}
          />
          <CustomHr />
          <CustomInput
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <CustomHr />
          <CustomConfirmButton type="submit">
            Change Password <CustomGreenArrow src={arrow} />
          </CustomConfirmButton>
        </CustomForm>
        <CustomBackButton onClick={backButtonHandler}>
          <CustomInvertedGrayArrow src={arrow} /> Back
        </CustomBackButton>
      </Container>
    </Background>
  );
};

export default NewPassword;
