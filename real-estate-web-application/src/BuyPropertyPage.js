// import SingularCard from "./singularCard.js";
import "./css/BuyPropertyPage.css";
function BuyPropertyPage({name = "property name",price ="$$$$" ,country = "Country",rating = "-",img = ""}){
    return(
        <div className="BuyPropertyPage">
            <div className="PropertyInfoDisplay">
            <h1>{name}</h1>
            <img src={img} alt="Property" className="imgBuyPropertyPage"></img>
            <p className="propertyAddress">Address: {country}</p>
            </div>
            <h6 className="propertyPrice">${price}</h6>
            <div className="BuySectionOfBuyPage">
                
                <button className="buyButton">Buy</button> 
                <p>rating {rating}☆</p>
            </div>
        </div>
    );
}
export default BuyPropertyPage;