import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Menu, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
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
    <div className="app">
      <div className="app__left">
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
          
          <div className="app__stats" >
            <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
            <InfoBox title="Recovered" cases={1234} total={3000}/>
            <InfoBox title="Deaths" cases={1235} total={4000}/>
          </div>

          <Map />
        </div>
      
      
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/*  table */}
          <h3>Worldwide new cases</h3>
          {/*  graph */}
        </CardContent>
        
      </Card>

    </div>
      
  );
}

export default App;
