import "./css/App.css";
import React, { useState } from 'react';

function CreateListing({ setContentText }) {
  const [propertyData, setPropertyData] = useState({
    price: 0,
    size: 0,
      num_of_bathrooms: 0,
    num_of_bedrooms: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

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
        // Handle successful creation (you can redirect or show a success message)
        setContentText('Property created successfully');
      } else {
        // Handle unsuccessful creation
        const data = await response.json();
        setContentText(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <div className='CreateListing'>
      <label>Price</label>
      <input
        name='price'
        type='number'
        value={propertyData.price}
        onChange={handleChange}
      ></input>

      <label>Type</label>
      <select name='type' value={propertyData.type} onChange={handleChange}>
        <option value='house'>House</option>
        <option value='apartment'>Apartment</option>
        <option value='studio'>Studio</option>
        <option value='condo'>Condo</option>
      </select>

      <label>Size in square feet</label>
      <input
        name='size'
        type='number'
        value={propertyData.size}
        onChange={handleChange}
      ></input>

      <label>Address</label>
      <input
        name='location'
        type='text'
        value={propertyData.location}
        onChange={handleChange}
      ></input>

      <label>Number of bedrooms</label>
      <input
        name='bedrooms'
        type='number'
        value={propertyData.num_of_bedrooms}
        onChange={handleChange}
      ></input>

      <label>Number of bathrooms</label>
      <input
        name='bathrooms'
        type='number'
        value={propertyData.num_of_bathrooms}
        onChange={handleChange}
      ></input>

      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default CreateListing;
