import React from "react";
import spinner from "../img/spinner.gif";

function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ margin: "10px auto", width: "70px", display: "block" }}
      />
    </div>
  );
}

export default Spinner;
