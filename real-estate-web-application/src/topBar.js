import React, { useState } from "react";
import SignUp from "./SignUpForm";
import "./css/topBar.css";
import HomePage from "./home";
import PropertySection from "./PropertySection";


function TopBar({ setContentText }) {
  
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const handleButtonClick = () => {
    // Change the content when the button is clicked 
    setIsSignUpClicked(true);
    setContentText(<SignUp setContentText={setContentText} setIsSignUpClicked={setIsSignUpClicked}/>);
  };

  const handleButtonClick2 = () => {
    // Change the content when the button is clicked 
    setIsSignUpClicked(false);
    
    setContentText(<PropertySection setContentText={setContentText}/>);
  };

  return (
    <div className="topBar">
        <div className="pageLogo">
        <button onClick={handleButtonClick2} id="LogoAnchorHome">  
          <img src="./Logo.png" alt="Urban Utopia"></img>
        </button>
        </div>
        <div className="filterForm"> {/*This may not even be implemented. Well see*/}
          <form id="ApiFilterSearch" action="" method="GET"> 
          <label htmlFor="filter">Filter properties </label>
          <input type="text" name="filter" id="filter"></input>
          </form>
        </div>
       
       
        {isSignUpClicked ? null : (
        <button className="signUpBtn" onClick={handleButtonClick}>
          Sign up
        </button>
      )}
    </div>
  );
}

export default TopBar;