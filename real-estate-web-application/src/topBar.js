import React from "react";
import SignUp from "./SignUpForm";

function TopBar({ setContentText }) {
  const handleButtonClick = () => {
    // Change the content when the button is clicked
    const signUpContent = SignUp();
    setContentText(signUpContent);
  };

  return (
    <div className="topBar">
        <div className="pageLogo"><img src="Logo.png" alt="Urban Utopia"></img></div>
      <button className="signUpBtn" onClick={handleButtonClick}>Sign up</button>
    </div>
  );
}

export default TopBar;