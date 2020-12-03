import React from "react";

const Question = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px dashed red",
        marginBlock: "1em",
        padding: "1em",
      }}
    >
      <div style={{}}>
        <h5 style={{ margin: "0" }}>{props.question}</h5>
        <div>{props.author}</div>
      </div>

      {/* <button>Upvote</button> */}
    </div>
  );
};

export default Question;
