import React, { Component } from "react";
import Navbar from "../layouts/Navbar";
import CreatePost from "../layouts/CreatePost";
import HomeProfile from "../layouts/HomeProfile";
import Posts from "../layouts/Posts";
import EditProfile from "../layouts/EditProfile";
import Alert from "../layouts/Alerts";

export class Dashboard extends Component {
  clickOutside = (e) => {
    if (e.target === document.getElementById("profileModal")) {
      document.getElementById("profileModal").style.display = "none";
    }
  };

  render() {
    window.addEventListener("click", this.clickOutside);

    return (
      <>
        <Navbar />
        <>
          <Alert />
        </>
        <section className="container main">
          <EditProfile />
          <div className="profile">
            <div className="card">
              <HomeProfile />
            </div>
          </div>
          <div className="posts">
            <CreatePost />
            <div className="underline" />
            <Posts />
          </div>
          <div className="updates">
            <div className="card">
              <h1>Updates</h1>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Dashboard;
