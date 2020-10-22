import React, { Component } from "react";
import { connect } from "react-redux";
import { myProfile } from "../../actions/profiles";
import PropTypes from "prop-types";
import person from "../img/default.png";
import showcase from "../img/showcase.jpg";
import Spinner from "./Spinner";

export class HomeProfile extends Component {
  static propTypes = {
    profile: PropTypes.object,
  };

  openModal = (id) => {
    document.getElementById(id).style.display = "block";
  };

  render() {
    const { profile } = this.props;
    if (profile === null || profile === undefined) {
      this.props.myProfile();
    }
    return (
      <>
        <div className="home-profile">
          <div className="bg_img">
            {profile ? (
              <>
                {profile.bg_pic ? (
                  <img src={profile.bg_pic} />
                ) : (
                  <img src={showcase} />
                )}
              </>
            ) : (
              <>
                <Spinner />
                {this.props.myProfile()}
                <img src={showcase} />
              </>
            )}
          </div>
          <div className="profile_img">
            {!profile ? (
              <>
                <Spinner />
                {this.props.myProfile()}
                <img src={person} />
              </>
            ) : (
              <>
                {profile.profile_pic ? (
                  <img src={profile.profile_pic} />
                ) : (
                  <img src={person} />
                )}
              </>
            )}
          </div>
          <div className="username">
            {profile ? (
              <>
                {profile.first_name ? (
                  <h4>
                    {profile.first_name} {profile.last_name}
                  </h4>
                ) : (
                  <>
                    {this.props.myProfile()}
                    <Spinner />
                  </>
                )}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="headline">
            {profile ? <p>{profile.headline}</p> : ""}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profiles.myProfile,
});

export default connect(mapStateToProps, { myProfile })(HomeProfile);
