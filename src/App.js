import { Route, Routes } from "react-router-dom";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import SupplyData from "./components/SupplyData";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/sign-in" exact element={<Login />} />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/supply-data" exact element={<SupplyData />} />
      </Routes>
    </div>
  );
}

export default App;
