import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={user ? <Main /> : <Navigate to="/register" />}
          />
          <Route
            path="register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
