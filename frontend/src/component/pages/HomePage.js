import React, { Component } from "react";
import { Navbar } from "../layouts/Navbar";
import { Link, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class HomePage extends Component {
  render() {
    const { isAuthenticated, token } = this.props.auth;
    if (isAuthenticated && token) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <>
        <nav className="navbar bg-dark">
          <div className="wrapper">
            <div className="logo orange">
              <Link to="/">
                <h1>
                  <i className="fa fa-code"></i> DevsWorld{" "}
                </h1>
              </Link>
            </div>
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
          </div>
        </nav>
        <section className="landing">
          <div className="overlay">
            <div className="showcase-inner">
              <h1 className="x-large">DevsWorld</h1>
              <p className="lead">
                Create developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <div className="buttons">
                <Link to="/register" className="btn btn-secondary">
                  Register
                </Link>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(HomePage);
