import React from 'react';
import { useState,useContext} from 'react';
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPlane, faTaxi, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import {data} from "../../App"

function Header(props) {

    let dataObj = useContext(data);
    if(sessionStorage.getItem("check") === "1") {
        dataObj = JSON.parse(sessionStorage.getItem("data"));
    }
    const navigate = useNavigate();
    const [city,setCity] = useState("");
    const [errorSign,setErrorSign] = useState(false);
    const [adult,setAdult] = useState(1);
    const [children,setChildren] = useState(0);
    const [room,setRoom] = useState(1);
    const [detailShow,setDetailShow] = useState(false);
    const [dateShow,setDateShow] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }]);
    
    
    return (
        <div className="header" style={{height:props.setHeight}}>
            <div className="head-container" >
                <div className="head-part active">
                    <FontAwesomeIcon icon={faBed} />
                    <span className="head-part-text">Stays</span>
                </div>
                <div className="head-part">
                    <FontAwesomeIcon icon={faPlane} />
                    <span className="head-part-text">Flights</span>
                </div>
                <div className="head-part">
                    <FontAwesomeIcon icon={faCar} />
                    <span className="head-part-text">Car rentals</span>
                </div>
                <div className="head-part">
                    <FontAwesomeIcon icon={faBed} />
                    <span className="head-part-text">Attractions</span>
                </div>
                <div className="head-part">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span className="head-part-text">Airport taxis</span>
                </div>
            </div>
        
            {props.showDetail == "true" &&<div className='down-head'>
                <h1>A lifetime of discounts? It's Genius</h1>
                <p>Get rewards for your travels- unlock instant savings of 10% or more with a free Booking account</p>
                {dataObj === null ?
                    <button className='head-button' onClick={()=>navigate('/register')}>Sign in / Register</button> : 
                <button className='head-button' onClick={()=>navigate('/hotel', {state : null})}>Book Now</button>
                }
            </div>}

            {/* Search Bar */}

            {props.showDetail == "true" &&<div className="head-search">
                {/* Choose Area */}

                <div className="head-search-container-field">
                    <FontAwesomeIcon icon={faBed} />
                    <input type="text"
                     placeholder="Where are you going?" 
                     className='hs-field-input' 
                     value={city}
                     onChange={(e)=>{
                        e.target.value != ""?setErrorSign(true):setErrorSign(false) 
                        setCity(e.target.value);
                        }}
                     />
                    {errorSign && <FontAwesomeIcon 
                    icon={faXmark} 
                    className="hs-error" 
                    onClick={()=> {
                        setCity("")
                        setErrorSign(false)
                    }}/>}
                </div>

                {/* Calender Section */}

                <div className="head-search-container-field" >
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <span className="hs-field-text" onClick={()=> {
                     if(detailShow) 
                        setDetailShow(false)
                    setDateShow(!dateShow)}}>
                    
                    {`${format(date[0].startDate,"dd/MM/yyyy")}`} - {`${format(date[0].endDate,"dd/MM/yyyy")}`}</span>
                    
                    {dateShow && <DateRange
                            editableDateInputs={true}
                            onChange={(item) => { 
                                setDate([item.selection])
                                setDateShow(!dateShow)}}
                                
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="head-search-date"
                    /> }
                    
                </div>

                {/* Person and Room details */}

                <div className="head-search-container-field">
                    <FontAwesomeIcon icon={faUser} />

                    <span className="hs-field-text" onClick={()=>{
                    if(dateShow) 
                        setDateShow(false)
                    setDetailShow(!detailShow)}}> 

                    {adult} adult - {children} children - {room} room
                    
                    </span>

                    {detailShow && <div className="hs-persont-details">
                        <div className="person-sec">
                            <span>Adult</span>
                            <div className="person-sec-button">
                                <button className="person-sec-button-change" disabled={adult <= 1} onClick={()=> setAdult(adult-1)}>-</button>
                                <span>{adult}</span>
                                <button className="person-sec-button-change" onClick={()=>setAdult(adult+1)}>+</button>
                            </div>
                        </div>
                        <div className="person-sec">
                            <span>Children</span>
                            <div className="person-sec-button">
                                <button className="person-sec-button-change" disabled={children <= 0} onClick={()=>setChildren(children-1)}>-</button>
                                <span>{children}</span>
                                <button className="person-sec-button-change" onClick={()=>setChildren(children+1)}>+</button>
                            </div>
                        </div>
                        <div className="person-sec">
                            <span>Rooms</span>
                            <div className="person-sec-button">
                                <button className="person-sec-button-change" disabled={room <= 1} onClick={()=>setRoom(room-1)}>-</button>
                                <span>{room}</span>
                                <button className="person-sec-button-change" onClick={()=>setRoom(room+1)}>+</button>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="head-search-button">
                    <button className='head-button' onClick={()=>navigate('/hotel',{state : {city,date,adult,children,room}})}>Search</button>
                </div>
            </div>}
        </div>
    )
}

export default Header
