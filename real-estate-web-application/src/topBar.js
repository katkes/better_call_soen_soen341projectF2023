import React, { useState } from "react";
import SignUp from "./SignUpForm";
import "./css/topBar.css";
//import HomePage from "./home";
import PropertySection from "./PropertySection";
import FilterSelect from "./FilterSelect";
import ProfileButton from "./ProfileButton.js";

function TopBar({ setContentText }) {
  const [isLoggedng, setIsisLoggedng] = useState();
  if (isLoggedng===false){

  }
  else{
    setIsisLoggedng(true)
  }
  const [isSignUpClicked, setIsSignUpClicked] = useState();
  if (isSignUpClicked===true){

  }
  else{
    setIsSignUpClicked(false)
  }
  const handleButtonClick = () => {
    // Change the content when the button is clicked 
    setIsSignUpClicked(true);
    setContentText(<SignUp setContentText={setContentText} setIsSignUpClicked={setIsSignUpClicked} setIsisLoggedng={setIsisLoggedng}/> );
  };


  const handleButtonClick2 = () => {
    // Change the content when the button is clicked 
    if(isLoggedng==true){
    setIsSignUpClicked(false);}
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
          <input type="text" name="filter" id="filter" placeholder="Filter properties..."></input>
          </form>
          <FilterSelect />
        </div>
        
        {isLoggedng ? null : (
        <ProfileButton username={sessionStorage.getItem("userName")} setContentText={setContentText}/>
      )}
      
      {isSignUpClicked ?  (
        <button className="signUpBtn" >Sign out</button>
      ):null}
        {isSignUpClicked ? null : (
        <button className="signUpBtn" onClick={handleButtonClick}>Sign in</button>
      )}
      
    </div>
  );
}

export default TopBar;