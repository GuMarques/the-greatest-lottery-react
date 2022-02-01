import Login from "./pages/Login";
import RecentGames from "./pages/RecentGames";
import Registration from "./pages/Registration";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import NotificationTab from "./components/NotificationTab";
import NewBet from "./pages/NewBet";

function App() {
  return (
    <div className="App">
      <NotificationTab />
      <Routes>
        <Route path="/" element={<RecentGames />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/registration" element={<Registration />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/new-bet" element={<NewBet/>} />
      </Routes>
    </div>
  );
}

export default App;
