import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignInPage from './pages/SignInPage/SignInPage';
import { UserProvider } from './context/getUser';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import MyPosts from "./pages/MyPosts/MyPosts"
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AddPost from './pages/AddPost/AddPost';

function App() {
  const location = useLocation();
  
  // Determine if the current path is /login or /signup
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
  return (
    <UserProvider>
      {/* Render Navbar conditionally based on hideNavbar */}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route index path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignInPage />}></Route>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/my-posts' element={<MyPosts/>}></Route>
        <Route path='/add-post' element={<AddPost/>}></Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
