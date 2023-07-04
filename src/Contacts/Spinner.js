import React from "react";
import spinnerImg from "../assets/SpinnerImg/img.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinnerImg}
        alt="Spinner"
        className="d-block m-auto"
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default Spinner;
