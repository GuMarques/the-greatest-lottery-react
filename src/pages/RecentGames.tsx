import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useAppSelector } from "../hooks/custom-useSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecentGames = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const handlerLogout = () => {
    console.log("Hello");
    dispatch(userActions.logout());
    console.log(token);
  }
  useEffect(() => {
    if(token.expires_at != "") {
      const expireAt = new Date(token.expires_at).getTime();
      var isExpired = expireAt - new Date().getTime() < 0;
      if(isExpired) {
        dispatch(userActions.logout());
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [token])
  return <h1 onClick={handlerLogout}>Hello World</h1>
}

export default RecentGames;