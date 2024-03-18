import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  }); //represents the width and height of the browser window

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }; //function to update the windowSize state according to the current width and height of the browser window

    handleResize(); //call the handleResize function to set the initial width and height of the browser window

    //now to continue the adjustment of the windowSize state,
    //we need to add an event listener to the window object to listen for the resize event
    window.addEventListener("resize", handleResize);

    //clean up the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;
