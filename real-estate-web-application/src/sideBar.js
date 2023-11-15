import React, { useState } from "react";
import "./css/SideBar.css";
import SignUp from "./SignUpForm";
import GenerateBrokers from "./GenerateBrokers";

function SideBar({setContentText}) {
 
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const handleClick=()=>{

     if(sessionStorage.getItem("isRegistered")){
        <GenerateBrokers/>
     }
     else{
      setContentText(<SignUp setContentText={setContentText} /> );
     }

    }
  
    return (
      <><button className="openbtn" onClick={toggleSidebar}>
      {isOpen ? "\u2715" : "\u2261"}
    </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        
        {<div className="sideBar">
        <a id="classElement1" >Buy</a>
        <a id="classElement2" >Sell</a>
        <a id="classElement3" onClick={handleClick}>My Broker</a>
        <a id="classElement4" onClick={handleClick}>Profile</a>
        <a id="classElement5" >About us</a>
        </div>}
      </div>
      </>
    );
  }

  export default SideBar;