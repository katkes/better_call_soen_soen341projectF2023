import "./css/App.css";
import React, {useState} from "react";
import SignUp from "./SignUpForm";

function CreateListing({setContentText}) {

    const [propertyData, setPropertyData] = useState({
        price: 0,
        size: 0,
        num_of_bathrooms: 0,
        num_of_bedrooms: 0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPropertyData({
            ...propertyData,
            [name]: value,
        });
    }

    const handleCreate = async () => {

        try {
            let userID = parseInt(sessionStorage.getItem('userID'));
            const response = await fetch(
                `http://localhost:8000/property/create/${userID}/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(propertyData),
                }
            );

            if (response.ok) {
                setContentText("Property was successfully created");
            } else {
                const data = await response.json();
                setContentText(`Error: ${data.error()}`);
            }

        } catch (error) {
            console.error("Error creating property: ", error);
        }


    }

    return (
        <div>
            <h2>Create a Listing</h2>
            <p>Select the <i>type of property</i>, enter the <i>price</i>, <i>size</i>, <i>address</i>, <i>number of
                bedrooms</i> and <i>number of bathrooms</i>.</p>
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
                        <input name="price"
                               type="number"
                               value={propertyData.price}
                               onChange={handleChange}
                        ></input>
                    </div>
                    <div className="input-group">
                        <label>Size (ft&sup2;) </label>
                        <input name="size"
                               type="number"
                               value={propertyData.size}
                               onChange={handleChange}
                        ></input>
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
                        <input name="num_of_bedrooms"
                               type="number"
                               value={propertyData.num_of_bedrooms}
                               onChange={handleChange}
                        ></input>
                    </div>
                    <div className="input-group">
                        <label>Number of bathrooms </label>
                        <input name="num_of_bathrooms"
                               type="number"
                               value={propertyData.num_of_bathrooms}
                               onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <br></br>
                <button className="calculate-button" onClick={handleCreate}>Create</button>
        </div>
    );
}

export default CreateListing;
