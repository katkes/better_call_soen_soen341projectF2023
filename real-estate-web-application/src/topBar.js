import React, { useState } from "react";
import SignUp from "./SignUpForm";
import "./css/topBar.css";
//import HomePage from "./home";
import PropertySection from "./PropertySection";
import FilterSelect from "./FilterSelect";
import ProfileButton from "./ProfileButton.js";

function TopBar({ setContentText }) {

  const handleButtonClick = () => {
    // Change the content when the button is clicked 
    
    setContentText(<SignUp setContentText={setContentText} /> );
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
          <FilterSelect />
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