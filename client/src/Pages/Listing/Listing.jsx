import React from "react";
import Email from "../../Components/Email/Email";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import ListBody from "../../Components/ListBody/ListBody";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import ListBodyNull from "../../Components/ListBody/ListBodyNull";

function Listing() {
  const location = useLocation();
  // console.log(location);
  return (
    <div>
      <Navbar />
      <Header showDetail="false" setHeight="5rem"/>
      {location.state === null? <ListBodyNull />:<ListBody data={location.state}/>
      }
      <Email />
      <Footer />
    </div>
  )
}

export default Listing
