import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Components
import SignUp from "./components/auth/SignUp";
import LoginForm from "./components/auth/LoginForm";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
