import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Menu, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import './App.css';
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // state= how to write a variable in react

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, []);
 
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

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        //All the data frm country response
        setCountryInfo(data);
      });
  };

  console.log("country info >>> ", countryInfo);

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
            <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
            <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
            <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          </div>

          <Map />
        </div>
      
      
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
        
      </Card>

    </div>
      
  );
}

export default App;
