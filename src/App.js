import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Router from "./Router";
import './styles/App.css'

const App = () => {

  return (<div>
      <CssBaseline/>
      <div className='main'>
        <Router/>
      </div>
    </div>
  );
};

export default App;
