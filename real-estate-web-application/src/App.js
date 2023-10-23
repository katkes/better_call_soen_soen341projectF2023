import React, { useState } from "react";
import './css/App.css';
import SideBar from './sideBar';
import TopBar from './topBar';
import Content from './Content';
//import SingularCard from './singularCard.js';
import PropertySection from "./PropertySection.js";
import HomePage from "./home";


function App() {
  const [contentText, setContentText] = useState(HomePage());

  return (
    <div className="App">
      <Content contentText={contentText}/>
      <SideBar/>
      <TopBar setContentText={setContentText}/>
      <PropertySection/>
    </div>
  );
}

export default App;