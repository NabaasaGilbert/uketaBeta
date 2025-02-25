import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function CustomSpinner() {
  return (
    <div className="d-flex p-1">      
      <ScaleLoader
        color={"#000000"}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
