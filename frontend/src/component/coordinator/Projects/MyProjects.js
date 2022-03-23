import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Collections from "../Collections";
import DonorForm from "./DonorForm";
import axios from "axios";

export default function MyProjects() {
  const [showForm, setShowForm] = useState(false);
  const [remainId, setRemainId] = useState();

  const openForm = () => {
    setShowForm((prev) => !prev);
  };

  //In localStorage i have project ID.
  const getID = JSON.parse(localStorage.getItem("projects")); //here i am getting projects id that clicked and store in localStorage.
  console.log(getID, "cecking local storage in Donor Form");

  useEffect(() => {
    //For getting remaining below project column of project seletion
    axios
      .post("http://localhost:4000/getProjectById", {
        projectData: getID,
      })
      .then((Rres) => {
        console.log(Rres.data, "hello this is remain testing...");
        setRemainId(Rres.data);
      });
  }, [getID]);
  return (
    <>
      <main className="col-md-12 ">
        {" "}
        {/* this code set the width-size of the page by changing "md-11" to set */}
        <div className="d-flex justify-content-between mx-5">
          <h3 className="mx-4 my-1">
            {remainId &&
              remainId.map((project) => (
                <h3> Collection of Donors in :- <b>{project.projectName}</b>
                </h3>
              ))}
          </h3>
          <div className="btn-toolbar ">

            {remainId &&
              remainId.map((project) => project.remaining > 0 ? (
              <div className="btn-group mx-4 my-1">
                <Link to="/coordinators/collections/donorsform">
                  <button
                    onClick={openForm}
                    type="button"
                    className={
                      showForm
                        ? "btn btn-sm btn-outline-secondary active"
                        : "btn btn-sm btn-outline-secondary"
                    }
                  >
                    <i className="zmdi zmdi-plus zmdi-hc-lg"></i>
                  </button>
                </Link>
              </div> ) : null
              )}

          </div>
        </div>
        <Routes>
          <Route path="/" element={<Collections />} />
          <Route
            path="/donorsform"
            element={
              <DonorForm showForm={showForm} setShowForm={setShowForm} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
