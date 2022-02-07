import { Routes, Route } from "react-router-dom";
import Login from "@pages/Login";
import NewBet from "@pages/NewBet";
import NewPassword from "@pages/NewPassword";
import RecentGames from "@pages/RecentGames";
import Registration from "@pages/Registration";
import ResetPassword from "@pages/ResetPassword";
import NotificationTab from "@components/NotificationTab";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
