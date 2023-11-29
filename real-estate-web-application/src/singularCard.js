import "./css/singularCard.css";
import React from "react";
import GenerateBuyPage from "./GenerateBuyPage.js";

function SingularCard({
  price,
  country,
  rating,
  setContentText,
  brokerName,
  isForSale = true,
  brokerId,
}) {
  const type = "Apartment"; // Assuming this is a default value
  const address = "123 Main St, City, State"; // Assuming this is a default value
  const previewPhotos = [
    /* Assuming this is a default value */
    "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CCDDDDDDDDDD2&t=pi&w=640&h=480&sm=c",
    "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CEDDDDDDDDDDC&t=pi&w=320&h=240&sm=c",
    "https://mspublic.centris.ca/media.ashx?id=ADDD250DC71A4CEDDDDDDDDDDC&t=pi&w=320&h=240&sm=c",
  ];
  const broker = "John Doe"; // Assuming this is a default value
  let favorite = false; // Assuming this is a default value
  // Modify the favourite here
  const features = [
    /* Assuming this is a default value */ "3 Bedrooms",
    "2 Bathrooms",
    "1,200 sq. ft.",
    "Swimming Pool",
    "Garage",
    "Near Schools",
  ];

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
  const handleClick4 = async () => {
    try {
      const userId = sessionStorage.getItem("userID");
      console.log("userId:", userId);

      const response = await fetch(
        `http://localhost:8000/request_visit/${brokerId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brokerId, userId }), // Shortened syntax
        }
      );

      if (response.ok) {
        console.log("Visit request sent successfully", brokerId);
        // You can handle additional logic here if needed
      } else {
        console.error("Failed to send visit request");
        console.log("Response status:", response.status);
        const responseData = await response.json();
        console.log("Response data:", responseData); // Log the response data for debugging
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card">
      <img src={previewPhotos[0]} alt="fix BOZO"></img>
      <div className="cardProperties">
        <p>{type} for sale</p>
        <p>Price: ${price}</p>
        <p>Location: {country}</p>
        <p>
          Rating: {rating}
          <span className="star-rating">
            &#9733; &#9733; &#9733; &#9733; &#9733;
          </span>
        </p>
        {brokerName && <p>Broker: {brokerName}</p>}{" "}
        {/* Display broker name if available */}
        <div className="buttonOptions">
          <button className="buyButton" onClick={handleClick3}>
            BUY
          </button>
          <button className="visitButton" onClick={handleClick4}>
            VISIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingularCard;
