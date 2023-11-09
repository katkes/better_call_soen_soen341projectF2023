
import React from "react";
import "./css/BuyPropertyPage.css";



const RealEstateListing = ({ type, address, price, previewPhotos, broker, favorite, features  }) => {
  
    return (
      <div className="real-estate-listing">
        <div className="header">
          <div className="property-type">{type}</div>
          <div className="property-address">{address}</div>
          <div className="property-price">{price}</div>
        </div>
        <div className="photos">
          <img src={previewPhotos[0]} alt="Big Preview" className="big-preview" />
          <div className="small-previews">
            <img id="img1" src={previewPhotos[1]} alt="Small Preview 1" />
            <img id="img2" src={previewPhotos[2]} alt="Small Preview 2" />
          </div>
        </div>
        <div className="actions">
          <h2>Amenities & Features</h2>
          <button className="contact-broker">Contact Broker</button>
          <button className={`favorite ${favorite ? 'active' : ''}`}>Favorite</button>
        </div>
        <div className="features">
          <div className="column">
            {features.slice(0, Math.ceil(features.length / 2)).map((feature, index) => (
              <div key={index} className="feature-item">{feature}</div>
            ))}
          </div>
          <div className="column">
            {features.slice(Math.ceil(features.length / 2)).map((feature, index) => (
              <div key={index} className="feature-item">{feature}</div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default RealEstateListing;