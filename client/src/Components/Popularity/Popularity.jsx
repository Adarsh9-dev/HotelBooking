import "./Popularity.css";
import Home1 from "../../assets/Home5.jpg";
import Home2 from "../../assets/home2.jpg";
import Home3 from "../../assets/home3.jpg";
import Home4 from "../../assets/home4.jpg";
import { useEffect, useState } from "react";

function Popularity() {
    const [featured, addFeatured] = useState([]); 
    const API = "https://looking-com.onrender.com/hotelRoute/featured/featuredHotel?Limit=4";

    const setFeatured = async(url) =>{
        try {
            const result = await fetch(url);
            const data = await result.json();
            addFeatured(data);
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        setFeatured(API);
    },[])
  return (
    <div className="popularity">
        <div className="popularityContainer">
            <h2 className="PText">Homes guests love</h2>
            <div className="PInner">
                {
                    featured.map((data,i) => 
                    
                        <div className="PInnerContainer" key={i}>
                            <img src={data.photos[0]} alt="Home image 1" className="PopularityImage"/>
                            <span>{data.name}</span>
                            <span>{data.city}</span>
                            <span>Starting from ${data.price}</span>
                            <span><button className="PButton">{data.rating}</button> {data.title}</span>
                        </div>
                    )
                }


                {/* <div className="PInnerContainer">
                    <img src={Home2} alt="Home image 1" className="PopularityImage"/>
                    <span>The Taj Empire</span>
                    <span>Mumbai</span>
                    <span>Starting from $120</span>
                    <span><button className="PButton">8.9</button> Excellent</span>
                </div>
                <div className="PInnerContainer">
                    <img src={Home3} alt="Home image 1" className="PopularityImage"/>
                    <span>The Taj Empire</span>
                    <span>Mumbai</span>
                    <span>Starting from $120</span>
                    <span><button className="PButton">8.9</button> Excellent</span>
                </div>
                <div className="PInnerContainer">
                    <img src={Home4} alt="Home image 1" className="PopularityImage"/>
                    <span>The Taj Empire</span>
                    <span>Mumbai</span>
                    <span>Starting from $120</span>
                    <span><button className="PButton">8.9</button> Excellent</span>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Popularity
