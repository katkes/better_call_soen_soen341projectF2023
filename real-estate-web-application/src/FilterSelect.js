import "./css/FilterSelect.css";
import React, { useState } from 'react';

//class="container" for="Price"
//class="container" for="Size"
//class="container" for="numBathrooms"
//class="container" for="numBedrooms"
function FilterSelect(){

    const [price,setPrice] = useState(100000);
    const [size,setSize] = useState(0);
    const [bathrooms,setBathrooms] = useState(1);
    const [bedrooms,setBedrooms] = useState(1);

    return(
        <div className="filterFormDiv">
    
            <form action="###" method="POST" className="filterForm">
                    <label className="label">Price <br></br></label>
                        <input class= "slider-range" name="StaticFilters" id="Price"  type="range" min="100000" max="800000" step="1000" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        {/* <span class="checkmark"></span> */}
                        ${price}
    
                    <label className="label">Size<br></br></label>
                        <input class= "slider-range" id="Size" name="StaticFilters" type="range" min="100" max="2000" step="50" value={size} onChange={(e) => setSize(e.target.value)}/>
                        {/* <span class="checkmark"></span> */}
                        {size} ft
    
                    <label className="label">Number of Bathrooms <br></br></label>
                        <input class= "slider-range" id="numBathrooms" name="StaticFilters" type="range" min="1" max="3" step="1" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}   />
                        {/* <span class="checkmark"></span> */}
                        {bathrooms}
    
    
                    <label className="label">Number of Bedrooms <br></br></label>
                        <input class= "slider-range" id="numBedrooms" name="StaticFilters" type="range" min="1" max="10" step="1" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                        {/* <span class="checkmark"></span> */}
                        {bedrooms}
                <button className="filterFormApply">Apply filters</button>
            </form>
        </div>
    );
}


export default FilterSelect;