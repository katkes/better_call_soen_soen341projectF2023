function SignUp(){
return(
<div>
    <form class="App" action="your-server-endpoint" method="POST">
        <h2>Sign Up</h2>
        <div class="signup-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required></input>
            <br></br>
            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required></input>
            <br></br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required></input>
            <br></br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required></input>
            <br></br>
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required></input>
            <br></br>
            <label for="role">Role:</label>
            <select id="role" name="role">
                <option value="homebuyer">Homebuyer</option>
                <option value="renter">Renter</option>
                <option value="broker">Broker</option>
            </select>
            <br></br>
            <button type="submit" class="signUpBtn">Sign Up</button>
        </div>
    </form>

</div>
);

}

export default SignUp;