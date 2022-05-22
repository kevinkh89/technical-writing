import React, { useState } from 'react';
import Collapse from './Collapse';
import styles from './App.module.css';
export default function App() {
  return (
    <div className={styles.App}>
      {[1, 2, 3].map(item => {
        return (
          <CollapseItem key={item}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque laudantium
              recusandae beatae minus tempore nihil rem accusantium aperiam ratione.
              Consequuntur maiores dolor natus enim itaque incidunt, beatae possimus totam
              dolores.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque laudantium
              recusandae beatae minus tempore nihil rem accusantium aperiam ratione.
              Consequuntur maiores dolor natus enim itaque incidunt, beatae possimus totam
              dolores.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque laudantium
              recusandae beatae minus tempore nihil rem accusantium aperiam ratione.
              Consequuntur maiores dolor natus enim itaque incidunt, beatae possimus totam
              dolores.
            </p>
          </CollapseItem>
        );
      })}
    </div>
  );
}
function CollapseItem({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.btn}
        onClick={() => {
          setOpen(!open);
        }}
      >
        click me
      </button>
      <Collapse in={open} timeout={1000} timingFunction={'ease-in-out'}>
        {children}
      </Collapse>
    </>
  );
}
