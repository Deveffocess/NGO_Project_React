import React from 'react';
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import moment from 'moment';

const pageSize= 10;

export default function Collections () {
  const [donors, setDonors] = useState()
  const [paginatedDonors, setPaginatedDonors] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  const getID = JSON.parse (localStorage.getItem('projects')); //here i am getting projects id that clicked and store in localStorage.
  console.log(getID,"cecking local storage......")

  useEffect(() => {
    axios.post("http://localhost:4000/coordinatorsCollection",
    {
      projectID : getID
     }).then((res)=>{

    console.log(res.data);
    setDonors(res.data);
    setPaginatedDonors(_(res.data).slice(0).take(pageSize).value());
   
  }); 
  }, [getID]);

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
      <div className='container'>
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
                  <tr key={id}>
                      
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

