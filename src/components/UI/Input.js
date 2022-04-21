import styles from "./Input.module.css";
import React from "react";

const MealItemForm = (props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
};

export default React.forwardRef(MealItemForm);