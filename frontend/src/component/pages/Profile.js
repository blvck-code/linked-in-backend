import React, { Component } from "react";
import Navbar from "../layouts/Navbar";
import Experience from "../layouts/Experience";
import Education from "../layouts/Education";
import UserDetails from "../layouts/UserDetails";
import Alert from "../layouts/Alerts";
import { connect } from "react-redux";
import { myProfile } from "../../actions/profiles";
import { myContact } from "../../actions/contact";

export class Profile extends Component {
  componentDidMount() {
    this.props.myProfile();
    this.props.myContact();
  }
  render() {
    return (
      <>
        <Navbar />
        <Alert />
        <div className="profile-page">
          <div>
            <UserDetails />
            <Experience />
            <Education />
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { myProfile, myContact })(Profile);
