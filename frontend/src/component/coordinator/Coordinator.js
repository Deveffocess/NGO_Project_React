import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import DonorForm from './Projects/DonorForm';
import MyProjects from './Projects/MyProjects';
import MyProjectsList from './Projects/MyProjectsList';

export default function Coordinator () {

  return( <>
  <div className="row">
    <nav id="sidebar" className="col-md-4 col-lg-2 d-md-block bg-dark sidebar collapse">
      <div className="position-sticky pt-3 ">

        <ul className="nav flex-column">
        <li className="nav-item">
            <Link className="nav-link" to="/coordinators">    
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
        <h1 className="h2 ">Coordinator Dashboard</h1>
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
              <Route path="/" element={<MyProjectsList />} />
              <Route path="/collections/*" element={<MyProjects />} />
              <Route path="/donorform" element={<DonorForm />} />
            
            </Routes>

    </main>
        </div>
  </>
  );
};

