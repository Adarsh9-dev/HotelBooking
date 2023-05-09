import React from 'react'
import Email from '../../Components/Email/Email'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Success.css";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const ErrorFile = (props) => {
  return (
    <div className="success">
        <Navbar />
        <Header showDetail="false" setHeight="5rem"/>
        <div className="successData">
            <div className="innerErrorData">
                <FontAwesomeIcon icon={faXmark} className="InnerFont" />
                <h3 className='InnerText'> Reservation Failed</h3>
            </div>
            
        </div>
        <Email />
        <Footer />

    </div>
  )
}

export default ErrorFile;
