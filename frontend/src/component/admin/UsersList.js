import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import moment from "moment";

const pageSize = 10; // this code set how much row show per page.

export default function UsersList() {
  const [paginatedPosts, setpaginatedPosts] = useState();
  const [posts, setposts] = useState();
  const [currentpage, setCurrentpage] = useState(1);
 
  useEffect(() => {
    axios.get("http://localhost:4000/getallusers").then((res)=>{
    console.log(res.data);
 
    setposts(res.data);
    setpaginatedPosts(_(res.data).slice(0).take(pageSize).value());
  }); 
  }, []);

  // if(pageCount === 1)return null;  //this code show nothing in case if {users < 10}.
  const pageCount= posts? Math.ceil(posts.length/pageSize) :0;
  const pages = _.range(1, pageCount+1)

  const pagination= (pageNo) =>{
    setCurrentpage(pageNo)
    const startIndex = (pageNo -1) * pageSize;
    const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
    setpaginatedPosts(paginatedPost)
  }

  return (
    <div className="container my-2">
      <h3 align="center" className="my-3">Users List</h3>
     {/* {loading && (<Loading/>)} */}
     {/* {error && alert("Error occured to get data")} */}
     {!paginatedPosts ? ("ERROR: Data Not Found. Please check your internet connection!"):(
        <Table className="table table-hover table-light  table-bordered shadow">
          <thead className="thead-dark">
            <tr>        
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">MobileNo.</th>
              <th scope="col">Gender</th>
              <th scope="col">DOB</th>
              <th scope="col">Coordinator</th>                     
            </tr>
          </thead>
          <tbody>
              {paginatedPosts.map((user, id) => (
                  <tr key={id}>
                      
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.mobileNo}</td>
                      <td>{user.gender}</td>
                      <td>{moment(user.dob).format('DD-MM-YYYY')}</td>
                      <td>{user.isCoordinator}</td>
                             
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
          page === currentpage ? "page-item active" : "page-item"
        }>
          <p className="page-link"
          onClick={()=>pagination(page)}
          >{page}</p></li>
      ) )
    }
  </ul>
</nav>

    </div>
  );
}
