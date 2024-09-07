import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import UpdatePage from "./pages/UpdatePage";
import DeletePage from "./pages/DeletePage";
import BookPage from "./pages/BookPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/add" element={<AddPage />}></Route>
        <Route path="/update" element={<UpdatePage />}></Route>
        <Route path="/delete" element={<DeletePage />}></Route>
        <Route path="/info" element={<BookPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
