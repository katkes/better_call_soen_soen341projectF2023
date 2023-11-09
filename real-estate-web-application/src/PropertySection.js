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
          name={property.name}
          price={property.price}
          country={property.country}
          rating={property.rating}
          setContentText={setContentText}
          brokerName={property.broker_name}
        />
      ))}
    </section>
  );
}

export default PropertySection;
