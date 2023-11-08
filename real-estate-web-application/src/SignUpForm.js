import React, { useState } from "react";
import App from "./App";
import LoginForm from "./LoginForm";

function SignUp({setContentText, setIsSignUpClicked}){


  const handleButtonClick4 = () => {
    setIsSignUpClicked(false);
   
    setContentText(<LoginForm />);
  };

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "homebuyer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);


    if (formData.password !== formData.password_confirmation) {
    console.error("Passwords do not match");
    return;
    } //for front-end to make it look nicer

    try {
      const response = await fetch("http://localhost:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("response of ", response)
      if (response.ok) {

        console.log("User registered successfully");
        const answer = response.json()
        console.log("Message from backend ", answer)
        // Redirect or show success message
      } else {
        console.error("Error registering user");
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
    <form className="signUpForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="signupformInner">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          ></input>
          <br></br>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          ></input>
          <br></br>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          ></input>
          <br></br>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          ></input>
          <br></br>
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            placeholder="Enter password"
          ></input>

          <br></br>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="homebuyer">Homebuyer</option>
            <option value="renter">Renter</option>
            <option value="broker">Broker</option>
          </select>
          <br></br>
          <br></br>
          <button type="submit" className="submitSignUp">
            Sign Up
          </button>
          <br></br>
          <br></br>
          OR
          <br></br>
          <br></br>
          <button className="submitLogIn" onClick={handleButtonClick4}>Log in</button>
        </div>
      </form>
     
    </div>
  );
}



export default SignUp;