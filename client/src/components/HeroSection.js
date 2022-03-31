import React from "react";

//component
import mountain from "../images/mountain-2-edit.png";
import { fDateTime } from "../utils/FormatDate";
import "../App.css";

const date = Date();

function HeroSection() {
  return (
    <>
      <div className="container-main">
        <img src={mountain} alt="mount" className="hero-image" />
        <div className="main-center">
          <h1>heello boy</h1>
        </div>

        <div className="main-text">
          <h1>
            Your <br />
            Dream
          </h1>

          <p>{fDateTime(date)}</p>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
