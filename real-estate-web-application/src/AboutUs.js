import "./css/App.css";

function AboutUs(){


    return(
        <div className="aboutUsPage">
            <h2>About Us</h2>
            <img src="./RealEstateStockPhoto.jpeg" alt="homeStockPhoto"></img>
            <p className="p3">
                Welcome to Urban Utopia! This website is dedicated to facilitate the buying and renting of properties by interfacing brokers, homebuyers and homerenters together.
                Brokers can submit offers for home buyers and home renters to view and purchase. Home buyers also have the opportunity to calculate their potential monthly payment through
                a mortgage calculator. Properties can be filtered by their location, price, number of bedrooms and other relevant criterias.
                <br></br>
                We at Urban Utopia hope to be of convenience to our customers. Thank you for using Urban Utopia!
            </p>
            <button>Get Started</button>
        </div>
    );
}

export default AboutUs;