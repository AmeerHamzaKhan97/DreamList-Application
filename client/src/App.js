import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Components
import SignUp from "./components/auth/SignUp";
import LoginForm from "./components/auth/LoginForm";

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* <Route path="about" element={< />} /> */}
      </Routes>
    </div>
  );
}

export default App;
