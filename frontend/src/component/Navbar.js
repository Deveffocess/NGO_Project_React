import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate();
let user= JSON.parse(localStorage.getItem('currentUser'))
function logout(){
  localStorage.clear();
  navigate("/login");
}
    return (
        <>


  <nav className=" navbar navbar-expand-lg sticky-top navbar-light bg-light  shadow">
  <div className="container-fluid my-2">
    <Link className="navbar-brand " to="/"> <b>NGO</b> </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">NGO</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>      
      </div>

    <div className=" offcanvas-body " id="navbarSupportedContent "  >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
        <li className="nav-item " >
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li> 
      
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success"  type="submit">Search</button>
        {localStorage.getItem('currentUser') ?  
         null
         : 
         <>
        <Link className="btn btn-primary mx-1"  to="/Signup" role="button">Signup</Link>
        <Link className="btn btn-outline-primary " to="/Login" role="button">Login</Link>
        </> 
       }
      </form>
      {localStorage.getItem('currentUser') ?
      <Nav>
        <b>
        <NavDropdown title={`Hi! ${user.firstname}`}>
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
        </b>
      </Nav> : null
}
</div>
    </div>
  </div>
</nav>


        </>
    )
}

export default Navbar;