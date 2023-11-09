// import React, { useState } from "react";
import SignUp from "./SignUpForm";
import "./css/topBar.css";
//import HomePage from "./home";
import PropertySection from "./PropertySection";
import FilterSelect from "./FilterSelect";
import ProfileButton from "./ProfileButton.js";
import React, { useState } from "react";

function TopBar({ setContentText }) {
  // Inside your TopBar component

  const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state
  // Define searchQuery state

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update searchQuery state
    fetch(`http://localhost:8000/property_search/?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        setContentText(
          <PropertySection
            setContentText={setContentText}
            filteredProperties={data}
          />
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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
    if (!sessionStorage.getItem("userID") === true) {
    } else {
    }
    setContentText(<PropertySection setContentText={setContentText} />);
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

      <div className="topBar">
        {/* ... (your existing code) */}
        <form id="ApiFilterSearch" action="" method="GET">
          <input
            type="text"
            name="filter"
            id="filter"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </form>
        {/* ... (rest of your code) */}
      </div>

      {!sessionStorage.getItem("userID") ? null : (
        <ProfileButton
          username={sessionStorage.getItem("userName")}
          setContentText={setContentText}
        />
      )}

      {sessionStorage.getItem("userID") ? (
        <button className="signUpBtn" onClick={handleSignOut}>
          Sign out
        </button>
      ) : null}
      {sessionStorage.getItem("userID") ? null : (
        <button className="signUpBtn" onClick={handleButtonClick}>
          Sign in
        </button>
      )}
    </div>
  );
}

export default TopBar;
