import React, { useCallback, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { classes } from '../helper';
import styles from './Collapse.module.css';
export default function Collapse({
  children,
  unmountOnExit,
  timeout,
  timingFunction,
  ...props
}) {
  const wrapper = useRef();
  const wrapperHeight = useRef();
  const CollapseRoot = useRef();
  const id = useRef();
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
  const handleTransitionStart = e => {
    // console.log('start');
    // if (props.in) {
    //   console.log('in');
    //   // CollapseRoot.current.style.height = getWrapperHeight();
    // }
  };
  // let height = useCallback(() => {
  //   if (props.in) {
  //     // CollapseRoot.current.style.height = `${getWrapperHeight()}px`;
  //     return `${wrapper.current.clientHeight}px`;
  //   } else if (CollapseRoot.current?.style.height === 'auto') {
  //     // CollapseRoot.current.style.height = `${wrapper.current.clientHeight}px`;
  //     setTimeout(() => {
  //       CollapseRoot.current.style.height = 0;
  //     }, timeout);
  //     return `${wrapper.current.clientHeight}px`;
  //   } else if (!props.in) {
  //     // CollapseRoot.current.style.height = `0`;
  //     return 0;
  //   }
  // }, [props.in]);
  // useEffect(() => {
  //   // CollapseRoot.current.addEventListener('transitionstart', handleTransitionStart);
  //   // CollapseRoot.current.style.transition = `all ${timingFunction} ${timeout}ms`;
  //   // CollapseRoot.current.style['overflow-y'] = `hidden`;
  //   let id;
  //   if (props.in) {
  //     console.log('first');
  //     CollapseRoot.current.style.height = `${wrapper.current.clientHeight}px`;
  //   } else if (CollapseRoot.current?.style.height === '') {
  //     console.log('second');
  //     // CollapseRoot.current.style.height = `${wrapper.current.clientHeight}px`;
  //     // id = setTimeout(() => {
  //     CollapseRoot.current.style.height = `0`;
  //     // }, timeout);
  //   } else if (!props.in) {
  //     CollapseRoot.current.style.height = `0`;
  //   }
  //   return () => clearTimeout(id);
  // }, [props.in]);
  useMemo(() => {
    let id;
    if (props.in) {
      // console.log('first');
      CollapseRoot.current.style.height = `${wrapper.current.clientHeight}px`;
    } else if (CollapseRoot.current?.style.height === 'auto') {
      // console.log('second', `${wrapper.current.clientHeight}px`);
      // console.log('second', CollapseRoot.current.style.height);
      CollapseRoot.current.style.height = `${wrapper.current.clientHeight}px`;
      // console.log('second', CollapseRoot.current.style.height);

      id = setTimeout(() => {
        console.log('timeout');
        CollapseRoot.current.style.height = `0`;
      }, timeout);
      return;
    } else if (!props.in && CollapseRoot.current) {
      console.log('zero');
      CollapseRoot.current.style.height = `0`;
    }
  }, [props.in]);
  useEffect(() => {
    // console.log(first)
    console.log(CollapseRoot.current?.style.height);
  });
  return (
    <div
      // className={classes(styles.CollapseRoot)}
      style={{
        transition: `all ${timingFunction} ${timeout}ms`,
        overflowY: 'hidden',
        // height: 0,
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
