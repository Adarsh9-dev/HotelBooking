import React from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Frame from "../../Components/Frame/Frame";
import Property from "../../Components/Property/Property";
import Popularity from "../../Components/Popularity/Popularity";
import "./Home.css"
import Email from "../../Components/Email/Email";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from "react-router-dom"; 

function Home() {
  const location = useLocation();
  return (
    <div>
      <Navbar />
      <Header showDetail="true" setHeight="17rem"/>
      <div className="bodyContainer">
          <Frame />
          <Property />
          <Popularity />
          <Email />
      </div>
      <Footer />
    </div>
  )
}

export default Home;
