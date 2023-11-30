import "./css/App.css";
import React, {useState} from "react";
import SignUp from "./SignUpForm";

function CreateListing({setContentText}){


    return(
      <div className="CreateListing">
        <label></label>
        <input name="Price" type="number"></input>

        <label></label>
        <select name="type" type="dropmenu">
            <option value="house">House</option>
            <option value="appartment">Appartment</option>
            <option value="studio">Studio</option>
            <option value="condo">Condo</option>

        </select>

        <label>Size in feet squard </label>
        <input name="size" type="number"></input>

        <label>Adress</label>
        <input name="location" type="text"></input>

        <label>Number of bedrooms</label>
        <input name="number of bedrooms" type="number"></input>

        <label>Number of bathrooms </label>
        <input name="number of bathrooms" type="number"></input>

        <button>create</button>
      </div>
    );
}

export default CreateListing;