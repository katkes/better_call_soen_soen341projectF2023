import "./css/LoginForm.css";

function LoginForm(){

    return(
        <div className="loginForm">
            <form action="#" method="POST" className="loginFormElement">
            <h2>Login</h2>
            <label for="email">email address:</label>
            <input type="email" name="email"></input>
            <br></br>
            <label for="Password">Password:</label>
            <input type="password" name="Password"></input>
            <br></br>
            <button className="loginButton">Login</button>
            {/* <a href="App.js" className="cancelLoginButtonAnchorTag"><button className="cancelLoginButton">Cancel</button></a> */}
            </form>
        </div>
    );
}

export default LoginForm;