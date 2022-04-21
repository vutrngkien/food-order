import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";

const MealItem = ({ id, name, price, description }) => {
  const cartCtx = useContext(CartContext);
  const newPrice = `$${price.toFixed(2)}`;
  const addAmountCartHandler = (amount) => {
    const newItem = {
      id,
      name,
      price,
      amount,
    };
    cartCtx.addItem(newItem);
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.price}>{newPrice}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addAmountCartHandler} id={id} />
      </div>
    </li>
  );
};

export default MealItem;
