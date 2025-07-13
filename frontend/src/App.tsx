import { BrowserRouter ,Route,Routes} from "react-router-dom"
import HomePage from "./containers/Home"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
    </Routes>
    
    
    
    </BrowserRouter>
    
  )
}

export default App
