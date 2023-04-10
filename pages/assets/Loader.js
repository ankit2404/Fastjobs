import React from "react";
// import spinner from "../assets/spinner.gif";
const Loader = () => {
  return (
    <div style={{ width: "100%" }}>
      <img
        width={180}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "20%",
        }}
        className="text-center mx-auto"
        src="https://i.gifer.com/ZZ5H.gif"
        alt="Loading..."
      />
    </div>
  );
};

export default Loader;
