import RealEstateListing from "./BuyPropertyPage"; 
import "./css/singularCard.css";
import React from 'react'
/*import { useState } from "react";*/

 


function SingularCard({name,price,country,rating,setContentText}){

    const handleClick3 = () => {
        
        setContentText(<RealEstateListing/>);
      };
   /* const [displayLogin,setdisplayLogin]= useState(false);*/
    return(
        <div onclick={handleClick3} className="card">
            <img src="https://i.pinimg.com/736x/a9/8a/d3/a98ad31b4947ed09d9e3e9918cf3379b.jpg" alt="fix BOZO"></img>
            <div className="cardProperties">
                <p>Name: {name}</p>
                <p>Price: ${price}</p>
                <p>Country/address: {country}</p>
                <p>Rating: {rating}☆</p>
                <div className="buttonOptions">
                <button className="buyButton" /*onClick={}*/>Buy</button>
                <button className="visitButton" /*onClick={wantLogIn}*/>visit</button>
                </div>
            </div>
        </div>
    );
}

export default SingularCard;