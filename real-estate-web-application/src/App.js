import React, {useEffect, useState} from "react";
import './css/App.css';
import SideBar from './sideBar';
import TopBar from './topBar';
import Content from './Content';
import PropertySection from "./PropertySection.js";
import HomePage from "./home";
import LoginForm from "./LoginForm";
import RealEstateListing from "./BuyPropertyPage.js";



function App() {
  const [contentText, setContentText] = useState();

  
  return (
    <div className="App">
      <Content contentText={contentText}/>
      <SideBar/>
      <TopBar setContentText={setContentText}/>
      {/* <PropertySection/> */}
      <PropertySection setContentText={setContentText}/>
      
    </div>
  );
}

export default App;