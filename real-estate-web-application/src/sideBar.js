import React, { useState } from "react";
import "./css/SideBar.css";
import SignUp from "./SignUpForm";
import GenerateBrokers from "./GenerateBrokers";

function SideBar({setContentText, setbrokering}) {
 
  
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const handleClick=()=>{

     if(sessionStorage.getItem("isRegistered")){
        setbrokering(false);
        setContentText(<GenerateBrokers/>);
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
        <a id="classElement2" className={`${(sessionStorage.getItem('role')==="broker") ? "" : "none"}`}>Sell</a>
        <a id="classElement3" className={`${(sessionStorage.getItem('role')==="broker") ? "none" : ""}`} onClick={handleClick}>My Broker</a>
        <a id="classElement4" >Profile</a>
        <a id="classElement5" >About us</a>
        </div>}
      </div>
      </>
    );
  }

  export default SideBar;