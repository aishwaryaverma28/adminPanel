import React from "react";
import "../src/Components/Styles/Sidebar.css";
import NavigationBar from "./Components/Navigationbar";

import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className="main">
      <div className="sidebar">
        <NavigationBar/>
      </div>
      <div className="conatiner">
      <Outlet/>
      </div>
    </div>
  );
}


export default App;