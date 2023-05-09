import React, { useContext } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {data} from "../../App";

const Navbar = () => {
  let dataObj;
  dataObj = useContext(data);
  if(sessionStorage.getItem("check") === "1") {
    dataObj = JSON.parse(sessionStorage.getItem("data"));
  }
  
  // console.log(dataObj);
  const navigate = useNavigate();
  return (
    <div className='nav-container'>
    <div className="navbar">
        <span className="logo" onClick={()=>navigate('/')}>Looking.com</span>
        {
          dataObj === null ? 
          <div className='nav-button'>
            <button className='n-button' onClick={()=> navigate('/register')}>Register</button>
            <button className='n-button' onClick={()=> navigate('/login')}>Login</button>
          </div> : <div className='loginName'>
            <FontAwesomeIcon icon={faUser} />
            <span className="logo logo1">{dataObj.name}</span>
          </div>
         }
        
      
    </div>
    </div>
  )
}

export default Navbar
