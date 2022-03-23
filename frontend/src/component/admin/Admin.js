import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import UsersList from "./UsersList";
import Projects from "./projects/Projects";
import "./Admin.css"
import AllCollections from "./projects/AllCollections";

export default function Admin() {
    let navigate = useNavigate();
const userState = useSelector(state=> state.loginUserReducer)
const {currentUser} =userState;
 useEffect(() => {
  // This code check Role of user who logged in and if not coordinator then restrict(stop) to going on this private page. By getItem and check === !currentUser.isCoordinator.
    if(localStorage.getItem('currentUser') === null || !currentUser.isAdmin){
    
       navigate('/coordinators');
       if(localStorage.getItem('currentUser') === null || !currentUser.isCoordinator){
        navigate('/');
     }
    }   
 }, [currentUser, navigate])
 
  return (
    <>
  <div className="row">
    <nav id="sidebar" className="col-md-4 col-lg-2 d-md-block bg-dark sidebar collapse">
      <div className="position-sticky pt-3 ">

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/userslist">
          <i className="zmdi zmdi-home zmdi-hc-lg mx-3"></i>
          Dashboard
          </Link>
          </li>
               
          <li className="nav-item">
            <Link className="nav-link" to="/admin/projects">    
            <i  className="zmdi zmdi-file-text zmdi-hc-lg mx-3"></i>
              Projects
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="#">
            <i  className="zmdi zmdi-graphic-eq zmdi-hc-lg mx-3"></i>
              Reports
            </Link>
          </li>
         
        </ul>

       
      </div>
    </nav>
    

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
        <h1 className="h2 ">Admin Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          {/*  This code for dashboard side buttons.

          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
          <i  className="zmdi zmdi-calendar zmdi-hc-lg mx-3"></i>
            This week
          </button> */}
        </div>
      </div>

      <Routes>
              <Route path="/" element={<UsersList />} />
              <Route path="/userslist" element={<UsersList />} />
              <Route path="/projects/*" element={<Projects />} />
              <Route path="/collections/*" element={<AllCollections />} />
            </Routes>

    </main>
  </div>


   </> 
  );
}
