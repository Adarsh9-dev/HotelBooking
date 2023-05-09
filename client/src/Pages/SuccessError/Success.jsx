import React ,{useContext}from 'react'
import Email from '../../Components/Email/Email'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Success.css";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Success = () => {

  //Send message
  const data = JSON.parse(sessionStorage.data)
  axios.post('https://looking-com.onrender.com/send',data)
  .then(res=>console.log(res));

  //Room update
  const roomId = sessionStorage.roomId;
  const changeRoom = JSON.parse(sessionStorage.roomData);
  console.log(roomId);
  console.log(changeRoom);
  axios.put(`https://looking-com.onrender.com/roomRoute/change/${roomId}`,changeRoom)
  
  return (
    <div className="success">
        <Navbar />
        <Header showDetail="false" setHeight="5rem"/>
        <div className="successData">
            <div className="innerSuccessData">
                <FontAwesomeIcon icon={faCircleCheck} className="InnerFont" />
                <h3 className='InnerText'> Reservation Successfully</h3>
            </div>
            
        </div>
        <Email />
        <Footer />

    </div>
  )
}
export default Success;
