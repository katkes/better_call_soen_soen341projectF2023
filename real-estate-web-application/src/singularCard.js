import "./css/singularCard.css";
function SingularCard({name,price,country,rating}){
    return(
        <div className="card">
            <img src="https://i.pinimg.com/736x/a9/8a/d3/a98ad31b4947ed09d9e3e9918cf3379b.jpg" alt="fix BOZO"></img>
            <div className="cardProperties">
                <p>Name: {name}</p>
                <p>Price: ${price}</p>
                <p>Country/address: {country}</p>
                <p>Rating: {rating}☆</p>
                <div className="buttonOptions">
                <button className="buyButton" /*onClick={}*/>Buy</button>
                <button className="visitButton" /*onClick={}*/>visit</button>
                </div>
            </div>
        </div>
    );
}

export default SingularCard;