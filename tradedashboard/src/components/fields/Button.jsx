import React, { useEffect } from "react";

const Button = (props) => {
  const { textBtn, style, handleClick } = props;
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <button onClick={handleClick} className={`${style}`}>
        {textBtn}
      </button>
    </>
  );
};

export default Button;
