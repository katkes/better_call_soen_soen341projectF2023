import React, { useState } from "react";
import "./css/SideBar.css";
import SignUp from "./SignUpForm";
import GenerateBrokers from "./GenerateBrokers";

function SideBar({setContentText, setbrokering, Brokering}) {
 
  
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const handleClick=()=>{
      setbrokering(!Brokering);
     if(sessionStorage.getItem("isRegistered")){
        
        setContentText(<GenerateBrokers/>);
     }
     else{
      setContentText(<SignUp setContentText={setContentText} /> );
     }

    }

    const handleClick12=()=>{
      setbrokering(!Brokering);
    }
  
   
    return (
      <><button className="openbtn" onClick={toggleSidebar}>
      {isOpen ? "\u2715" : "\u2261"}
    </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        
        {<div className="sideBar">
        <a id="classElement1" onClick={handleClick12}>Buy</a>
        <a id="classElement2" className={`${(sessionStorage.getItem('role')==="broker") ? "" : "none"}`}>Sell</a>
        <a id="classElement3" className={`${(sessionStorage.getItem('role')==="broker") ? "none" : ""}`} onClick={handleClick}>My Broker</a>
        <a id="classElement4" onClick={handleClick12}>Profile</a>
        <a id="classElement5" onClick={handleClick12}>About us</a>
        </div>}
      </div>
      </>
    );
  }

  export default SideBar;