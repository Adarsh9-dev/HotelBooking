import "./Hotel.css"
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import Email from "../../Components/Email/Email";
import Footer from "../../Components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowLeft, faArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "../../App";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js"

const PK_KEY= "pk_test_51MeBaOSIEGmvNqDpAwi7gEMMNntS06h87Xw3fiRNwPBtRLui568yxLfqLW4AJDyWa5G6Rb7YZAIsKHSdRVWVXHt000hj4sM73Q";

const demo = {
  "name": "BUS BAMROO",
  "type": "Hotel",
  "address": "Satynagar",
  "distance": "2km from airport",
  "title": "Excellent",
  "taxy": "Free airport taxi",
  "price": 3500,
  "rating": 4.8,
  "desc": "Studio Apartment with Air conditioning",
  "cancelation": "true",
  "city": "Mumbai",
  "featured": "true",
  "rooms": [],
  "about": "You can cancel later, so lock in this great price today!",
  "photos": ["https://c41production.com/wp-content/uploads/2019/04/otel-profesyonel-dis-mekan-fotograf-cekimi-c41production-main-buildings-30.jpg"]
}

function Hotel(props) {
  const [roomId,setRoomId] = useState(null);
  const [roomAvalable,setRoomAvalable] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0)
  const [checker, setChecker] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [hotelData, setHotelData] = useState(demo);
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state.night === 0) {
    location.state.night = 1;
  }

  useEffect(() => {
    axios.get(`https://looking-com.onrender.com/hotelRoute/oneHotel/${location.state.id}`)
      .then(res => setHotelData(res.data));
    }, [])
    
  function HandelClickableImage(i) {
    setImageIndexNo(i);
    setIsImageDisplay(true);
  }
  const HandelArrow = (x) => {
    if (x === 'l') {
      imageIndexNo < 1 ? setImageIndexNo(5) : setImageIndexNo(imageIndexNo - 1);
    }
    else {
      imageIndexNo > 4 ? setImageIndexNo(0) : setImageIndexNo(imageIndexNo + 1);
    }
  }
  const [imageIndexNo, setImageIndexNo] = useState(0);
  const [isImageDisplay, setIsImageDisplay] = useState(false);
  
  let dataObj;
  dataObj = useContext(data);
  if(sessionStorage.getItem("check") === "1") {
    dataObj = JSON.parse(sessionStorage.getItem("data"));
  }
  // const dataStore = 
  // props.setUser(dataStore)
    // console.log(p)
    const [dataStore, setDataStore] = useState( {
      ...dataObj,
      hotel: hotelData.name,
      night: location.state.night,
      price: totalPrice * location.state.night * location.state.room,
      room:  location.state.room,
    });
    const myFunction = () => {
        setDataStore( 
        {
          ...dataObj,
          id: roomId,
          hotel: hotelData.name,
          night: location.state.night,
          // price: 5,
          price: totalPrice * location.state.night * location.state.room,
          room:  location.state.room,
        }
        )
        // console.log(hotelData.name);
        sessionStorage.setItem("data",JSON.stringify(dataStore));
    }
    
    const BookNow = async () => {
      await Promise.all(hotelData.rooms.map((id) => {
        return axios.get(`https://looking-com.onrender.com/roomRoute/getRoom/${id}`);
      }))
      .then((res) => {
        myFunction();
        setChecker(!checker);
        setRoomData(res);
      });
    }
    
    const ReserveHotel = async () => {
      // console.log(totalPrice);
      // console.log();
      if(location.state.room <= roomAvalable) {
        
          const changeRoom = {
            noOfRooms: roomAvalable - location.state.room
          }
          
        const allData = {
          name: hotelData.name,
          // price: totalPrice * location.state.night * location.state.room,
          price: totalPrice * location.state.night,
          description: hotelData.desc,
          quantity: location.state.room,
          image: hotelData.photos[0],
        }
        sessionStorage.setItem("roomId",roomId);
        sessionStorage.setItem("roomData",JSON.stringify(changeRoom));
        console.log(roomId);
      //Room update
      
      const stripe = await loadStripe(PK_KEY);
      await axios.post("https://looking-com.onrender.com/payment", {
        headers: {
          "content-Type": "application/json",
        },
        all: allData,
      }).then((res)=> {
        myFunction();
        stripe.redirectToCheckout({sessionId: res.data.id})
        
      })
      .catch((err) => {
        navigate('/error');
      })

    }
    else {
      alert("Insuficient Rooms");
      navigate('/error')
    }
  }
  return (
    <div className="HotelVellore">
      {isImageDisplay &&
        <div className="ClickableImageContainer">
          <div className="ClickableImage" >
            <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" onClick={() => HandelArrow('l')} />
            <FontAwesomeIcon icon={faArrowRight} className="arrowRight" onClick={() => HandelArrow('r')} />
            <FontAwesomeIcon icon={faCircleXmark} className="arrowCross" onClick={() => setIsImageDisplay(false)} />
            <img src={hotelData.photos[imageIndexNo]} alt="clickable image" className="TopClickableImage" />
          </div>
        </div>
      }

      <Navbar />
      <Header showDetail="false" setHeight="5rem" />
      <div className="HotelContainer">
        <div className="Hotel">

          <div className="HotelHead">
            <div className="HotelHeadLeft">
              <h1 className="HotelHeadLeftHeading">{hotelData.name}</h1>
              <span><FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "0.6rem" }} /> {hotelData.address}</span>
              <span>Excellent location - {hotelData.distance}</span>
              <span>{hotelData.about} : ₹{hotelData.price} </span>
            </div>
            <div className="HotelHeadRight">
              {
                dataObj === null ?
                  <button className="btn HotelHeadRightButton" onClick={() => navigate('/register')}>Book Now!</button> :
                  <button className="btn HotelHeadRightButton" onClick={BookNow}>Book Now!</button>
              }

            </div>
          </div>

          <div className="HotelImage">
            {
              hotelData.photos.map((i, index) => <img key={index} src={i} alt="demo text" className="HotelImgContainer" onClick={() => HandelClickableImage(index)} />)
            }

          </div>

          <div className="HotelBook">
            <div className="HotelBookLeft">
              <h1 className="HotelBookLeftHead">Stay in the heart of {hotelData.city}</h1>
              <ul className="HotelInfo">
                <li className="HotelInfoList">{hotelData.desc}</li>
              </ul>
            </div>
            <div className="HotelBookRight">
              <h2 className="HotelBookRightHead">Perfect for {location.state.night}-night stay!</h2>
              <span className="HotelBookRightDesc">Located in the {hotelData.address}</span>
              <span className="HotelBookRightPrice"><span className="HotelRoomPrice">₹{hotelData.price * location.state.night * location.state.room} </span>({location.state.night} night, {location.state.room}room)</span>
              {
                dataObj === null ?
                  <button className="btn HotelBookRightBtn" onClick={() => navigate('/register')}>Book Now!</button> :
                  <button className="btn HotelBookRightBtn" onClick={BookNow}>Book Now!</button>
              }
            </div>
          </div>
        </div>
      </div>
      <Email />
      <Footer />


      {checker &&
        <div className="topVellore">
          <div className="roomVellore" >
            <div className="roomPopof">
              <span className="roomPopofText">Select your rooms:</span>
              {roomData.map((val) =>
                <div className="room">
                  <div className="roomLeft">
                    {/* <span className="roomHead">{val.data.title}</span> */}
                    <span className="roomHead">{val.data.title}</span>
                    <span className="roomDetails">{val.data.desc}</span>
                    <span className="roomPeople">Max people: <span className="roomPeopleNo">{val.data.maxPeople}</span></span>
                    <span className="roomLeftPrice">₹{val.data.price}</span>
                  </div>
                  <div className="roomRight">
                    <div className="roomRightSelect">
                      <span className="roomRightSelectText">Book One: </span>
                      <input type="radio" name="val" onChange={()=> {
                        setRoomAvalable(val.data.noOfRooms)
                        setRoomId(val.data._id);
                        setTotalPrice(val.data.price)}
                      }/>
                      
                    </div>
                    <span className="roomAvalable">(Avalable Room: <span className="roomAvalableNo">{val.data.noOfRooms}</span>)</span>
                  </div>
                </div>
              )}
              <hr />
              <div className="totalPrice">
                <div className="totalPriceLeft">
                  <span>You have to Pay </span>
                </div>
                <div className="totalPriceRight">
                  <span className="totalpriceRightValue">₹ {totalPrice* location.state.room*location.state.night}</span>
                  <div className="detailedExplain"> 
                    <span>( Base Price: {totalPrice} </span> x 
                    <span> Nights: {location.state.night}</span> x 
                    <span> Rooms: {location.state.room} )</span>
                  </div>

                </div>

              </div>
              {
                totalPrice === 0 ? <button className="btn HotelBookRightBtn" style={{cursor: "not-allowed",backgroundColor:"var(--lightBlue)"}}>Reserve Now!</button> : 
                <button className="btn HotelBookRightBtn" onClick={ReserveHotel}>Reserve Now!</button>
              }
              
            <FontAwesomeIcon icon={faCircleXmark} className="roomCrossIcon" onClick={() => {
              setChecker(!checker)
              setTotalPrice(0);
              }} />
            </div>
          </div>
        </div>
      }
    </div >

  )
}

export default Hotel
