import React from 'react';
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import moment from 'moment';

const pageSize= 10; 

export default function AllCollections () {
  const [donors, setDonors] = useState()
  const [paginatedDonors, setPaginatedDonors] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [getproject, setGetproject] = useState()
 
  let ProId = JSON.parse (localStorage.getItem('projects')); //here i am getting projects id that clicked and store in localStorage.
  console.log(ProId,"cecking local storage......")

  useEffect(() => {
    axios.post("http://localhost:4000/coordinatorsCollection",
    {
      projectID : ProId
     }).then((res)=>{

    console.log(res.data,"<--this is Collection");
    setDonors(res.data);
    setPaginatedDonors(_(res.data).slice(0).take(pageSize).value());
   
  }); 
  }, [ProId]);

  useEffect(() => {
    //For getting remaining below project column of project seletion
    axios.post("http://localhost:4000/getProjectById",
    {
        projectData : ProId
     }).then((Rres) => {
      console.log(Rres.data,"checking ProjectData...");
      setGetproject(Rres.data)
    });
  }, [ProId]);

  const pageCount= donors? Math.ceil(donors.length/pageSize) :0;
  const pages = _.range(1, pageCount+1)

  const pagination= (pageNo) =>{
    setCurrentPage(pageNo)
    const startIndex = (pageNo -1) * pageSize;
    const paginatedDonors = _(donors).slice(startIndex).take(pageSize).value();
    setPaginatedDonors(paginatedDonors)
  }

  //**To Fetch data of a particular field then use 'map'. e.g:- /veriable_name/ && /veriable_name/.map like that to prevent errors. if you dont use '&&' operator it will throw an error.

    return (
        <>
      <div className='container my-2'>
      <h3 className="my-3">{getproject && getproject.map((project) => ( <h3> Collection of Donors in :- <b>{project.projectName}</b></h3> ))}</h3>
     {/* {loading && (<Loading/>)} */}
     {/* {error && alert("Error occured to get data")} */}
     {!paginatedDonors ? ("ERROR: Data Not Found. Please check your internet connection!"):(
        <Table className="table table-hover table-light  table-bordered shadow">
          <thead className="thead-dark">
            <tr>        
              <th scope="col">Donor Name</th>
              <th scope="col">Donate Date.</th>
              <th scope="col">Contact No</th>
              <th scope="col">Amount</th>
              <th scope="col">Project Budget</th>
            </tr>
          </thead>
          <tbody >
         
              {paginatedDonors.map((donors, id) => (
                  <tr key={donors.id}>
                      
                      <td>{donors.name}</td>
                      <td>{ moment((donors.donateDate).slice(0,10)).format('DD-MM-YYYY') }</td>
                      <td>{donors.mobileNo}</td>
                      <td>{donors.amount}</td>
                      <td>{donors.projectBudget}</td>
                      
                  </tr>
              ))}
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
};

