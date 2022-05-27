import React from "react";
import Register from './components/register'
import Login from "./components/login";
import Home from "./components/home"
import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
