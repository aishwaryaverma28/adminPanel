// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import Editor from "./Components/Editor";
import BlogAdd from './Components/BlogAdd';
import BlogUpdate from './Components/BlogUpdate';
import SitePagesAdd from './Components/SitePagesAdd';
import SitePagesUpdate from './Components/SitePagesUpdate';
import SitePagesMetakeywords from './Components/SitePagesMetakeywords';
import HelpAdd from './Components/HelpAdd';
import HelpUpdate from './Components/HelpUpdate';
import UserMangAdd from './Components/UserMangAdd';
import UserMangUpdate from './Components/UserMangUpdate';
import EmployeeAdd from './Components/EmployeeAdd';
import EmployeeUpdate from './Components/EmployeeUpdate';
import AccessManagement from './Components/AccessManagement';
import ReportsandAnalytics from './Components/ReportsandAnalytics';
import City from './Components/City';
import State from './Components/State';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path: "/",
        element: <Editor/>
        },
      {
      path: "/blog/add",
      element: <BlogAdd/>
      },
      {
        path: "/blog/update",
        element: <BlogUpdate/>
        },
        {
          path: "/sitePages/add",
          element: <SitePagesAdd/>
          },
        {
          path: "/sitePages/update",
          element: <SitePagesUpdate/>
        },
        {
          path: "/sitePages/metaKeywords",
          element: <SitePagesMetakeywords/>
        },
        {
          path: "/helpSection/add",
          element: <HelpAdd/>
        },
        {
          path: "/helpSection/update",
          element: <HelpUpdate/>
        },
        {
          path: "/userManagement/add",
          element: <UserMangAdd/>
        },
        {
          path: "/userManagement/update",
          element: <UserMangUpdate/>
        },
        {
          path: "/employee/add",
          element: <EmployeeAdd/>
        },
        {
          path: "/employee/update",
          element: <EmployeeUpdate/>
        },
        {
          path: "/accessManagement",
          element: <AccessManagement/>
        },
        {
          path: "/reportsAndAnalytics",
          element: <ReportsandAnalytics/>
        },
        {
          path: "/masterSettings/City",
          element: <City/>
        },
        {
          path: "/system/state",
          element: <State/>
        }, 
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
   <RouterProvider router={appRouter}/>
  
);
