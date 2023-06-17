import React from 'react';
import "../Components/Styles/Sidebar.css";
import companyLogo from '../Assets/image/logo.png'
import userIcon from '../Assets/image/user-img.png'
import Sidebar from './Sidebar';

const NavigationBar = () => {
  return (
    <>
      <div class="sidebar-header">
          <a><img src={companyLogo} alt="Logo Image" /></a>
        </div>
      <div class= "navigationBar">
        <div class="userLogoContainer">
          <img src={userIcon} alt="user-img"/>
          <p>John Wick<br/> <span>Client</span></p>
        </div>
        <div className='sidebarContainer'>
         <Sidebar/>
         </div>
      </div>
      
    </>
  )
}

export default NavigationBar