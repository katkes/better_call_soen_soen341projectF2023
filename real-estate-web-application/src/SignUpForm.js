function SignUp(){
return(
<div class="slide-in">
    <form class="signUpForm" action="###" method="POST">
        <h2>Sign Up</h2>
        <div class="signupformInner">
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
            <br></br>
            <button type="submit" class="submitSignUp">Sign Up</button>
        </div>
    </form>

</div>
);

}

export default SignUp;