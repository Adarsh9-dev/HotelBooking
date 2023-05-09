import { useState,useEffect } from 'react';
import HotelCard from '../HotelCard/HotelCard';
import './ListBody.css';
import {format} from "date-fns";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React from "react";
import axios from "axios";


function ListBody(props) {
    // console.log(props)
    
    const [city,setCity] = useState(props.data.city);
    const [adult,setAdult] = useState(props.data.adult);
    const [children,setChildren] = useState(props.data.children);
    const [room,setRoom] = useState(props.data.room);
    const [date, setDate] = useState(props.data.date);
    const [maxPrice,setMaxPrice] = useState(9999);
    const [minPrice,setMinPrice] = useState(0);
    const [dateShow,setDateShow] = useState(false)
    const [data,setData] = useState([]);
    const coreData = {city,maxPrice,minPrice};

    let FD =window.parseInt(format(date[0].startDate,"dd"));
    let FM =window.parseInt(format(date[0].startDate,"MM"));
    let FY =window.parseInt(format(date[0].startDate,"yyyy")); 

    let SD =window.parseInt(format(date[0].endDate,"dd"));
    let SM =window.parseInt(format(date[0].endDate,"MM"));
    let SY =window.parseInt(format(date[0].endDate,"yyyy"));

    let day = (no) => {
        if (no === 1 || no === 3 || no === 5 || no === 7 || no === 8 || no === 10 || no === 12) {
            return 31;
        }
        else if (no == 2) {
            return 28;
        }
        else {
            return 30;
        }
    }
    function findNights(FD,FM,FY,SD,SM,SY) {
        if (FM === SM && FY === SY) {
            return SD - FD;
        }
        else if (FM != SM && FY === SY) {
            let fDay = day(FM) - FD;
            let lDay = SD;
            let mDay = 0;
            for (let i = FM+1; i < SM; i++) {
                mDay +=day(i)
            }
            let totalDay = fDay+lDay+mDay;
            return totalDay;
        }
        else if (FY != SY) {
            let fDay = day(FM) - FD;
            let mDay = 0;
            while (true) {
                if ((FY - SY) === 0) {
                    for (let i = FM+1; i < SM; i++) {
                        mDay +=day(i)
                    }
                    if (SM > 2 && FY % 4 == 0) {
                        mDay+=1;
                    }
                    break;
                }
                else {
                    for (let i = FM+1; i < 13; i++) {
                        mDay +=day(i)
                    }
                    if (FY % 4 == 0) {
                        mDay+=1;
                    }
                }

                FY+= 1;
                FM = 0;
            }
            let lDay = SD;

            let totalDay = fDay+lDay+mDay;
            return totalDay;
        }
    }

    
    const nights = findNights(FD,FM,FY,SD,SM,SY) ;
    // console.log(nights);

    let API = ""
    if (city === "") {
        API = "https://looking-com.onrender.com/hotelRoute/limit/limitedHotel?limit=10";
    }
    else {
        API = `https://looking-com.onrender.com/hotelRoute/city/limitedCityHotel?city=${city}&limit=6`
    }

    const showHotel = async (url) => {
        const result = await fetch(url);
        const data = await result.json();
        // console.log(data);
        setData(data)
    }
    useEffect(() =>{
        showHotel(API)
    },[]);

    const searchHotel = () => {
        axios.post("https://looking-com.onrender.com/hotelRoute/price/pricedHotel?limit=6",coreData)
        .then(res=>setData(res.data));
    }

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
                            <input type="number" className="ListInput" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)}/>
                        </div>
                        <div className='OptionListContainer'>
                            <span>Max price<small> (per night)</small></span>
                            <input type="number" className="ListInput" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)}/>
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
                    <button className="ListLeftButton" onClick={searchHotel}>Search</button>
                </div>
            </div>
         
            <div className='ListRight'>
                {
                    data.map((indexData,i)=><HotelCard key={i} data={indexData} nights={nights} room={room} />)
                }
            </div>
        </div>
    </div>
   
  )
}

export default ListBody

