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
  
        <a id="classElement1" href="#">Buy</a>
        <a id="classElement2" href="#">Sell</a>
        <a id="classElement3" href="#">My Broker</a>
        <a id="classElement4" href="#">Profile</a>
        <a id="classElement5" href="#">About us</a>
        </div>}
      </div>
    );
  }

  export default SideBar;