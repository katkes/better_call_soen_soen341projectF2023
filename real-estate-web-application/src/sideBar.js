import React, {useState} from "react";
import "./css/SideBar.css";
import SignUp from "./SignUpForm";
import GenerateBrokers from "./GenerateBrokers";
import AboutUs from "./AboutUs";
import CreateListing from "./CreateListing";

function SideBar({setContentText, setbrokering, Brokering}) {


    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = () => {
        setbrokering(!Brokering);
        if (sessionStorage.getItem("isRegistered") && (sessionStorage.getItem('role') === "broker")) {

            setContentText(<GenerateBrokers/>);
        } else {
            setContentText(<SignUp setContentText={setContentText}/>);
        }

    }

    const handleClick12 = () => {
        if (sessionStorage.getItem("isRegistered")) {
        } else {
            setContentText(<SignUp setContentText={setContentText}/>);
        }
    }
    const handleClick6 = () => {
     
          setContentText(<AboutUs setContentText={setContentText}/>); 
  }

   const handleClick4 = () => {

          setContentText(<CreateListing setContentText={setContentText}/>);
  }

    return (
        <>
            <button className="openbtn" onClick={toggleSidebar}>
                {isOpen ? "\u2715" : "\u2261"}
            </button>
            <div className={`sidebar ${isOpen ? "open" : ""}`}>

                {<div className="sideBar">
                    <a id="classElement1">Buy</a>
                    <a id="classElement2"
                       className={`${(sessionStorage.getItem('role') === "broker") ? "" : "none"}`} onClick={handleClick4}>Sell</a>
                    <a id="classElement3" className={`${(sessionStorage.getItem('role') === "broker") ? "none" : ""}`}
                       onClick={handleClick}>My Broker</a>
                    <a id="classElement4" onClick={handleClick12}>Profile</a>
                    <a id="classElement5" onClick={handleClick6}>About us</a>
                </div>}
            </div>
        </>
    );
}

export default SideBar;