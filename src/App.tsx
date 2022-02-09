import { Routes, Route } from "react-router-dom";
import Login from "@pages/Login";
import NewBet from "@pages/NewBet";
import NewPassword from "@pages/NewPassword";
import RecentGames from "@pages/RecentGames";
import Registration from "@pages/Registration";
import ResetPassword from "@pages/ResetPassword";
import NotificationTab from "@components/NotificationTab";
import Account from "@pages/Account";
import checkToken from "@utils/checkToken";
import { useDispatch } from "react-redux";
import { getAccount } from "@store/slices/user-slice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (checkToken()) {
      dispatch(getAccount());
    }
  }, []);

  return (
    <div className="App">
      <NotificationTab />
      <Routes>
        <Route path="/" element={<RecentGames />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-bet" element={<NewBet />} />
        <Route path="/change-password" element={<NewPassword />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
