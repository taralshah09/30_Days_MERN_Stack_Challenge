import {Routes , Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage/LandingPage"
import ProductPage from "./pages/ProductPage/ProductPage"

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/product/:id" element={<ProductPage/>}></Route>
        <Route path="/*" element={<h1>404 Page Not Found!</h1>}></Route>
     </Routes>
    </>
  )
}

export default App
