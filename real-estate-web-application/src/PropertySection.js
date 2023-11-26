// PropertySection.js
import React, { useState, useEffect } from "react";
import SingularCard from "./singularCard.js";
import "./css/PropertySection.css";

function PropertySection({ setContentText, filteredProperties }) {
  console.log(filteredProperties);
  if (!filteredProperties) {
    return null; // or return some default content
  }
  return (
    <section className="PropertySection">
      {filteredProperties.map((property, index) => (
        <SingularCard
          key={index}
          city={property.city}
          //image
          price={property.price}
          country={property.city}
          rating={property.rating}
          size={property.size}
          num_of_bedrooms={property.num_of_bedrooms}
          num_of_bathrooms={property.num_of_bathrooms}
          type={property.type_of_property}
          setContentText={setContentText}
          brokerName={property.broker_name}
          brokerId={property.broker_id}
        />
      ))}
    </section>
  );
}

export default PropertySection;
