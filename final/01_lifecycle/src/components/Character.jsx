import React from "react";

const Character = (props) => {
  return (
    <div>
      <img src={props.image} alt={props.name} />
    </div>
  );
};

export default Character;
