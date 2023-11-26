// import React, { useState } from "react";
import SignUp from "./SignUpForm";
import "./css/topBar.css";
//import HomePage from "./home";
import PropertySection from "./PropertySection";
import FilterSelect from "./FilterSelect";
import ProfileButton from "./ProfileButton.js";
import React, { useState } from "react";
import HomePage from "./home.js";
import LoginForm from "./LoginForm.js";

function TopBar({ setContentText, Brokering, setbrokering }) {
  // Inside your TopBar component

  const [searchQuery, setSearchQuery] = useState({
    city: "",
  }); // Define searchQuery state
  // Define searchQuery state

  // const handleSearchChange = (query) => {
  //  if(!Brokering){ setSearchQuery(query); // Update searchQuery state
  //   fetch(`http://localhost:8000/property_search/?q=${query}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Received data:", data);
  //       setContentText(
  //         <PropertySection
  //           setContentText={setContentText}
  //           filteredProperties={data}
  //         />
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });}
  //     else{
  //
  //     }
  // };
  const handleSearchChange = async (e) => {
    if (!Brokering) {
      //code to search for a property by name
      try {
        const response = await fetch("http://localhost:8000/property_search/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchQuery),
        });

        console.log("response of ", response);

        if (response.ok) {
          const answer = await response.json();
          console.log("Search results: ", answer);
          setContentText(
            <PropertySection
              setContentText={setContentText}
              filteredProperties={answer}
            />
          );
        } else {
          console.error("Error searching properties:", response.statusText);
          console.log(response.status);
        }
      } catch (error) {
        console.error("An error occurred while searching:", error);
        if (error.response && error.response.status) {
          console.log("Error Status: ", error.response.status);
        } else {
          console.log("An error occurred:", error);
        }
      }
    } else {
      try {
        const response = await fetch("http://localhost:8000/search_brokers/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchQuery),
        });

        console.log("response of ", response);

        if (response.ok) {
          const answer = await response.json();

          console.log("Search results: ", answer);
          localStorage.setItem("props", JSON.stringify(answer));
          const storedProps = localStorage.getItem("props");
          // retrieve
          if (storedProps) {
            const parsedProps = JSON.parse(storedProps);
            console.log("Retrieved props: ", parsedProps);
          }
        } else {
          console.error("Error searching properties:", response.statusText);
          console.log(response.status);
        }
      } catch (error) {
        console.error("An error occurred while searching for brokers:", error);
        if (error.response && error.response.status) {
          console.log("Error Status: ", error.response.status);
        } else {
          console.log("An error occurred:", error);
        }
      }
    } //code to search for a broker
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
    setbrokering(false);
  };

  const handleButtonClick = () => {
    // Change the content when the button is clicked

    setContentText(<SignUp setContentText={setContentText} />);
    setbrokering(false);
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });

    if (typeof userInput === "object") {
      setSearchQuery(""); // Clear the search query if it's an object
    } else {
      setSearchQuery(userInput); // Update searchQuery state with user input
    }
  };

  const handleButtonClick2 = () => {
    // Change the content when the button is clicked
    setContentText(<HomePage />);
    setbrokering(false);
  };

  return (
    <div className="topBar">
      <FilterSelect />
      <div className="pageLogo">
        <button onClick={handleButtonClick2} id="LogoAnchorHome">
          {/* <img src="./Logo.png" alt="Urban Utopia"></img> */}
          <h1>Urban Utopia</h1>
        </button>
      </div>

      <div className="filterForm">
        {/* ... (your existing code) */}
        <form id="ApiFilterSearch" action="" onChange={handleSearchChange}>
          <input
            type="text"
            name="filter"
            id="filter"
            // placeholder={`${Brokering ? "Search Brokers By Name.." : "Search properties by city..."}`}
            placeholder={
              Brokering
                ? "Search Brokers By Name.."
                : "Search properties by city..."
            }
            // value={searchQuery}
            // onChange={(e) => handleSearchChange(e.target.value)}
            onChange={handleChange}
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
