import React, { Component } from "react";
import { Link } from "react-router-dom";

export class ResetPass extends Component {
  render() {
    return (
      <div className="reset-pass">
        <div className="wrapper">
          <div className="logo">
            <h1>
              DevsWorld <span className="text-black">K</span>
              <span className="text-red">E</span>
            </h1>
          </div>
          <form className="form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                autoComplete="off"
                autoSave="off"
              />
            </div>
            <button className="btn btn-primary">Reset Password</button>
          </form>
          <div className="or">
            <hr className="bar" />
            <span>OR</span>
            <hr className="bar" />
          </div>
          <div className="or">
            <Link to="/login" className="link btn btn-secondary m-1">
              Login
            </Link>
            <Link to="/register" className="link btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
        <footer className="footer">
          <p>Copyright &copy; 2020, DevsWorld KE All Rights Reserved</p>
          <div>
            <Link to="#">Terms of Use</Link> |{" "}
            <Link to="#">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    );
  }
}

export default ResetPass;
