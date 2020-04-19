import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ u }) => {
  console.log("Role from navbar is here", u.user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        Self Assessment
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link active" to="/">
            Home <span className="sr-only"></span>
          </NavLink>
          {!u && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/registration">
                Registration
              </NavLink>
            </React.Fragment>
          )}
          {u && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {u.user.firstName}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}

          {u && u.user.role == "Nurse" && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/reportnurse">
                Add Report
              </NavLink>
              <NavLink className="nav-item nav-link" to="/addTips">
                Add Tips
              </NavLink>
              <NavLink className="nav-item nav-link" to="/searchbyemail">
                Search By Email
              </NavLink>

              <NavLink className="nav-item nav-link" to="/searchallreports">
                Search
              </NavLink>
              <NavLink className="nav-item nav-link" to="/searchallemer">
                Search Emer
              </NavLink>
            </React.Fragment>
          )}
          {u && u.user.role == "Patient" && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/reportuser">
                Add Report
              </NavLink>
              <NavLink className="nav-item nav-link" to="/emergency">
                Emergency
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
