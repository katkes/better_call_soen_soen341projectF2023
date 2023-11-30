import "./css/App.css";
import React, {useState} from "react";
import SignUp from "./SignUpForm";

function CreateListing({setContentText}){


    return(
      <div className="CreateListing">
        <div>
          <label>Type</label>
          <br></br>
          <select name="type" type="dropmenu">
              <option value="house">House</option>
              <option value="appartment">Apartment</option>
              <option value="studio">Studio</option>
              <option value="condo">Condo</option>
          
          </select>
        </div>
        <div>
          <label>Price</label>
          <br></br>
          <input name="Price" type="number"></input>
        </div>
        <div>
          <label>Size in feet squared </label>
          <br></br>
          <input name="size" type="number"></input>
        </div>
        <div>
          <label>Address</label>
          <br></br>
          <input name="location" type="text"></input>
        </div>
        <div>
          <label>Number of bedrooms</label>
          <br></br>
          <input name="number of bedrooms" type="number"></input>
        </div>
        <div>
          <label>Number of bathrooms </label>
          <br></br>
          <input name="number of bathrooms" type="number"></input>
        </div>
        <br></br>
        <button>Create</button>
      </div>
    );
}

export default CreateListing;