import React, { Component } from "react";
import { connect } from "react-redux";

export class AuthAlerts extends Component {
  componentDidUpdate(prevProps) {
    const { validates } = this.props;
    const emailForm = document.getElementById("emailForm");
    const emailVal = document.getElementById("email").value;
    const fNameForm = document.getElementById("fNameForm");
    const firstnameVal = document.getElementById("first_name").value;
    const lNameForm = document.getElementById("lNameForm");
    const lastnameVal = document.getElementById("last_name").value;
    const passwordForm = document.getElementById("passwordForm");
    const passwordVal = document.getElementById("password").value;
    const signupBtn = document.getElementById("registerBtn");

    // email
    if (emailVal.length > 3) {
      if (validates.email.error) {
        emailForm.classList.add("invalid");
        emailForm.classList.remove("valid");
      } else if (validates.email.email_valid === true) {
        emailForm.classList.add("valid");
        emailForm.classList.remove("invalid");
      }
    } else {
      emailForm.classList.remove("valid");
      emailForm.classList.remove("invalid");
    }

    //first_name
    if (firstnameVal.length > 0) {
      if (validates.first_name.error) {
        fNameForm.classList.add("invalid");
        fNameForm.classList.remove("valid");
      } else if (validates.first_name.firstname_valid === true) {
        fNameForm.classList.add("valid");
        fNameForm.classList.remove("invalid");
      }
    } else {
      fNameForm.classList.remove("valid");
      fNameForm.classList.remove("invalid");
    }

    //last_name
    if (lastnameVal.length > 0) {
      if (validates.last_name.error) {
        signupBtn.classList.add("disabled");
        lNameForm.classList.add("invalid");
        lNameForm.classList.remove("valid");
      } else if (validates.last_name.lastname_valid === true) {
        lNameForm.classList.add("valid");
        lNameForm.classList.remove("invalid");
      }
    } else {
      lNameForm.classList.remove("valid");
      lNameForm.classList.remove("invalid");
    }

    //password
    if (passwordVal.length > 0) {
      if (validates.password.password_error) {
        passwordForm.classList.add("invalid");
        passwordForm.classList.remove("valid");
      } else if (validates.password.password_valid === true) {
        passwordForm.classList.add("valid");
        passwordForm.classList.remove("invalid");
      }
    } else {
      passwordForm.classList.remove("invalid");
      passwordForm.classList.remove("valid");
    }
  }

  render() {
    return <div className="notify"></div>;
  }
}

const mapStateToProps = (state) => ({
  validates: state.validates,
});

export default connect(mapStateToProps)(AuthAlerts);
