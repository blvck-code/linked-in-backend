import React, { Component } from "react";
import { connect } from "react-redux";

export class Alerts extends Component {
  state = {
    msg: "",
    status: null,
  };
  componentDidUpdate(prevProps) {
    const { error, message, auth } = this.props;

    if (auth !== prevProps.auth) {
      if (auth.user !== null) {
        if (
          auth.user.non_field_errors !== "" ||
          auth.user.non_field_errors !== null
        ) {
          this.setState({
            msg: "Invalid login",
            status: 404,
          });
          setTimeout(() => {
            document.querySelector(".alert").classList.add("showItem");
          }, 0);
          setTimeout(() => {
            document.querySelector(".alert").classList.remove("showItem");
          }, 4000);
        }

        // if (auth.user.email !== "" || auth.user.password !== null) {
        //   this.setState({
        //     msg: "Provide all the credentials.",
        //     status: 404,
        //   });
        //   setTimeout(() => {
        //     document.querySelector(".alert").classList.add("showItem");
        //   }, 0);
        //   setTimeout(() => {
        //     document.querySelector(".alert").classList.remove("showItem");
        //   }, 4000);
        // }
      }
    }

    if (error !== prevProps.error) {
      // pages
      if (error.msg.detail) {
        this.setState({
          msg: error.msg.detail,
          status: 404,
        });
      }
      // posts
      if (error.msg.body) {
        this.setState({
          msg: `Your submission did not succeed. Please try again.`,
        });
      }
      if (error.msg.image) {
        this.setState({
          // msg: `Image: ${error.msg.image.join()}`,
          msg: `Your submission did not succeed. Please try again.`,
        });
      }

      // experience
      if (error.msg.job || error.msg.start) {
        this.setState({
          // msg: `Image: ${error.msg.image.join()}`,
          msg: `Your submission did not succeed. Please try again.`,
        });
      }
      this.setState({
        status: error.status,
      });
      setTimeout(() => {
        document.querySelector(".alert").classList.add("showItem");
      }, 0);
      setTimeout(() => {
        document.querySelector(".alert").classList.remove("showItem");
      }, 4000);
    }

    if (message !== prevProps.message) {
      //post
      if (message.postAdded) {
        this.setState({
          msg: message.postAdded,
          status: 200,
        });
      }

      // experience
      if (message.expeAdded) {
        this.setState({
          msg: message.expeAdded,
          status: 200,
        });
      }

      // education
      if (message.eduAdded) {
        this.setState({
          msg: message.eduAdded,
          status: 200,
        });
      }

      //profile
      if (message.profileUpdated) {
        this.setState({
          msg: message.profileUpdated,
          status: 200,
        });
      }

      // contact
      if (message.contactAdded) {
        this.setState({
          msg: message.contactAdded,
          status: 200,
        });
      }

      setTimeout(() => {
        document.querySelector(".alert").classList.add("showItem");
      }, 0);
      setTimeout(() => {
        document.querySelector(".alert").classList.remove("showItem");
      }, 4000);
    }

    // if (user !== prevProps.user) {
    //   if (user.non_field_errors) {
    //     this.setState({
    //       msg: user.non_field_errors,
    //     });
    //   }
    // }
  }

  render() {
    const { msg, status } = this.state;

    return (
      <div className="alert">
        <div>
          {status === 200 ? (
            <>
              <i className="fa fa-check"></i>
            </>
          ) : (
            <>
              <i className="fa fa-exclamation-circle"></i>
            </>
          )}{" "}
        </div>
        <h5>{msg}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
  user: state.auth.user,
  auth: state.auth,
});

export default connect(mapStateToProps)(Alerts);
