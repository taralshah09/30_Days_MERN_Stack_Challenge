import './App.css'
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={
          <h1 className="text-3xl font-bold underline">
            Home Page
          </h1>}>
        </Route>
        
      </Routes>
    </>
  )
}

export default App
