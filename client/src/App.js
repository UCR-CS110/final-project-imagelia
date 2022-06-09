import React from "react";
import Register from './components/register'
import Login from "./components/login";
import Home from "./components/home"
import './App.css';
import Navbar from './components/navbar';
import Comments from './components/comments';
import Profile from './components/profile';
import Post from './components/post';
import { Routes, Route, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <nav>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="home" element={<Home />} />
            <Route name="comments" path="/:postId" element={<Comments/>} />
            <Route path="profile" element={<Profile />} />
            <Route path="post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </nav>
  );
}

export default App;
