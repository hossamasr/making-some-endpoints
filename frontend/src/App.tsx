import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./containers/Home"
import Navbar from "./containers/components/NavBar"
import Register from "./containers/Register"
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
