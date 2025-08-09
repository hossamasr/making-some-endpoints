import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./containers/Home"
import Navbar from "./containers/components/NavBar"
import Register from "./containers/Register"
import AuthProvider from "../context/Auth/AuthProvider"
function App() {

  return (

    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
