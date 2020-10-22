import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  register,
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
  confirmPassword,
} from "../../actions/auth";
import PropTypes from "prop-types";
import AuthAlerts from "../layouts/AuthAlerts";

export class Register extends Component {
  state = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  checkEmail = (e) => {
    this.props.validateEmail(e.target.value);

    this.setState({
      email: e.target.value,
    });
  };

  checkFirstname = (e) => {
    this.setState({
      first_name: e.target.value,
    });
    // console.log(this.state.first_name);

    this.props.validateFirstname(this.state.first_name);
  };

  checkLastname = (e) => {
    this.setState({
      last_name: e.target.value,
    });
    // console.log(this.state.first_name);

    this.props.validateLastname(this.state.last_name);
  };

  checkPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
    // console.log(this.state.first_name);

    this.props.validatePassword(this.state.password);
  };

  confirmPassword = (e) => {
    const password = this.state.password;
    const password2 = this.state.password2;
    const password2Val = document.getElementById("password2").value;

    if (password2Val.length > 0) {
      if (password !== password2) {
        document.getElementById("password2Form").classList.add("invalid");
        document.getElementById("password2Form").classList.remove("valid");
      } else {
        document.getElementById("password2Form").classList.add("valid");
        document.getElementById("password2Form").classList.remove("invalid");
      }
    } else {
      document.getElementById("password2Form").classList.remove("invalid");
      document.getElementById("password2Form").classList.remove("valid");
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const { validates } = this.props;

    if (validates.email.error) {
      document.querySelector(".notify").innerHTML += `
            <h5>${validates.email.error}</h5>
          `;
      setTimeout(() => {
        document.querySelector(".notify").classList.add("showItem");
      }, 0);
      setTimeout(() => {
        document.querySelector(".notify").classList.remove("showItem");
      }, 4000);
    } else if (validates.email.email_valid) {
      document.querySelector(".notify").innerHTML += "";
    }

    if (validates.first_name.error) {
      document.querySelector(".notify").innerHTML += `
            <h5>${validates.first_name.error}</h5>
          `;
      setTimeout(() => {
        document.querySelector(".notify").classList.add("showItem");
      }, 0);
      setTimeout(() => {
        document.querySelector(".notify").classList.remove("showItem");
      }, 4000);
    } else if (validates.first_name.firstname_valid) {
      document.querySelector(".notify").innerHTML += "";
    }

    if (validates.last_name.error) {
      document.querySelector(".notify").innerHTML += `
              <h5>${validates.last_name.error}</h5>
            `;
      setTimeout(() => {
        document.querySelector(".notify").classList.add("showItem");
      }, 0);
      setTimeout(() => {
        document.querySelector(".notify").classList.remove("showItem");
      }, 4000);

      if (validates.password.error) {
        document.querySelector(".notify").innerHTML += `
                <h5>${validates.password.error}</h5>
              `;
        setTimeout(() => {
          document.querySelector(".notify").classList.add("showItem");
        }, 0);
        setTimeout(() => {
          document.querySelector(".notify").classList.remove("showItem");
        }, 4000);
      }
    }

    const { email, first_name, last_name, password, password2 } = this.state;
    console.log(this.state);

    const newUser = { email, first_name, last_name, password, password2 };
    this.props.register(newUser);
    this.setState({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
    });
  };

  render() {
    const { email, first_name, last_name, password, password2 } = this.state;

    if (this.props.auth.isAuthenticated && this.props.auth.token) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="sign-up">
        <div className="wrapper">
          <AuthAlerts />
          <div className="logo">
            <h1>DevsWorld</h1>
          </div>
          <form onSubmit={this.onSubmit} className="form">
            <div className="form-group" id="emailForm">
              <i className="fa fa-envelope-o"></i>
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                id="email"
                autoFocus="true"
                autoComplete="off"
                autoSave="off"
                value={email}
                onKeyUp={this.checkEmail}
                onChange={this.onChange}
              />
            </div>
            <div className="group-input">
              <div className="form-group" id="fNameForm">
                <div className="firstname">
                  <i className="fa fa-user-o"></i>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    id="first_name"
                    autoComplete="off"
                    autoSave="off"
                    value={first_name}
                    onKeyUp={this.checkFirstname}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group" id="lNameForm">
                <div className="lastname">
                  <i className="fa fa-user-o"></i>
                  <input
                    type="text"
                    placeholder="Last name"
                    name="last_name"
                    id="last_name"
                    autoComplete="off"
                    autoSave="off"
                    value={last_name}
                    onKeyUp={this.checkLastname}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group" id="passwordForm">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                autoComplete="off"
                autoSave="off"
                value={password}
                onKeyUp={this.checkPassword}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group" id="password2Form">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                autoSave="off"
                name="password2"
                id="password2"
                value={password2}
                onKeyUp={this.confirmPassword}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" id="registerBtn" className="btn btn-primary">
              Agree &amp; Join
            </button>
          </form>
          <div className="links">
            <Link to="/reset-password">
              <p>Forgot password? </p>
            </Link>
          </div>
          <div className="or">
            <hr className="bar" />
            <span>OR</span>
            <hr className="bar" />
          </div>
          <Link to="/login" className="btn btn-secondary">
            Log In
          </Link>
          <footer className="footer">
            <p>Copyright &copy; 2020, DevsWorld KE All Rights Reserved</p>
            <div>
              <Link to="#">Terms of Use</Link> |{" "}
              <Link to="#">Privacy Policy</Link>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  validates: state.validates,
});

export default connect(mapStateToProps, {
  register,
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
  confirmPassword,
})(Register);
