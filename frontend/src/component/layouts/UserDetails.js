import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactInfo from "./ContactInfo";
import EditProfile from "./EditProfile";
import img from "../img/showcase.jpg";
import person from "../img/default.png";

export class UserDetails extends Component {
  static propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object,
  };

  openModal = (id) => {
    // this.resetState();
    document.getElementById(id).style.display = "block";
  };

  clickOutside = (e) => {
    if (e.target === document.getElementById("profileModal")) {
      document.getElementById("profileModal").style.display = "none";
    }
  };

  render() {
    const { user, profile } = this.props;
    window.addEventListener("click", this.clickOutside);

    return (
      <section className="profile-inner">
        <EditProfile />
        <div className="modal" id="contactModal">
          <ContactInfo />
        </div>

        <div className="user-info">
          <div className="bg">
            {profile ? <img src={profile.bg_pic} /> : <img src={img} />}
          </div>
          <div className="access">
            <div className="edit-dp">
              <div className="dp">
                {profile ? (
                  <img src={profile.profile_pic} />
                ) : (
                  <img src={person} />
                )}
                {/* <img src={person} /> */}
              </div>
            </div>
            <div className="edit-profile">
              <p onClick={() => this.openModal("profileModal")}>
                <i className="fa fa-pencil"></i> Edit profile
              </p>
            </div>
          </div>
          <div className="wrapper">
            <div className="user-details">
              {user ? (
                <h4>
                  {user.first_name} {user.last_name}
                </h4>
              ) : (
                ""
              )}
              {profile ? <p>{profile.bio}</p> : ""}
              <div className="footer">
                {/* {profile ? <p>{profile.location}</p> : ""} */}
                <p onClick={() => this.openModal("contactModal")}>
                  Contact info
                </p>
              </div>
            </div>
            <div className="profile-details">
              {profile ? (
                <p>
                  <i className="fa fa-black-tie"></i>
                  {profile.profession}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <footer></footer>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profiles.myProfile,
});

export default connect(mapStateToProps)(UserDetails);
