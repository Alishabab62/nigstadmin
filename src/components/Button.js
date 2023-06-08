import React, { useState } from 'react';

const BouncyButton = ({fun,value}) => {
  const [isClicked, setIsClicked] = useState(false);

  // const handleClick = () => {
  //   setIsClicked(true);
  //   setTimeout(() => {
  //     setIsClicked(false);
  //   }, 300);
  //   fun();
  // };

  const buttonStyle = {
    animationName: 'bounce',
    animationDuration: '1s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    color: isClicked ? '#ffcb00' : 'white', // Updated text color
  };

  return (
    <>
      <button
        onClick={fun}
        className={`pt-3 pb-3 pl-10 pr-10 bg-[rgb(27,48,88)] text-white rounded-md ${isClicked ? 'bounce' : ''}`}
        style={buttonStyle}
      >
        {value}
      </button>
    </>
  );
};

export default BouncyButton;
