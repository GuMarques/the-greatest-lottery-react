import { useEffect, useState } from "react";
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
  CustomInvertedGrayArrow
} from "../../shared/global/global-styles";
import Title from "../../components/Title";
import { useAppSelector } from "../../shared/hooks/custom-useSelector";
import { notificationActions } from "../../store/slices/notification-slice";
import { sendChangePasswordRequest, userActions } from "../../store/slices/user-slice";
import arrow from "../assets/icons/arrow.svg";

const NewPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const resetPasswordToken = useAppSelector(
    (state) => state.user.resetPasswordToken
  );
  const navigateTo = useAppSelector((state) => state.user.navigateTo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const changePasswordHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message:
            "New Password and Confirm Password do not match, please try again.",
        })
      );
    } else {
      dispatch(sendChangePasswordRequest(resetPasswordToken, password));
    }
  };

  const backButtonHandler = () => {
    navigate(-1);
    dispatch(userActions.resetPasswordSetToken(''));
  };

  return (
    <Background>
      <Title />
      <Container>
        <AuthText>Reset password</AuthText>
        <CustomForm onSubmit={changePasswordHandler}>
          <CustomInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="New Password"
            required
          />
          <CustomInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <CustomHr />
          <CustomConfirmButton type="submit">Change Password <CustomGreenArrow src={arrow} /></CustomConfirmButton>
        </CustomForm>
        <CustomBackButton onClick={backButtonHandler}>
          <CustomInvertedGrayArrow src={arrow} /> Back
        </CustomBackButton>
      </Container>
    </Background>
  );
};

export default NewPassword;