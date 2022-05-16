import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Card = (props) => {
  const [isOrder, setIsOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderClickHandler = () => {
    setIsOrder(true);
  };

  const submitHandler = async (user) => {
    setIsSubmitting(true);
    await fetch(
      "https://foode-order-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      { method: "POST", body: JSON.stringify({ user, cart: cartCtx.items }) }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={() => cartItemAddHandler(item)}
          onRemove={() => cartItemRemoveHandler(item.id)}
        />
      ))}
    </ul>
  );

  const modalButton = (
    <div className={styles.actions}>
      <button onClick={props.onHideCart} className={styles["button--alt"]}>
        close
      </button>
      {hasItems && (
        <button onClick={orderClickHandler} className={styles.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartOrder = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>

      {isOrder && (
        <Checkout onConfirm={submitHandler} onCancel={props.onHideCart} />
      )}
      {!isOrder && modalButton}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClick={props.onHideCart}>
      {" "}
      {!isSubmitting && !didSubmit && cartOrder}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Card;
