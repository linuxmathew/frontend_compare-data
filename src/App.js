import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Resource from "./components/Resource";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/sign-in" exact element={<Login />} />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/resource" exact element={<Resource />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
