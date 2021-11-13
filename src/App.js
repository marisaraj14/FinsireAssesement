import './App.css';

import React, { useState } from "react";
import { Router } from "@reach/router";
import Main from './Main';
import Calculation from './Calculation';

export default function App() {

  const [no, setNo]= useState(0);


  return (
    <Router>
      <Main no={no} setNo={setNo} path="/"/>
      <Calculation number={no} path="/Calculation"/>
     
    </Router>
  );
}


