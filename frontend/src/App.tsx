import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./containers/Home"
import Navbar from "./containers/components/NavBar"
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
