import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import FillAllFielderror from "../../signup/FillAllFielderror";
import ProjectsList from "./ProjectsList"
import { KeyboardDatePicker } from "@material-ui/pickers";

export default function ProjectForm({showForm, setShowForm}) {
 
  let navigate = useNavigate();


  const [coordinatorName] = useState();

const [startDate, setStartDate] = useState(new Date())
const [endDate, setEndDate] = useState(startDate)

  const [user, setUser] = useState({
    projectName: "",
    description: "",
    budget:"",
    coordinatorName:"",
  });

  const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")

  const [Error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fill, setFill] = useState(false);

  const [userId, setUserId] = useState();

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setFill(false);

    setUser({ ...user, [name]: value });
  };

  const handleStartDate = (e) =>{
    setStartDate(e)
  }
 const handleEndDate = (e) =>{
   setEndDate(e)
 }
  const onclick = async (e) => {
    e.preventDefault();
    
    const { projectName, description, coordinatorName, budget} =
      user;
    try {
      if(
        coordinatorName ===""||
        projectName === "" ||
        startDate === "" ||
        endDate === "" ||
        budget==="" 
      ) { 
        setFill(true);
      } else {
        setFill(false);
        const config = {
          header: {
            "Content type": "appication/json",
          },
        };
        setLoading(true);

        const { data } = await axios.post(
          " http://localhost:4000/createproject",
          {
            projectName,
            startDate,
            endDate,
            description,
            coordinatorName,
            budget,
            pic,
          },
          config
        );

        console.log(data);
        localStorage.setItem("projectInfo", JSON.stringify(data));

        navigate("/admin/projects");
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  const postDetails = (pics) => {
   
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ngo-project");
      data.append("cloud_name", "effocess-techworks");
      fetch("https://api.cloudinary.com/v1_1/effocess-techworks/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {

    //to get all coordinators name only in coordinatorName column.
    axios.get("http://localhost:4000/coordinators").then((res) => {
      console.log(res.data);
      setUserId(res.data);
    });
  }, []);

  console.log(startDate,">>checking start date<<")
  
  return (
    <>
      {showForm ?
        <section>
          <div className="container">
              <div className="signup-form">
                <div className="card-secondary shadow">
                  <div className="card-header ">
                    <h3 className="card-title my-1">Create Project</h3>
                  </div>
                  <form 
                    onSubmit={onclick}
                    method="POST"
                    className="form-horizontal "
                    id="register-form"
                  >
                    <div className="card-body">
                      {fill && (
                        <FillAllFielderror variant="danger">
                          {Error}
                        </FillAllFielderror>
                      )}
                      {loading && <Loading />}

                      <div className="row">
                        <div className="form-group ">
                          <label
                            className="form-label col"
                            htmlFor="validationServer01"
                          >
                            Project Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="projectName"
                            placeholder="Enter Project Name"
                            value={user.projectName}
                            onChange={handleInputs}
                            name="projectName"
                          />
                        
                        </div>

                        <div className="form-group col">
                          <label className="form-label col">Start Date</label>

                          <div>
                          <KeyboardDatePicker minDate={new Date()}
                                className="mx-2"
                                variant="inline"                                
                                format="DD/MM/YYYY"
                               KeyboardButtonProps={{
                                 'aria-label' : 'change-date'
                               }}
                                onChange={handleStartDate}
                                value={startDate}
                            />
                          </div>
                        </div>

                        <div className="form-group col">
                          <label className="form-label col">End Date</label>
                          <div>
                          <KeyboardDatePicker minDate={startDate}
                                className="mx-2"      
                                variant="inline"                                
                                format="DD/MM/YYYY"
                               KeyboardButtonProps={{
                                 'aria-label' : 'change-date'
                               }}
                                onChange={handleEndDate}
                                value={endDate}
                            />
                          </div>
                        </div>

                        <div className="form-group ">
                          <label className="form-label col">
                            Co-ordindator name
                          </label>
                          <select 
                          id="coordinatorName"  
                          name="coordinatorName"  
                          type="select" 
                          className="form-control" 
                          value={coordinatorName} 
                          onChange={handleInputs}>
                            <option value="">Select Coordinator</option>
                            {userId &&
                              userId.map((user) => (
                                <option value={user.id}>
                               {user.firstname} {user.lastname}
                                </option>
                              ))}
                          </select>

                        
                        </div>

                        <div className="form-group">
                        <label className="col-4 col-form-label">
                         Budget Rs.
                        </label>
                        <input 
                         
                          type="number"
                          className="form-control"
                          id="budget"
                          value={user.budget}
                          onChange={handleInputs}
                          placeholder="Enter Budget"
                          name="budget"
                        />
                        
                      </div>

                        <div className="form-group">
                          <label className="form-label col">
                            Description (optional)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={user.description}
                            onChange={handleInputs}
                            placeholder="Enter Description"
                            name="description"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label col">
                            Select picture (optional)
                          </label>
                          <input 
                             onChange={(e) => postDetails(e.target.files[0])}
                             id="custom-file"
                             type="file"
                             className="form-control"
                             custom
                          />
                        </div>

                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn-hover-1 color-3">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          
          </div>
        
        </section>
         : 
         <Routes>       
         <Route path="/" element={<ProjectsList />} />
         </Routes>}
         
    </>
  );
}
