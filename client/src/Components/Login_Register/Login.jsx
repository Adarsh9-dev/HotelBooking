import React,{useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import "./Login_Register.css";


const Login = (props) => {
  const navigate = useNavigate();
  const [Loger,setLoger] = useState({
    email:"",
    password:""
  })
  const HandelLogin = e => {
    const {name, value} = e.target;
    setLoger({
      ...Loger,
      [name]:value
    })
  }
  const Handeler = ()=> {
    const {email,password} = Loger;
    if (email && password) {
      axios.post("https://looking-com.onrender.com/authRoute/login",Loger)
      .then((res)=> {
        if (res.data.message === "Invalid Password" || res.data.message === "Email not found, Please register") {
          alert(res.data.message);
        }
        else {
          const storage = {
              email: res.data.email,
              name: res.data.name,
              password: res.data.password,
              phone: res.data.phone,
              id: res.data._id,
              room: "",
              hotel: "",
              price: "",
              night: "",
          }
          // console.log(storage);
          // sessionStorage.setItems("data",JSON.stringify(storage));
          sessionStorage.setItem("data",JSON.stringify(storage));
          sessionStorage.setItem("check","1")
          // console.log(sessionStorage.getItem("data"))
          props.setUser(storage);
          navigate('/',{state: res.data});
        }
      })
    } else {
      alert("Invalid Input");
    }
  }


  return (
    <div className='Login'>
    <Navbar />
    <Header setHeight="5rem"/>
    <div className='Container'> 
      <div className='InnerContainer'>
        <h1 className='LogingHead'>Login</h1>
        <input type="email" placeholder='Your Email' className='LRInput' name="email" value={Loger.email} onChange={HandelLogin}/>
        <input type="password" placeholder='Your Password' className='LRInput' name="password" value={Loger.password} onChange={HandelLogin}/>
        <button className='btn LRBtn' onClick={Handeler}>Login</button>
        <span>or</span>
        <button className='btn LRBtn' onClick={()=>navigate('/register')}>Register</button>
      </div>
    </div>
    </div>
  )
}

export default Login