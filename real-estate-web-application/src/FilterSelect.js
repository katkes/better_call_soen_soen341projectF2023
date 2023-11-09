import "./css/FilterSelect.css";

function FilterSelect(){

    return(
        <div className="filterFormDiv">
            <form action="###" method="POST" className="filterForm">
                <label class="container" for="Price">Price
                    <input type="checkbox" name="StaticFilters" value="Price" id="Price"/>
                    <span class="checkmark"></span>
                </label>
                <label class="container" for="Size">Size
                    <input type="checkbox" name="StaticFilters" value="Size" id="Size"/>
                    <span class="checkmark"></span>
                </label>
                <label class="container" for="numBathrooms">Number of Bathrooms 
                    <input type="checkbox" name="StaticFilters" value="numBathrooms" id="numBathrooms"/>
                    <span class="checkmark"></span>
                </label>
                <label class="container" for="numBedrooms">Number of Bedrooms
                    <input type="checkbox" name="StaticFilters" value="numBedrooms" id="numBedrooms"/>
                    <span class="checkmark"></span>
                </label>
                <button className="filterFormApply">Apply filters</button>
            </form>
        </div>
    );
}


export default FilterSelect;