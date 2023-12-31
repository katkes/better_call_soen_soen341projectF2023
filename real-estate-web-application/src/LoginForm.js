import "./css/LoginForm.css";
import Home from './home';
import React, {useState} from "react";

function LoginForm({setContentText}) {


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
                sessionStorage.setItem("userID", answer.id) // Stores user ID in session
                sessionStorage.setItem("userName", answer.name)
                sessionStorage.setItem("role", answer.role)
                sessionStorage.setItem("emailAddress", answer.email)
                sessionStorage.setItem("phoneNumber", answer.phoneNumber)
                sessionStorage.setItem("isRegistered", true)
                // Redirect or show success message
                console.log(sessionStorage.getItem("userID"));

                setContentText(<Home/>);
            } else {
                console.error("Error logging in user");
                console.log(response.status)
            }
        } catch (error) {
            if (error.response && error.response.status) {
                console.log("Error Status: ", error.response.status);
            } else {
                console.log("An error occurred:", error);
            }
        }
    };


    return (
        <div className="slide-in">
            <div className="loginForm">
                <form className="login" onSubmit={handleSubmit}>
                    <div className="loginFormElement">
                        <h2>Login</h2>
                        <label htmlFor="email">Email address</label>
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
                        <label htmlFor="Password">Password</label>
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
                        <button type="submit" className="loginButton">Login</button>
                        {/* <a href="App.js" className="cancelLoginButtonAnchorTag"><button className="cancelLoginButton">Cancel</button></a> */}
                    </div>
                </form>
            </div>
        </div>

    );
}

export default LoginForm;