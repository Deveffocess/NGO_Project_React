import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import ProjectForm from "./ProjectForm";
import ProjectsList from "./ProjectsList"

export default function Projects() {
  const [showForm, setShowForm] = useState(false);

  const openForm = () =>{
    setShowForm(prev => !prev);
  }
    return (
        <>
            <main className="col-md-12 ">  {/* this code set the width-size of the page by changig "md-11" to set */}
            <div className="d-flex justify-content-between mx-5 ">
        <h3 className='mx-4'>All Projects Ongoing</h3>
        <div className="btn-toolbar ">

          <div className="btn-group mx-4">
          <Link to="/admin/projects/projectform">
            
            <button onClick={openForm} type="button" className={showForm ? "btn btn-sm btn-outline-secondary active" : "btn btn-sm btn-outline-secondary"}>
                     <i class="zmdi zmdi-plus  zmdi-hc-lg"></i>        
            </button>
            </Link> 
          </div>
        </div>
      </div>

      <Routes>       
         <Route path="/" element={<ProjectsList />} />
         <Route path="/projectform" element={<ProjectForm showForm={showForm} setShowForm={setShowForm}/>} />
     </Routes>

      </main>
        </>
    )
}
