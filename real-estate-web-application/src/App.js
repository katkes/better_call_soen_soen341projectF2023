import React, { useState } from "react";
import './css/App.css';
import SideBar from './sideBar';
import TopBar from './topBar';
import Content from './Content';
//import SingularCard from './singularCard.js';
import PropertySection from "./PropertySection.js";


function App() {
  const [contentText, setContentText] = useState(PropertySection());

  return (
    <div className="App">
      <Content contentText={contentText}/>
      <SideBar/>
      <TopBar setContentText={setContentText}/>

      




    </div>
  );
}

export default App;