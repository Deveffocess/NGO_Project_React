import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Loading from "../Loading";

import "./Login.css";
import { loginUser } from "../admin/UserAction";

const Login = () => {
  
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  
  const userState = useSelector(state => state.loginUserReducer)
  const {loading, error} = userState;
  const dispatch= useDispatch();

  const submitHandler = async (e) => {
    // this prevent direct submission of form and first run submitHandler() and then submit form.
    e.preventDefault();
    
    const user= {mobileNo, password}
    dispatch(loginUser(user))   
  };

  return (
    <>
      <section >
        <div className="container ">
          <div className="row">
          <div class="col-7 d-flex align-items-center">
<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="login"/>
</div>
            <div className="col">
              <div className=" card-info shadow my-3">
                <div className="card-header ">
                  <h3 className="card-title my-1">Login</h3>
                </div>

                <form className="form-horizontal " onSubmit={submitHandler}>
                  <div className="card-body ">
                    {error && (
                      <ErrorMessage variant="danger">{error}</ErrorMessage>
                    )}
                    {loading && <Loading />}

                    <div className="form-group row ">
                      <label className="col-5 col-form-label ">
                        Mobile Number
                      </label>
                      <div className="col-lg-10">
                        <input
                          type="number"
                          className="form-control"
                          id="mobileNo"
                          placeholder="Mobile number"
                          value={mobileNo}   
                          onChange={(e) => setMobileNo(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-4 col-form-label">Password</label>
                      <div className="col-lg-10">
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword3"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn-hover color-7">
                      Login
                    </button>

                    
                    <Row className="py-3" align="center">
                      <Col>
                        Create Account ? <Link to="/signup">Register Here</Link>
                      </Col>
                    </Row>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
