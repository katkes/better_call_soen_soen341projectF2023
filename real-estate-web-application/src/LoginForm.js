import "./css/LoginForm.css";
import React, {useState} from "react";

function LoginForm({setContentText, setIsSignUpClicked}){

    const handleButtonClick = () => {
        // for frontend
    }

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //   const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //
  //   try {
  //     const response = await fetch("http://localhost:8000/login/", {
  //         method: "POST",
  //         headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //
  //     console.log("response of ", response)
  //     if (response.ok) {
  //         //edit usestate
  //       console.log("User logged in successfully");
  //       const answer = response.json()
  //       console.log("Message from backend ", answer)
  //       // Redirect or show success message
  //     } else {
  //       console.error("Error logging in user");
  //       console.log(response.status)
  //     }
  //   }
  //       catch (error) {
  //     if (error.response && error.response.status) {
  //       console.log("Error Status: ", error.response.status);
  //     } else {
  //       console.log("An error occurred:", error);
  //     }
  //   }
  // };

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:8000/login/", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("response of ", response)
      if (response.ok) {
        console.log("User logged in successfully");
        const answer = await response.json()  // Wait for the Promise to resolve
        console.log("Message from backend ", answer)
        console.log("User's id: ", answer.id)  // Log the user's id
          console.log("User name is: ", answer.name)
          sessionStorage.setItem("userID", answer.id)
          sessionStorage.setItem("isRegistered", true)
        // Redirect or show success message
      } else {
        console.error("Error logging in user");
        console.log(response.status)
      }
    }
    catch (error) {
      if (error.response && error.response.status) {
        console.log("Error Status: ", error.response.status);
      } else {
        console.log("An error occurred:", error);
      }
    }
  };


    return(
        <div className="slide-in">
        <div className="loginForm">
            <form className="login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="loginFormElement">
            <label htmlFor="email">email address:</label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            ></input>
            <br></br>
            <label htmlFor="Password">Password:</label>
            <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            ></input>
            <br></br>
            <button className="loginButton" onClick={handleButtonClick}>Login</button>
            {/* <a href="App.js" className="cancelLoginButtonAnchorTag"><button className="cancelLoginButton">Cancel</button></a> */}
            </div>
            </form>
        </div>
        </div>
    
    );
}

export default LoginForm;