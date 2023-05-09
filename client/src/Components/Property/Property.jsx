import {useEffect,useState} from "react";
import "./Property.css";
import Hotel from "../../assets/hotel.jpg";
import Apartment from "../../assets/apartment.jpg";
import Cabin from "../../assets/cabin.jpg";
import Resort from "../../assets/resort.jpg";
import Villa from "../../assets/villa.jpg";

function Property() {
    const [type,setType] = useState([]);
    const API = "https://looking-com.onrender.com/hotelRoute/count/countType?types=Hotel,Apartment,Resort,Villa,Cabin";

    const addType = async(url)=> {
        try {
            const result = await fetch(url);
            const data = await result.json();
            // console.log(data);
            setType(data);
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        addType(API)
    },[]);

  return (
    <div className="property">
        <div className="propertyContainer">
            <h2 className="browsePropery">Browse by property type</h2>
            <div className="propSection">
                <div className="propSectionInner">
                    <img src={Hotel} alt="Hotel image" className="propertyImage"/>
                    <span>Hotels</span>
                    <span>{type[0]} hotel</span>
                </div>
                <div className="propSectionInner">
                    <img src={Apartment} alt="Apartment image" className="propertyImage"/>
                    <span>Apartments</span>
                    <span>{type[1]} apartment</span>
                </div>
                <div className="propSectionInner">
                    <img src={Resort} alt="Resort image" className="propertyImage"/>
                    <span>Resorts</span>
                    <span>{type[2]} resort</span>
                </div>
                <div className="propSectionInner">
                    <img src={Villa} alt="Villa image" className="propertyImage"/>
                    <span>Villas</span>
                    <span>{type[3]} villa</span>
                </div>
                <div className="propSectionInner">
                    <img src={Cabin} alt="Cabin image" className="propertyImage"/>
                    <span>Cabins</span>
                    <span>{type[4]} cabin</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Property
