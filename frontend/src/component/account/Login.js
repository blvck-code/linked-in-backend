import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alerts from "../layouts/Alerts";

export class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);

    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    const { email, password } = this.state;

    const { auth } = this.props;

    if (auth.isAuthenticated && auth.token) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="sign-in">
        <Alerts />
        <div className="left">
          <div className="logo">
            <h1>DevsWorld</h1>
          </div>
          <form onSubmit={this.onSubmit} className="form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                autoComplete="off"
                name="email"
                value={email}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.onChange}
              />
            </div>
            <button className="btn btn-primary">Sign In</button>
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
          <Link to="/register" className="btn btn-secondary">
            Create an account
          </Link>
          <footer className="footer">
            <p>Copyright &copy; 2020, DevsWorld KE All Rights Reserved</p>
            <div>
              <Link to="#">Terms of Use</Link> |{" "}
              <Link to="#">Privacy Policy</Link>
            </div>
          </footer>
          <div className="errors"></div>
        </div>
        <div className="right wrapper">
          <div className="overlay">
            <div className="showcase-content">
              <h1 className="showcase-text">
                Let's have fun <strong>together</strong>
              </h1>

              <Link to="/register" className="btn btn-secondary">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
