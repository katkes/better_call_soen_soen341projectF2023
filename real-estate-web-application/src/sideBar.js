import React, { useState } from "react";
import "./css/SideBar.css";
function SideBar() {
 
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <><button className="openbtn" onClick={toggleSidebar}>
      {isOpen ? "\u2715" : "\u2261"}
    </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        
        {<div className="sideBar">
        <a id="classElement1" >Buy</a>
        <a id="classElement2" >Sell</a>
        <a id="classElement3" >My Broker</a>
        <a id="classElement4" >Profile</a>
        <a id="classElement5" >About us</a>
        </div>}
      </div>
      </>
    );
  }

  export default SideBar;