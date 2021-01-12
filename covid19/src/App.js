import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Menu, } from "@material-ui/core";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  // state= how to write a variable in react

  useEffect(() => {
    //async -> send a request, wait for it, do something with the code
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log("yoooo >>>", countryCode);

    setCountry(countryCode);
  }

  return (
    // BEM 
    <div className="App">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country} >
            {/* Loop through all the countries and show a drop down list */}
            <MenuItem value="worldwide">Worldwide</MenuItem> 

            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">option 2</MenuItem>
            <MenuItem value="worldwide">option 3</MenuItem>
            <MenuItem value="worldwide">yooo</MenuItem>*/}

          </Select> 
        </FormControl>
      </div>
      
      

      {/*  Header */}
      {/*  Title + select input dropdown */}

      {/*  info box */}
      {/*  infobxo */}
      {/*  infobxo */}

      {/*  table */}
      {/*  graph */}

      {/*  map */}
    </div>
  );
}

export default App;
