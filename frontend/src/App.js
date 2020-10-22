import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./component/css/main.css";
import { connect } from "react-redux";
import { getUser } from "./actions/auth";
import { myProfile } from "./actions/profiles";
import PropTypes from "prop-types";

import Login from "./component/account/Login";
import Register from "./component/account/Register";
import ResetPass from "./component/account/ResetPass";
import PrivateRoute from "./component/common/PrivateRoute";
import Dashboard from "./component/pages/Dashboard";
import HomePage from "./component/pages/HomePage";
import Developers from "./component/pages/Developers";
import Developer from "./component/layouts/Developer";
import Profile from "./component/pages/Profile";
import ErrorPage from "./component/pages/ErrorPage";
import "./component/fontawesome/css/font-awesome.min.css";

export class App extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getUser();
    this.props.myProfile();
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/developers" component={Developers} />
            <Route exact path="/developers/:slug" component={Developer} />
            <Route exact path="/reset-password" component={ResetPass} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(null, { getUser, myProfile })(App);
