import { useReducer, useRef } from 'react';
const modes = ['expand', 'expanding', 'expanded', 'shrink', 'shrinking', 'shrinked'];
const initial = {
  mode: null,
  height: null,
};

export function useStore(inProp) {
  const [state, dispatch] = useReducer(reducer, initial);
  const firstMount = useRef(true);
  if (!inProp) {
    dispatch({
      mode: !state.mode ? 'shrinked' : '',
      height: state.height ? '0' : '',
    });
  }
  if (inProp) {
    dispatch({
      mode: !state.mode ? (inProp ? 'expanded' : 'shrinked') : '',
      height: state.height ? '0' : '',
    });
  }
  return { state, dispatch };
}

function reducer(state, actions) {
  console.log(actions);
}
