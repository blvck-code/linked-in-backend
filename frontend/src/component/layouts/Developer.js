import React, { Component } from "react";
import Navbar from "../layouts/Navbar";
import { connect } from "react-redux";
import user from "../img/default.png";
import { developer } from "../../actions/profiles";
import { Link } from "react-router-dom";
import Alerts from "./Alerts";

export class Developer extends Component {
  componentDidMount() {
    this.props.developer(this.props.location.pathname);
  }
  render() {
    const { dev } = this.props;
    return (
      <>
        <Navbar />
        <Alerts />
        <div className="container developer">
          <Link to="/developers">
            <button className="btn btn-dark">Back To Profiles</button>
          </Link>
          <div className="dev-info">
            <div className="dp">
              {dev.profile_pic ? (
                <>
                  <img src={dev.profile_pic} alt="ProfilePic" />
                </>
              ) : (
                <>
                  <img src={user} alt="ProfilePic" />
                </>
              )}
            </div>
            <div className="details">
              <h1>
                {dev.first_name} {dev.last_name}
              </h1>
              <h2>{dev.profession}</h2>
              {dev.location ? (
                <h4>
                  {dev.location}, {dev.country}
                </h4>
              ) : (
                ""
              )}

              <div className="icons">
                <i className="fa fa-globe"></i>
                <i className="fa fa-github"></i>
                <i className="fa fa-twitter"></i>
                <i className="fa fa-facebook"></i>
              </div>
            </div>
          </div>
          {dev.headline ? (
            <div className="dev-about">
              <>
                <div className="title">
                  <h2>{dev.first_name}'s Bio</h2>
                  <p>{dev.headline}</p>
                </div>
              </>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  dev: state.profiles.developer,
});

export default connect(mapStateToProps, { developer })(Developer);
