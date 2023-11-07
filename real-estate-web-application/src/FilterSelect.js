import "./css/FilterSelect.css";

function FilterSelect(){

    return(
        <div className="filterFormDiv">
            <form action="###" method="POST" className="filterForm">
                <label for="Price"></label>
                <input type="checkbox" name="StaticFilters" value="Price" id="Price">Price</input>

                <label for="Size"></label>
                <input type="checkbox" name="StaticFilters" value="Size" id="Size">Size</input>

                <label for="numBathrooms"></label>
                <input type="checkbox" name="StaticFilters" value="numBathrooms" id="numBathrooms">Number of Bathrooms</input>

                <label for="numBedrooms"></label>
                <input type="checkbox" name="StaticFilters" value="numBedrooms" id="numBedrooms">Number of Bedrooms</input>
                <button className="filterFormApply">Apply filter</button>
            </form>
        </div>     
    );
}


export default FilterSelect;