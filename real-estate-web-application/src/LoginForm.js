import "./css/LoginForm.css";

function LoginForm(){

    return(
        <div class="slide-in">
        <div className="loginForm">
            <form action="#" method="POST">
            <h2>Login</h2>
            <div className="loginFormElement">
            <label for="email">email address:</label>
            <input type="email" name="email"></input>
            <br></br>
            <label for="Password">Password:</label>
            <input type="password" name="Password"></input>
            <br></br>
            <button className="loginButton">Login</button>
            {/* <a href="App.js" className="cancelLoginButtonAnchorTag"><button className="cancelLoginButton">Cancel</button></a> */}
            </div>
            </form>
        </div>
        </div>
    
    );
}

export default LoginForm;