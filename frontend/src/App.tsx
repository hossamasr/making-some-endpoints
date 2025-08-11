import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./containers/Home";
import Navbar from "./containers/components/NavBar";
import Register from "./containers/Register";
import AuthProvider from "./Auth/AuthProvider";
import Login from "./containers/LoginPage";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
