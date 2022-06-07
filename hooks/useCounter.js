import { useState } from "react";

const useCounter = (start = 1) => {
  const [state, setState] = useState(start);

  const increment = ( value = 1, max = 10 ) => {

    if ( state >= max ) return;
    setState(state + value);
  };
  const decrement = ( value = 1, min = 1 ) => {
    if(state<= min) return;
    setState(state - value);
  };

  return { increment, state, setState, decrement };
};

export default useCounter;
