import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import FillAllFielderror from "../../signup/FillAllFielderror";
import { useForm } from "react-hook-form";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Collections from "../Collections";

export default function DonorForm({ showForm }) {
  const [Error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fill, setFill] = useState(false);
  const [remainId, setRemainId] = useState();

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //In localStorage i have project ID
  const getID = JSON.parse(localStorage.getItem("projects")); //here i am getting projects id that clicked and store in localStorage.

  const [donateDate, setDonateDate] = useState(new Date());

  const [donors, setDonors] = useState({
    name: "",
    mobileNo: "",
    amount: "",
    project: getID,
    projectBudget: ""
  });

  const handleDateChange = (e) =>{
    setDonateDate(e)
    console.log(e,"this is e check...")
    setFill(false);
    // console.log(e.target.donateDate,"<--this is donateDate")
  }

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    
    setFill(false);

    setDonors({ ...donors, [name]: value });
  };

  const onclick = async (e) => {

    const { name, mobileNo, amount, project, projectBudget } =
      donors;

    try {
      if (
        name === "" ||
        mobileNo === "" ||
        amount === "" ||
        project === "" ||
        donateDate === ""
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
          "http://localhost:4000/donorsform",
          {
            name,
            mobileNo,
            amount,
            project,
            projectBudget,
            donateDate,
          },
          config
        );

        console.log(data);
        localStorage.setItem("donorsInfo", JSON.stringify(data));
        navigate("/coordinators/collections");
      }
    } catch (error) {
    
      setError(true);
      setLoading(false);
    }
  };

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

  const remainingg = remainId && remainId.map((remains) => (remains.remaining))
  console.log(remainingg,"<<<<>>>> checking remains")

  return (
    <>
      {showForm ? (
        <section>
          <div className="container">
            <div className="signup-form">
              <div className="card-secondary shadow">
                <div className="card-header ">
                  <h3 className="card-title my-1">Donor Details</h3>
                </div>
                <form
                  onSubmit={handleSubmit(onclick)}
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
                      <div className="form-group col">
                        <label className="form-label col">Donor Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Enter Donor Name"
                          value={donors.name}
                          onChange={handleInputs}
                       
                        />
                      </div>

                      <div className="form-group col">
                        <label className="form-label col">Contact No.</label>
                        <input
                          {...register("mobileNo", {
                            minLength: {
                              value: 10,
                              message: "Enter a valid Contact number!",
                            },
                            maxLength: {
                              value: 10,
                              message: "Enter a valid Contact number!",
                            },
                          })}
                          type="number"
                          className="form-control"
                          id="mobileNo"
                          value={donors.mobileNo}
                          onChange={handleInputs}
                          placeholder="Enter Contact number"
                          name="mobileNo"
                        />
                        {errors.mobileNo && (
                          <small className="text-danger">
                            {errors.mobileNo.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label col">Amount</label>

                        <input
                        {...register("amount", {
                          max: {
                            value: remainingg,
                            message: "Amount should not be greater than Remaining Budget!",
                          },
                        })}
                          type="number"
                          className="form-control"
                          id="amount"
                          value={donors.amount}
                          onChange={handleInputs}
                          placeholder="Enter amount"
                          name="amount"
                        />
                        {errors.amount && (
                          <small className="text-danger">
                            {errors.amount.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group  ">
                       <label className="form-label col">Donate Date</label>
                              <KeyboardDatePicker 
                                className="mx-1"
                                // disableToolbar
                                variant="inline"                                
                                format="DD/MM/YYYY"
                                onChange={handleDateChange}
                                value={donateDate}
                            />
                        
                      </div>

                      <div className="form-group">
                        {remainId &&
                          remainId.map((remains) => (
                            <label className="col-12 col-form-label">
                               Remaining Budget:- <b>{remains.remaining}</b>
                            </label>
                          ))}
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
      ) : (
        <Routes>
          <Route path="/" element={<Collections />} />
        </Routes>
      )}
    </>
  );
}
