import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const pageSize = 10;
export default function MyProjectsList() {

  let navigate = useNavigate();
  const [projects, setProjects] = useState();
  const [paginatedProject, setPaginatedProject] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const userState = useSelector(state=> state.loginUserReducer)
  const {currentUser} =userState;

  const coordinatorId = currentUser.id;

  useEffect(() => {
   axios.post("http://localhost:4000/coordinatorsProjects",
   {
     coordinatorId : coordinatorId
    }).then((res) => {
      console.log(res.data,'==>>> this is coordinator projects');
      setProjects(res.data);
      setPaginatedProject(_(res.data).slice(0).take(pageSize).value());
    });
  }, [coordinatorId]);

  const pageCount = projects ? Math.ceil(projects.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedProject = _(projects)
      .slice(startIndex)
      .take(pageSize)
      .value();
    setPaginatedProject(paginatedProject);
  };

  const onRowClick = (e) =>  {
    localStorage.setItem('projects',JSON.stringify(e));
    console.log(e,"<<<<= testing In onRow click.....")
    navigate("/coordinators/collections")
  }

  return (
    <>
    <div className="container">
      <div className="container  ">
      <h3  className="my-1">Projects Ongoing....</h3>
        {!paginatedProject ? (
          "ERROR: Data Not Found. Please check your internet connection!"
        ) : (
          <Table className="table table-hover table-light  table-bordered shadow my-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Project Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Budget Rs.</th>
                <th scope="col">Remaining Rs.</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>

              {paginatedProject.map((project, id) => project.remaining > 0 ? (
                //In this onlick() i am sending project Id using 'user' parameter that set in map().
                <tr  key={id} onClick={((e) => onRowClick(project.id))}>
                  <td>{project.projectName}</td>
                  <td>{moment(project.startDate).format('DD-MM-YYYY')}</td>
                  <td>{moment(project.endDate).format('DD-MM-YYYY')}</td>
                  <td>{project.budget}</td>
                  <td>{project.remaining}</td>
                  <td><b className="text-danger">Active</b></td>
                </tr>
              ) : (
                <tr  key={id} onClick={((e) => onRowClick(project.id))}>
                  <td>{project.projectName}</td>
                  <td>{moment(project.startDate).format('DD-MM-YYYY')}</td>
                  <td>{moment(project.endDate).format('DD-MM-YYYY')}</td>
                  <td>{project.budget}</td>
                  <td>{project.remaining}</td>
                  <td><b className="text-success">Completed</b></td>
                </tr>
              )
              )}
            </tbody>
          </Table>
        )}

        <nav className="d-flex pagination justify-content-center ">
          <ul className="pagination ">
            {pages.map((page) => (
              <li
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <p className="page-link" onClick={() => pagination(page)}>
                  {page}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      </div>
    </>
  );
}
