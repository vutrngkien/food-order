import { useEffect, useState, useContext } from "react";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const carCtx = useContext(CartContext);
  const [bump, setBump] = useState(false);

  const numberOfCartItem = carCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  useEffect(() => {
    if (carCtx.items.length === 0) return;

    setBump(true);
    const timer = setTimeout(() => {
      setBump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [carCtx.items]);

  const btnClasses = `${styles.button} ${bump ? styles.bump : ""}`;

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
