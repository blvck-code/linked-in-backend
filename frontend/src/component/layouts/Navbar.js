import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { NavLink, Link } from "react-router-dom";

export class Navbar extends Component {
  authLinks = (
    <ul>
      <li>
        <NavLink to="/developers">Developer</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          <i className="fa fa-user"></i> <span>Dashboard</span>
        </NavLink>
      </li>
      <li onClick={this.props.logout}>
        <a href={this.props.logout}>
          <i className="fa fa-sign-out"></i> <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  guestLinks = (
    <ul>
      <li>
        <NavLink to="/developers">Developer</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
    </ul>
  );
  render() {
    const { isAuthenticated, token } = this.props.auth;

    return (
      <nav className="navbar bg-dark">
        <div className="wrapper">
          <div className="logo orange">
            <Link to="/">
              <h1>
                <i className="fa fa-code"></i> DevsWorld{" "}
              </h1>
            </Link>
          </div>
          <>{isAuthenticated && token ? this.authLinks : this.guestLinks}</>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
