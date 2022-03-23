import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import FillAllFielderror from "./FillAllFielderror";
import MismatchError from "./MismatchError";
import { Col, Row } from "react-bootstrap";
import signup from "./images/signup.png";
import MobileExist from "./MobileExist";
import { useForm } from "react-hook-form";
import { KeyboardDatePicker } from "@material-ui/pickers";

const Signup = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dob, setDob] = useState(new Date())

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    mobileNo: "",
    password: "",
    cpassword: "",
    gender: ""
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fill, setFill] = useState(false);
  const [mobile, setMobile] = useState(false);

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setFill(false);
    setMobile(false);
    setMessage(false);

    setUser({ ...user, [name]: value });
  };

  const handleDateChange = (e) =>{
    console.log(e,"check e.....")
    setDob(e)
  }

  const onclick = async (e) => {
    // e.preventDefault();
    const { firstname, lastname, mobileNo, password, cpassword, gender } =
      user;
  
      try {

      if (password !== cpassword) {
        setMessage(true);
      } 
     else if (
        firstname === "" ||
        lastname === "" ||
        mobileNo === "" ||
        password === "" ||
        cpassword === "" ||
        gender === "" ||
        dob === ""
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
          "http://localhost:4000/signup",
          {
            firstname:firstname,
            lastname:lastname,
            mobileNo:mobileNo,
            password:password,
            cpassword:cpassword,
            gender:gender,
            dob:dob,
          },
          config
        );
        
        console.log(data);
        localStorage.setItem("currentUser", JSON.stringify(data));

        // setMobile(false);
        navigate("/Login");
        
      }
      // if ({ mobileNo: !mobileNo }) {
      //   setMobile(false);
      // } 
      console.log(user.dob,"checking date...");
    } catch (error) {
     setMobile(true);
      setError(true);
      setLoading(false);
    }
  };
  
  return (
    <>
      {
        <section>
          <div className="container">
            <div className="row">
              <div className="col-7 d-flex align-items-center">
                <img src={signup} alt="sigup pic"  />
              </div>
              <div className="col ">
                <div className="card-info shadow my-3">
                  <div className="card-header ">
                    <h3 className="card-title my-1">Sign Up</h3>
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
                          {error}
                        </FillAllFielderror>
                      )}
                      {message && (
                        <MismatchError variant="danger">
                          {error}
                        </MismatchError>
                      )}
                      {mobile && (
                        <MobileExist variant="danger">{error}</MobileExist>
                      )}

                      {loading && <Loading />}
                      <div className="row">
                        <div className="form-group col">
                          <label
                            className="col-form-label"
                            htmlFor="validationServer01"
                          >
                            First Name
                          </label>
                          <input
                            {...register("firstname", {
                             
                              pattern: {
                                value: /^[a-zA-Z]/,
                                message: "Enter valid name!",
                              },
                            })}
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Enter First Name"
                            value={user.firstname}
                            onChange={handleInputs}
                            name="firstname"
                          />
                          {errors.firstname && (
                            <small className="text-danger">
                              {errors.firstname.message}
                            </small>
                          )}
                        </div>
                        <div className="form-group col">
                          <label className="col-form-label">Last Name</label>
                          <input
                            {...register("lastname", {
                            
                              pattern: {
                                value: /^[a-zA-Z]/,
                                message: "Enter valid name!",
                              },
                            })}
                            type="text"
                            className="form-control"
                            id="lastname"
                            value={user.lastname}
                            onChange={handleInputs}
                            placeholder="Enter Last Name"
                            name="lastname"
                          />
                          {errors.lastname && (
                            <small className="text-danger">
                              {errors.lastname.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="col-4 col-form-label">
                          Mobile Number
                        </label>
                        <input
                          {...register("mobileNo", {
                           
                            minLength: {
                              value: 10,
                              message: "Enter a valid mobile no.!",
                            },
                            maxLength: {
                              value: 10,
                              message: "Enter a valid mobile no.!",
                            },
                          })}
                          type="number"
                          className="form-control"
                          id="mobileNo"
                          value={user.mobileNo}
                          onChange={handleInputs}
                          placeholder="Enter Mobile No"
                          name="mobileNo"
                        />
                        {errors.mobileNo && (
                          <small className="text-danger">
                            {errors.mobileNo.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="col-4 col-form-label">Password</label>
                        <input
                          {...register("password", {
                         
                            minLength: {
                              value: 6,
                              message:
                                "Password should be minimum 6 character!",
                            },
                          })}
                          type="password"
                          className="form-control"
                          id="password"
                          value={user.password}
                          onChange={handleInputs}
                          placeholder="Enter Password"
                          name="password"
                        />
                        {errors.password && (
                          <small className="text-danger">
                            {errors.password.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="col-4 col-form-label">
                          Confirm Password
                        </label>
                        <input
                         
                          type="password"
                          className="form-control"
                          id="cpassword"
                          value={user.cpassword}
                          onChange={handleInputs}
                          placeholder="Enter Confirm Password"
                          name="cpassword"
                        />
                        {errors.cpassword && (
                          <small className="text-danger">
                            {errors.cpassword.message}
                          </small>
                        )}
                      </div>

                      <fieldset className="form-group">
                        <label className="col-4 col-form-label">
                          Select Gender
                        </label>

                        <div className="col-sm-10">
                          <div className="row">
                            <div className=" form-check col">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="gender"
                                value="male"
                                onChange={handleInputs}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gridRadios1"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check col">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="gender"
                                value="female"
                                onChange={handleInputs}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gridRadios2"
                              >
                                Female
                              </label>
                            </div>
                            <div className="form-check col">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="gender"
                                value="other"
                                onChange={handleInputs}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gridRadios2"
                              >
                                Other
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>

                      <div className="form-group">
                        <label className="form-label col">Date Of Birth</label>
                        <div>

                        <KeyboardDatePicker maxDate={new Date()}
                                className="mx-2"        
                                variant="inline"                                
                                format="DD/MM/YYYY"
                                KeyboardButtonProps={{
                                 'aria-label' : 'change-date'
                               }}
                                onChange={handleDateChange}
                                value={dob}
                            />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn-hover color-1 ">
                        Submit
                      </button>
                      <Row className="py-3" align="center">
                        <Col>
                          Already have an account?
                          <Link to="/login">Login</Link>
                        </Col>
                      </Row>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Signup;
