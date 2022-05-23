import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useReducer,
} from 'react';
import { classes } from '../helper';
import styles from './Collapse.module.css';
import { useStore } from './store';
export default function Collapse({
  children,
  unmountOnExit,
  timeout,
  timingFunction,
  ...props
}) {
  const wrapper = useRef();
  const CollapseRoot = useRef();
  const { state, dispatch } = useStore(props.in);
  const getWrapperHeight = useCallback(() => {
    let height = wrapper.current.clientHeight;
    // console.log(props.in);
    return height;
  }, [wrapper.current]);
  const handleTransitionEnd = e => {
    if (props.in) {
      console.log('end');
      CollapseRoot.current.style.height = 'auto';
    }
  };

  return (
    <div
      // className={classes(styles.CollapseRoot)}
      style={{
        transition: `all ${timingFunction} ${timeout}ms`,
        overflowY: 'hidden',
        height: state.height,
      }}
      onTransitionEnd={handleTransitionEnd}
      ref={CollapseRoot}
      className={styles.CollapseRoot}
    >
      <div ref={wrapper} className={styles.CollapseWrapper}>
        <div className={styles.CollapseWrapperInner}>{children}</div>
      </div>
    </div>
  );
}
