import "./App.css";

// In the following import statement the order also matters
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import Root from "./pages/Root.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
