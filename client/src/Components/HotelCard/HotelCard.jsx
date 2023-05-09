import "./HotelCard.css";
import {useNavigate} from "react-router-dom";

function HotelCard(props) {
    const navigate = useNavigate();
    const night = props.nights;
    const id = props.data._id;
    const room = props.room;
    // console.log(props);
    return (
        <div className='HotelCard'>

            <img src={props.data.photos[0]} alt="Hotel image" className="CardImage"/>
            
            <div className="ListContainer">
                <h1 className='ListRightHead'>{props.data.name}</h1>
                <span>{props.data.distance}</span>
                <span>{props.data.taxy}</span>
                <span>{props.data.desc}</span>
                <span>Entire studio * 1 bathroom * 21m<sup>2</sup> 1 full bed</span>
                <span className="ListCancel">{}</span>
                <span className="ListMessage">{props.data.about}</span>
            </div>

            <div className="ListPrice">
                <div className="ListPriceTop">
                    <span>Excellent</span>
                    <button className='ListPriceTopButton'>{props.data.rating}</button>
                </div>
                <div className='ListPriceBottom'>
                    <span>₹{props.data.price}</span>
                    <span>Includes taxes and fees</span>
                    <button className='ListPriceButton btn'onClick={()=>navigate(`./${props.data._id}`,{state: {night,id,room}})}>See availability</button>
                </div>
            </div>

        </div>
    )
}

export default HotelCard
