import React from "react";
import { MenuItem, FormControl, Select, } from "@material-ui/core";
import './App.css';

function App() {
  return (
    // BEM 
    <div className="App">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value="abc" >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">option 2</MenuItem>
          <MenuItem value="worldwide">option 3</MenuItem>
          <MenuItem value="worldwide">yooo</MenuItem>
        </Select>
      </FormControl>
      

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
