import "./css/FilterSelect.css";

function FilterSelect(){

    return(
        <div className="filterFormDiv">
            <form action="###" method="POST" className="filterForm">
                <label for="Price">Price</label>
                <input type="checkbox" name="StaticFilters" value="Price" id="Price"/>

                <label for="Size">Size</label>
                <input type="checkbox" name="StaticFilters" value="Size" id="Size"/>

                <label for="numBathrooms">Number of Bathrooms </label>
                <input type="checkbox" name="StaticFilters" value="numBathrooms" id="numBathrooms"/>

                <label for="numBedrooms">Number of Bedrooms</label>
                <input type="checkbox" name="StaticFilters" value="numBedrooms" id="numBedrooms"/>
                <button className="filterFormApply">Apply filter</button>
            </form>
        </div>     
    );
}


export default FilterSelect;