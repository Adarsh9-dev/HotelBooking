import {useEffect, useState} from "react";
import "./Frame.css"
import Forest from "../../assets/forest.jpg";
import City from "../../assets/city.jpg";
import Hill from "../../assets/hill.jpg";

function Frame(props) {
    const API = "https://looking-com.onrender.com/hotelRoute/ok/countCity/?cities=Mumbai,Bhubaneswar,Hydrabad";

    const[user,setUser] = useState([]);
    const fetchData = async (url)=> {
        const result = await fetch(url);
        const data = await result.json();
        setUser(data);
    }
    useEffect(()=> {
        fetchData(API)
    },[])
    
    return (
        <div className="fContainer">
            <div className="framer">
                <div className='frameContainer'>
                    <img src={Forest} alt="Hotel in Forest" className="frameImage" />
                    <div className="innerFrameSection">
                        <span>Mumbai</span>
                        <span> {user[0]} properties</span>
                    </div>
                </div>
                <div className='frameContainer'>
                    <img src={City} alt="Hotel in City" className="frameImage" />
                    <div className="innerFrameSection">
                        <span>Bhubaneswar</span>
                        <span>{user[1]} properties</span>
                    </div>
                </div>
                <div className='frameContainer'>
                    <img src={Hill} alt="Hotel in Hill" className="frameImage" />
                    <div className="innerFrameSection">
                        <span>Hydrabad</span>
                        <span>{user[2]} properties</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Frame
