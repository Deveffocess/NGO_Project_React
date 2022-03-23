import React from 'react'
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const pageSize= 10;

export default function Projects() {
  let navigate = useNavigate();

  const [projects, setProjects] = useState()
  const [paginatedProject, setPaginatedProject] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    axios.get("http://localhost:4000/getallprojects").then((res)=>{
    console.log(res.data);
    setProjects(res.data);
    setPaginatedProject(_(res.data).slice(0).take(pageSize).value());
  }); 
  }, []);

  const pageCount= projects? Math.ceil(projects.length/pageSize) :0;
  const pages = _.range(1, pageCount+1)

  const pagination= (pageNo) =>{
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize;
    const paginatedProject = _(projects).slice(startIndex).take(pageSize).value();
    setPaginatedProject(paginatedProject)
  }

  const onRowClick = (e) =>  {
    localStorage.setItem('projects',JSON.stringify(e));
    console.log(e,"<<<<= testing In onRow click.....")
    navigate("/admin/collections")
  }
    
    return (
        <>
      <div className='container my-2'>
     {/* {loading && (<Loading/>)} */}
     {/* {error && alert("Error occured to get data")} */}
     {!paginatedProject ? ("ERROR: Data Not Found. Please check your internet connection!"):(
        <Table className="table table-hover table-light  table-bordered shadow">
          <thead className="thead-dark">
            <tr>        
              <th scope="col">Project Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Description</th>
              <th scope="col">Coordinator Name</th>
              <th scope="col">Budget Rs.</th>
              <th scope="col">Remaining Rs.</th>
              <th scope="col">Status</th>
   
            </tr>
          </thead>
          <tbody >
      
              {paginatedProject.map((project, id) => project.remaining > 0 ? (
                  <tr key={project.id} onClick={((e) => onRowClick(project.id))}>
                      
                      <td>{project.projectName}</td>
                      <td>{moment(project.startDate).format('DD-MM-YYYY')}</td>
                      <td>{moment(project.endDate).format('DD-MM-YYYY')}</td>
                      <td>{project.description}</td>
                      <td>{project.coordinatorName}</td>
                      <td>{project.budget}</td>
                      <td>{project.remaining}</td>
                      <td><b className="text-danger">Active</b></td>
                   
                  </tr>
              ) : (
                <tr key={project.id} onClick={((e) => onRowClick(project.id))}>
                    
                    <td>{project.projectName}</td>
                    <td>{moment(project.startDate).format('DD-MM-YYYY')}</td>
                    <td>{moment(project.endDate).format('DD-MM-YYYY')}</td>
                    <td>{project.description}</td>
                    <td>{project.coordinatorName}</td>
                    <td>{project.budget}</td>
                    <td>{project.remaining}</td>
                    <td><b className="text-success">Completed</b></td>
                 
                </tr>
            ) 
              )}
          </tbody>
        </Table>
        )}

 <nav  className="d-flex pagination justify-content-center ">
  <ul className="pagination ">
  
    {
      pages.map((page)=>(
        <li className={
          page === currentPage ? "page-item active" : "page-item"
        }>
          <p className="page-link"
          onClick={()=>pagination(page)}
          >{page}</p></li>
      ) )
    }
  </ul>
</nav>

          </div> 
        </>
    )
}