// import React, { useState } from "react";
import SignUp from "./SignUpForm";
import "./css/topBar.css";
//import HomePage from "./home";
import PropertySection from "./PropertySection";
import FilterSelect from "./FilterSelect";
import ProfileButton from "./ProfileButton.js";

function TopBar({ setContentText }) {

  const handleSignOut = async (e) => {
    await fetch("http://localhost:8000/logout/", {
      // Use the correct URL for the logout endpoint in Django
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Clear the userID from sessionStorage
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("isRegistered");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleButtonClick = () => {
    // Change the content when the button is clicked

    setContentText(<SignUp setContentText={setContentText} />);
  };

  const handleButtonClick2 = () => {
    // Change the content when the button is clicked 
    if(!(sessionStorage.getItem('userID'))===true){
    }
    else{}
    setContentText(<PropertySection setContentText={setContentText}/>);
  };
  
 
  return (
    <div className="topBar">
   <FilterSelect/>
        <div className="pageLogo">
        <button onClick={handleButtonClick2} id="LogoAnchorHome">  
          {/* <img src="./Logo.png" alt="Urban Utopia"></img> */}
        <h1>Urban Utopia</h1>
        </button>
        </div>
        
        <div className="filterForm"> 
         
          <form id="ApiFilterSearch" action="" method="GET"> 
          {/* <label htmlFor="filter">Filter properties </label> */}
          <input type="text" name="filter" id="filter" placeholder="Search properties..."></input>
          </form>
        </div>
        
        {!(sessionStorage.getItem('userID')) ? null : (
        <ProfileButton username={sessionStorage.getItem("userName")} setContentText={setContentText}/>
      )}
      
      {(sessionStorage.getItem('userID')) ?  (
        <button className="signUpBtn" >Sign out</button>
      ):null
      }
        {(sessionStorage.getItem('userID')) ? null : (
        <button className="signUpBtn" onClick={handleButtonClick}>Sign in</button>
      )}
      
    </div>
  );
}

export default TopBar;