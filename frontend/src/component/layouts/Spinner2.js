import React from "react";
import spinner from "../img/spinner.gif";

function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ margin: "200px auto", width: "50px", display: "block" }}
      />
    </div>
  );
}

export default Spinner;
