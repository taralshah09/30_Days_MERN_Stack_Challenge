import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Left from "./home/LeftPart/Left";
import Right from "./home/RightPart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cookies from "js-cookie";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser)
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ?
              <div className="flex h-screen">
                <Left />
                <Right />
              </div> :
              <Navigate to={"/login"} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={authUser ? <Navigate to={"/"} /> : <Login />} />
      </Routes>
      {/* <Loading/> */}
    </>
  );
}

export default App;
