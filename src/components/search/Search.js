import { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import classes from "./Search.module.css";
import { GEO_API_URL, geoApiOptions } from "../../Api";

const Search = (props) => {
  const [search, setSearch] = useState(null);


  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000  &namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };


  const onChangeHandler = (event) => {
    setSearch(event);
    props.onSearchChange(event);
  };
  return (<div>
    
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
      className={classes.searchbar}
    />
    </div>
  );
};
export default Search;
