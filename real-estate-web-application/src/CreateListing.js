import "./css/App.css";
import React, {useState} from "react";
import SignUp from "./SignUpForm";

function CreateListing({setContentText}){


    return(
      <div>
        <h2>Create a Listing</h2>
        <p>Select the <i>type of property</i>, enter the <i>price</i>, <i>size</i>, <i>address</i>, <i>number of bedrooms</i> and <i>number of bathrooms</i>.</p>
        <div className="input-container">
          <div className="input-group">
            <label>Type</label>
            <select name="type" type="dropmenu">
                <option value="house">House</option>
                <option value="appartment">Apartment</option>
                <option value="studio">Studio</option>
                <option value="condo">Condo</option>
          
            </select>
          </div>
        </div>
        <div className="input-container">
          <div className="input-group">
            <label>Price ($)</label>
            <input name="Price" type="number"></input>
          </div>
          <div className="input-group">
            <label>Size (ft&sup2;) </label>
            <input name="size" type="number"></input>
          </div>
          <div className="input-group">
            <label>Address</label>
            <input name="location" type="text"></input>
          </div>
        </div>
        <br></br>
        <div className="input-container">
          <div className="input-group">
            <label>Number of bedrooms</label>
            <input name="number of bedrooms" type="number"></input>
          </div>
          <div className="input-group">
            <label>Number of bathrooms </label>
            <input name="number of bathrooms" type="number"></input>
          </div>
        </div>
        <br></br>
        <button className="calculate-button">Create</button>
      </div>
    );
}

export default CreateListing;