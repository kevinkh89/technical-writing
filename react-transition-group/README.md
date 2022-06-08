# Learn By Example:react-transition-group(with hooks)

## Introduction

`react-transition-group` is a powerfull library to make great transition effects.it is based on some set of steps that one can leverage to do any kind of transition effects or even animation.we will go through this library step by step and on each step we will learn different aspect of this library by building a fun project.
the library is consist of four components:

1. `Transition`
2. `CSSTransition`
3. `SwitchTransition`
4. `TransitionGroup`
   consider that the `Transition` componenet is the building block of other components.we take look at each one and talk about how we should use them.
   there are number of props that all of them share.the most important one is the `in` prop.the `in` prop is a boolean type that change the state.we'll talk about other props while writting an example.
   > important note:
   > all of the above component follow a simple rule.a transition is like a state machine consist of 6 phases:
   > enter ====> entering ====> entered ====> exit ===> exiting ====> extied
   > the `enter` and `entering` happens one after each other without any delay then there is a delay(timeout) and we reach the `entered` phase.now the user enteract with the page and the `in` prop changes then the component moves forward from `exti` to `exiting`,delay kicks in and finally componenet reaches the `exited` as the finall phase.
   > the transition happens if and only the transition effects declared between `enter` and `entering`, `exit` and `exiting`.for example we want to have a transition from `opacity:0` to `opacity:1`. the css would be:

```css
enter {
  opacity: 0;
}
entering {
  opacity: 1;
  transition: opacity 200ms ease;
}
entered {
  opacity: 1;
}
exit {
  opacity: 1;
}
exiting {
  opacity: 0;
  transition: opacity 200ms ease;
}
exited {
  opacity: 0;
}
```

notice we have declared the transition property on the `entering` and `exiting` phase.
the `entered` and `exited` could have any css property that we want to set after the transition is done.the don't necessarly need to have the same css property as the their previous phase.

## CSSTransition

we're going to make this `card` component with a rotation transition

(showcase the example)
start with a simple card component:

```jsx
// Card.js
import React, { forwardRef } from 'react';
import { Button } from '../Button';
import styles from './Card.module.css';
export const Card = forwardRef(
  ({ children, className = '', onAnswer, back, front, onClose }, ref) => {
    return (
      <div className={`${styles.cardWrapper} ${className}`} ref={ref}>
        <div className={styles.front}>
          {/* <div className={styles.btnWrapper}> */}
          <Button className={styles.leftBtn} onClick={onAnswer}>
            Answer
          </Button>
          {/* </div> */}
          <div className={styles.frontContent}>{front}</div>
        </div>
        <div className={styles.back}>
          <div className={styles.btnWrapper}>
            <Button className={styles.leftBtn} onClick={onClose}>
              close
            </Button>
          </div>
          <div className={styles.backContent}>{back}</div>
        </div>
      </div>
    );
  }
);
export default Card;
```

the `ref` is forwarded here because we need to provide a ref to our `CSSTransition` component.the `react-transition-group` uses the deprecated(in strict mode) `findDomNode` function and the react would warn you about it so it is much better to forward the ref and attach a ref prop to the component.we have used the `front` and `back` prop so we can provide anything such strings or components and the card will show on the specified side

and the css :

```css
/* Card.module.css */
.cardWrapper {
  background-color: lightsteelblue;
  height: 10rem;
  width: 10rem;
  border-radius: 5px;
  position: relative;
  transform-style: preserve-3d;
}
.front {
  height: 100%;
  color: #000000;
  position: relative;
}
.leftBtn {
  position: absolute;
  left: 0;
  top: 0;
}
.back {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  transform: rotateY(180deg);
  background-color: lightcoral;
}
.front,
.back {
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

the back of the card is rotated `180deg` and we set `backface-visibility: hidden` on both `back` and `front`.this property along side the ``transform-style:preseve-3d` is essential for the 3d effect.

the button component:

```jsx
//Button.js
import styles from './Button.module.css';
export function Button({ children, onClick, className }) {
  return (
    <button className={`${styles.btn} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

css:

```css
/*  Button.module.css  */
.btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: transparent;
  border: none;
  border-radius: 100px;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
```

now the transition part:

```jsx
import { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Card } from './Card';
import {
  enter,
  enterActive,
  enterDone,
  exit,
  exitActive,
  exitDone,
} from './Rotate.module.css';
export default function App() {
  const [isRotate, setIsRotate] = useState(false);
  const cardRef = useRef();
  const handleAnswer = () => {
    setIsRotate(!isRotate);
  };

  return (
    <div className='App'>
      <CSSTransition
        in={isRotate}
        timeout={500}
        classNames={{
          enter,
          enterActive,
          enterDone,
          exit,
          exitActive,
          exitDone,
        }}
        nodeRef={cardRef}>
        <Card
          onAnswer={handleAnswer}
          onClose={handleAnswer}
          back={'a frontend library'}
          front={'what is react?'}
          ref={cardRef}
        />
      </CSSTransition>
    </div>
  );
}
```

the `timeout` should match with the transition timing of the classes you have provided.we can specify a name(string) or an object on the classNames property.if a string is set, the `CSSTransition` would attach the corresponding classes to the `Card` compopent or we can use an object and specifieing each individual classes like what we did.
