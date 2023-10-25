import React, {useEffect, useState} from "react";
import './css/App.css';
import SideBar from './sideBar';
import TopBar from './topBar';
import Content from './Content';
// import PropertySection from "./PropertySection.js";
import HomePage from "./home";
import LoginForm from "./LoginForm";
import axios from 'axios';

function App() {
  const [contentText, setContentText] = useState(LoginForm());

  return (
    <div className="App">
      <Content contentText={contentText}/>
      <SideBar/>
      <TopBar setContentText={setContentText}/>
      {/* <PropertySection/> */}

    </div>
  );
}

// function App() { //app function for the backend
//     const [details, setDetails] = useState([]);
//
//     useEffect(() => {
//         let isMounted = true; // Handle potential memory leaks
//         axios.get('http://127.0.0.1:8000/')
//             .then(res => {
//                 if (isMounted) { // Check if the component is still mounted
//                     setDetails(res.data);
//                 }
//             })
//             .catch(err => {
//                 // Handle errors here
//             });
//
//         return () => {
//             isMounted = false; // Cleanup to prevent memory leaks
//         };
//     }, []);
//
//     return (
//         <div>
//             <header>Data Generated from Django</header>
//             <hr />
//             {details.map((output, id) => (
//                 <div key={id}>
//                     <div>
//                         <h2>{output.employee}</h2>
//                         <h2>{output.department}</h2>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

export default App;