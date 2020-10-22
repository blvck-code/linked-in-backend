import React from "react";
import { Link } from "react-router-dom";

function ErrorPage(props) {
  console.log(props);

  return (
    <div className="error_page">
      <div className="error_nav">
        <h1>DevsWorld KE</h1>
        <select>
          <option>English (English)</option>
        </select>
      </div>
      <div className="error_body">
        <h1>Page not found</h1>
        <p>
          Uh ho, we can't seem to find the page that you are looking for{" "}
          <strong>"{props.location.pathname}"</strong>.
          <br />
          Try going back to the previous page or <br />
          <Link to="/">Home Page</Link>.
        </p>
        <Link to="/dashboard">
          <button className="btn btn-dark">Go to your feed</button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
