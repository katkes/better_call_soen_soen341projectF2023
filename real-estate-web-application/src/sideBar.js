import React, { useState } from "react";
function SideBar() {
 
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="openbtn" onClick={toggleSidebar}>
          {isOpen ? "\u2715" : "\u2261"}
        </button>
        { <div className="sideBar">
  
        <a id="classElement1" href="./App.js">Buy</a>
        <a id="classElement2" href="./App.js">Sell</a>
        <a id="classElement3" href="./App.js">My Broker</a>
        <a id="classElement4" href="./App.js">Profile</a>
        <a id="classElement5" href="./App.js">About us</a>
        </div>}
      </div>
    );
  }

  export default SideBar;