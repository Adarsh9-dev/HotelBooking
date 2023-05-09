import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import "./Login_Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  })
  const HandelInput = e => {
    const {name,value} = e.target;
    setUser({
      ...user,
      [name]:value
    })
  }

  const HandelRegister = ()=> {
    const {name,email,password,phone,rePassword} = user;
    if (name && email && password && phone && (password === rePassword)) {
      axios.post("https://looking-com.onrender.com/authRoute/register",user)
      .then((res)=> {
        alert(res.data.message);
        navigate ('/login');
      })
    } else {
      alert("Invalid Input!")
    }
  }


  return (
    <div className='Register'>
    <Navbar />
    <Header setHeight="5rem"/>
    <div className='Container'>
        <div className='InnerContainer'>
            <h1>Register</h1>
            <input type="text" placeholder='Your Name' className='LRInput' name="name" value={user.name} onChange={HandelInput}/>
            <input type="text" placeholder='Your Email id' className='LRInput' name="email" value={user.email} onChange={HandelInput}/>
            <input type="text" placeholder='Your Phone no (with country code)' className='LRInput' name="phone" value={user.phone} onChange={HandelInput}/>
            <input type="password" placeholder='Your Password' className='LRInput' name="password" value={user.password} onChange={HandelInput}/>
            <input type="password" placeholder='Your Re-enter Password' className='LRInput' name="rePassword" value={user.rePassword} onChange={HandelInput}/>
            <button className='btn' onClick={HandelRegister} >Register</button>
            <span>or</span>
            <button className='btn' onClick={()=>navigate('/login')}>Login</button>
        </div>
    </div>
    </div>
  )
}

export default Register