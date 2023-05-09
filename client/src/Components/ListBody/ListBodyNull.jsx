import { useState } from 'react';
import HotelCard from '../HotelCard/HotelCard';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faGhost} from "@fortawesome/free-solid-svg-icons"
import './ListBody.css';
import {format} from "date-fns";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React from "react";


function ListBody() {
    const navigate = useNavigate();
    const [city,setCity] = useState("");
    const [adult,setAdult] = useState(1);
    const [children,setChildren] = useState(0);
    const [room,setRoom] = useState(1);
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);
    const [dateShow,setDateShow] = useState(false);
    
    // console.log(props.data);
  return (
    <div className='ListBody'> 
        <div className='ListBodyContainer'>
         
            <div className='ListLeft'>
                <h1 className='ListLeftText'>Search</h1>
                <div className='ListLeftDesc'>
                    <label>Destination</label>
                    <input type="text" placeholder="Choose a city" value={city} onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div className='ListLeftDesc'>
                    <label>Check-in date</label>
                    <span onClick={()=>setDateShow(!dateShow)}>
                        {`${format(date[0].startDate,"dd/MM/yyyy")}`} -  {`${format(date[0].endDate,"dd/MM/yyyy")}`}
                    </span>
                    {dateShow &&
                     <DateRange
                            editableDateInputs={true}
                            onChange={(item) => {
                                setDate([item.selection])
                                setDateShow(!dateShow) 
                            }}
                                
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="hs-date"
                    /> 
                    }
                </div>
                <div className="Option">
                    <p className='OptionText'>Options</p>
                    <div className='OptionList'>
                        <div className='OptionListContainer'>
                            <span>Min price<small> (per night)</small></span>
                            <input type="number" className="ListInput" disabled/>
                        </div>
                        <div className='OptionListContainer'>
                            <span>Min price<small> (per night)</small></span>
                            <input type="number" className="ListInput" disabled/>
                        </div>
                        <div className='OptionListContainer'>
                            <span>Adult</span>
                            <input type="number" className="ListInput" value={adult} onChange={(e)=>setAdult(e.target.value)}/>
                        </div>
                        <div className='OptionListContainer'>
                            <span>Children</span>
                            <input type="number" className="ListInput" value={children} onChange={(e)=>setChildren(e.target.value)}/>
                        </div>
                        <div className='OptionListContainer'>
                            <span>Room</span>
                            <input type="number" className="ListInput" value={room} onChange={(e)=>setRoom(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className='ListLeftButtonContainer'>
                    <button className="ListLeftButton" onClick={()=>navigate('/hotel',{state : {city,date,adult,children,room}})}>Search</button>
                </div>
            </div>
         
            <div className='ListRight'>
                <div className="listRightBodyNull">
                    <FontAwesomeIcon icon={faGhost} className="listRightFont"/>
                    <h2 >Search Hotels</h2>
                </div>
                {/* <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard />
                <HotelCard /> */}

            </div>
        </div>
    </div>
   
  )
}

export default ListBody

