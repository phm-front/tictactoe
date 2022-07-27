import React, {memo} from "react";

const Square = memo((props) => {
  const { value, clickEvent } = props
  return (
    <button className="square" onClick={ clickEvent }>{ value }</button>
  );
});

export default Square;
