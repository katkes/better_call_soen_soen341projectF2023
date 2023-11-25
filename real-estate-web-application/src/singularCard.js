import "./css/singularCard.css";
import React from 'react'
import GenerateBuyPage from "./GenerateBuyPage.js";

function SingularCard({
  
  price,
  country,
  rating,
  setContentText,
  brokerName,
  isForSale = true,
}) {
  // const type = "Apartment"; // Assuming this is a default value
  // const address = "123 Main St, City, State"; // Assuming this is a default value
  // const previewPhotos = [
  //   /* Assuming this is a default value */
  //   "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CCDDDDDDDDDD2&t=pi&w=640&h=480&sm=c",
  //   "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CEDDDDDDDDDDC&t=pi&w=320&h=240&sm=c",
  //   "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CEDDDDDDDDDDC&t=pi&w=320&h=240&sm=c",
  // ];
  // const broker = "John Doe"; // Assuming this is a default value
  // let favorite = false; // Assuming this is a default value
  // const features = [
  //   /* Assuming this is a default value */ "3 Bedrooms",
  //   "2 Bathrooms",
  //   "1,200 sq. ft.",
  //   "Swimming Pool",
  //   "Garage",
  //   "Near Schools",
  // ];

  const handleClick3 = () => {
    setContentText(
      <GenerateBuyPage
        type={type}
        address={address}
        price={price}
        previewPhotos={previewPhotos}
        broker={broker}
        favorite={favorite}
        features={features}
      />
    );
  };

  return (
    <div className="card">
      <img src={previewPhotos[0]} alt="fix BOZO"></img>
      <div className="cardProperties">
        <p>{type} for sale</p>
        <p>Price: ${price}</p>
        <p>Location: {country}</p>
        <p>Rating: {rating}<span className="star-rating">&#9733; &#9733; &#9733; &#9733; &#9733;</span></p>
        {brokerName && <p>Broker: {brokerName}</p>}{" "}
        {/* Display broker name if available */}
        <div className="buttonOptions">
          <button className="buyButton" onClick={handleClick3}>
            BUY
          </button>
          <button className="visitButton" /*onClick={wantLogIn}*/>VISIT</button>
        </div>
      </div>
    </div>
  );
}

export default SingularCard;
