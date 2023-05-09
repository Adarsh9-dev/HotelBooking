import React, { useState,createContext } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Listing from "./Pages/Listing/Listing";
import Hotel from "./Pages/Hotel/Hotel";
import NoPage from "./Pages/NoPage/NoPage";
import "./App.css";
import Login from './Components/Login_Register/Login';
import Register from './Components/Login_Register/Register';
import Success from './Pages/SuccessError/Success';
import ErrorFile from './Pages/SuccessError/ErrorFile';

const data = createContext();
function App() {
  const [user,setUser] = useState(null);
  return (
    <div>
      <data.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel" element={<Listing />} />
          <Route path="/hotel/:id" element={<Hotel setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<ErrorFile />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      </data.Provider>
    </div>
  )
}

export default App
export {data};
