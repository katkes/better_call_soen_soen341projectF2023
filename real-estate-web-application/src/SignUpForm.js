import React, { useState } from "react";

function SignUp(){

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
        // Redirect or show success message
      } else {
        console.error("Error registering user");
        console.log(response.status)
      }
    }
    catch (error){
      console.log("Error: ", error.response.status);
    }
  };
    
return(
<div class="slide-in">
    <form class="signUpForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="signupformInner">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          ></input>
          <br></br>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          ></input>
          <br></br>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
          <br></br>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
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
          <button type="submit" className="submitLogIn">Log in
          </button>
        </div>
      </form>
    </div>
  );
}



export default SignUp;