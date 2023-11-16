import "./css/FilterSelect.css";
import React, {useState} from 'react';
import Home from "./home";

// class="container" for="Price"
// class="container" for="Size"
// class="container" for="numBathrooms"
// class="container" for="numBedrooms"

function FilterSelect() {

    //     <div className="filterFormDiv">

    const [price, setPrice] = useState(100000);
    const [size, setSize] = useState(0);
    const [num_of_bathrooms, setBathrooms] = useState(1);
    const [num_of_bedrooms, setBedrooms] = useState(1);
    const [isDropped, setIsDropped] = useState(true);


    const [formData, setFormData] = useState({
        Price: "100000",
        Size: "0",
        num_of_bathrooms: "1",
        num_of_bedrooms: "1"
    });


    const handleClick = () => {
        setIsDropped(!isDropped);
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === 'Price') {
            setPrice(e.target.value);
        } else if (e.target.name === 'Size') {
            setSize(e.target.value);
        } else if (e.target.name === 'num_of_bathrooms') {
            setBathrooms(e.target.value);
        } else if (e.target.name === 'num_of_bedrooms') {
            setBedrooms(e.target.value);
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        setPrice(formData.Price || price);
        setSize(formData.Size || size);
        setBathrooms(formData.num_of_bathrooms || num_of_bathrooms);
        setBedrooms(formData.num_of_bedrooms || num_of_bedrooms);

        try {
            const response = await fetch("http://localhost:8000/property_search/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log("response of ", response)
            if (response.ok) {
                const answer = await response.json();
                console.log("Filter results:", answer);
                // this Promise should be given in a 2-D array or dictionary to be honest
                // console.log("Message from backend ", answer)
                // console.log("User's id: ", answer.id)  // Log the user's id
                // console.log("User name is: ", answer.name)
                // sessionStorage.setItem("userID", answer.id) // Stores user ID in session
                // sessionStorage.setItem("userName", answer.name)
                // sessionStorage.setItem("role", answer.role)
                // sessionStorage.setItem("isRegistered", true)
                // Redirect or show success message
                // console.log(sessionStorage.getItem("userID"));

                // setContentText(<Home/>); edit to make the page refresh to show the current page selections
            } else {
                // Handle errors for non-200 status codes
                console.error("Error filtering properties:", response.statusText);
                console.log(response.status);
            }
        } catch (error) {
            console.error("An error occurred while filtering:", error);
            if (error.response && error.response.status) {
                console.log("Error Status: ", error.response.status);
            } else {
                console.log("An error occurred:", error);
            }
        }
    };

    return (
        <div className="filterFormDiv">
            <button className="filter-button" onClick={handleClick}>Filters &#9660;
            </button>
            <form action="###" onSubmit={handleSubmit} method="POST" className="filterForm">

                <div className={isDropped ? "undropdown-content" : "dropdown-content"}>
                    <label className="label" htmlFor="Price">Price<br></br></label>
                    <input
                        class="slider-range"
                        name="Price"
                        id="Price"
                        type="range"
                        min="100000"
                        max="800000"
                        step="1000"
                        value={formData.Price || price}
                        onChange={handleChange}/>
                    {/* <span class="checkmark"></span> */}
                    ${formData.Price || price}
                    <label className="label" htmlFor="Size">Size<br></br></label>
                    <input class="slider-range"
                           id="Size"
                           name="Size"
                           type="range"
                           min="100"
                           max="2000"
                           step="50"
                           value={formData.Size || size}
                           onChange={handleChange}
                        // onChange={(e) => setSize(e.target.value)}
                    />
                    {/* <span class="checkmark"></span> */}
                    {size} ft
                    <label className="label" htmlFor="num_of_bathrooms">Number of Bathrooms<br></br></label>
                    <input class="slider-range"
                           id="num_of_bathrooms"
                           name="num_of_bathrooms"
                           type="range"
                           min="1"
                           max="3"
                           step="1"
                           value={formData.num_of_bathrooms || num_of_bathrooms}
                           onChange={handleChange}
                        // onChange={(e) => setBathrooms(e.target.value)}
                    />
                    {/* <span class="checkmark"></span> */}
                    {num_of_bathrooms}
                    <label className="label" htmlFor="num_of_bedrooms">Number of Bedrooms<br></br></label>
                    <input class="slider-range"
                           id="num_of_bedrooms"
                           name="num_of_bedrooms"
                           type="range"
                           min="1"
                           max="10"
                           step="1"
                           value={formData.num_of_bedrooms || num_of_bedrooms}
                           onChange={handleChange}
                        // onChange={(e) => setBedrooms(e.target.value)}
                    />
                    {/* <span class="checkmark"></span> */}
                    {num_of_bedrooms}
                    <button type="submit" className="filterFormApply">Apply filters</button>
                </div>

            </form>
        </div>
    );

}


export default FilterSelect;