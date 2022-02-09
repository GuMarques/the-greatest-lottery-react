import NavBar from "@components/Navbar";
import Title from "@components/Title";
import {
  CustomConfirmButton,
  CustomForm,
  CustomGreenArrow,
  CustomHr,
  CustomInput,
} from "@global/global-styles";
import { updateAccount, userActions } from "@store/slices/user-slice";
import checkToken from "@utils/checkToken";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Content, Text } from "./styles";
import arrow from "@icons/arrow.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { notificationActions } from "@store/slices/notification-slice";
import { useAppSelector } from "@hooks/custom-useSelector";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const infos = useAppSelector((state) => state.user);

  if (!checkToken()) {
    dispatch(userActions.logout());
    navigate("/login");
  }

  useEffect(() => {
    setValue('name', infos.name);
    setValue('email', infos.email);
  }, [infos])

  useEffect(() => {
    if (errors.email?.message)
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: errors.email?.message,
        })
      );
    else if (errors.name?.message)
      dispatch(
        notificationActions.runNotification({
          status: "error",
          message: errors.name?.message,
        })
      );
  }, [errors])

  if (!checkToken()) {
    dispatch(userActions.logout());
    navigate("/login");
  }

  const changeInfo = handleSubmit((data) => {
    dispatch(updateAccount(data.email, data.name));
  });

  return (
    <>
      <NavBar />
      <Content>
        <Title />
        <div>
          <Text>Change Info</Text>
          <CustomForm onSubmit={changeInfo}>
            <CustomInput
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            <CustomHr />
            <CustomInput
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            <CustomHr />
            <CustomConfirmButton type="submit" id="change">
              Change <CustomGreenArrow src={arrow} />
            </CustomConfirmButton>
          </CustomForm>
        </div>
      </Content>
    </>
  );
};

export default Account;
