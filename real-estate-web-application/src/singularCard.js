import "./css/singularCard.css";
import React from 'react'
import GenerateBuyPage from "./GenerateBuyPage.js";

function SingularCard({
  
  city,
  //image
  price,
  assigned_user,
  country,
  for_sale,
  rating,
  size,
  num_of_bedrooms,
  num_of_bathrooms,
  type,
  setContentText,
  brokerName
}) {
  
   // Assuming this is a default value
  const previewPhotos = [
    /* Assuming this is a default value */
    "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CCDDDDDDDDDD2&t=pi&w=640&h=480&sm=c",
    "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CEDDDDDDDDDDC&t=pi&w=320&h=240&sm=c",
    "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CEDDDDDDDDDDC&t=pi&w=320&h=240&sm=c",
  ];
   // Assuming this is a default value
  let favorite = false; // Assuming this is a default value
  const features = [
    `${num_of_bedrooms} Bedrooms`,
    `${num_of_bathrooms} Bathrooms`,
    `${size} sq. ft.`,
   
  ];

  const handleClick3 = () => {
    setContentText(
      <GenerateBuyPage
        type={type}
        address={city}
        price={price}
        previewPhotos={previewPhotos}
        broker={brokerName}
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
        <p>Location: {city}</p>
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
