import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const amountItem = inputRef.current.value * 1;

    if (typeof amountItem !== "number" || amountItem < 1 || amountItem > 5) {
      setIsAmountValid(false);
      return;
    }
    props.onAddToCart(amountItem);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!isAmountValid && <p>Please check your enter amount!</p>}
    </form>
  );
};

export default MealItemForm;
