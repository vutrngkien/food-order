import { useReducer } from "react";
import CartContext from "./cart-context";

const cartInitState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      let updateItems;
      // check xem item da co trong state hay chua
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingItem = state.items[existingItemIndex];
      if (existingItem) {
        const updateItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };

        updateItems = [...state.items];
        updateItems[existingItemIndex] = updateItem;
      } else {
        updateItems = [...state.items, action.item];
      }
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return { items: updateItems, totalAmount: updateTotalAmount };

    case "REMOVE":
      // lay index cua item
      const itemIndex = state.items.findIndex((item) => item.id === action.id);
      const item = state.items[itemIndex];

      const newAmount = state.totalAmount - item.price;

      let newItems;
      if (item.amount === 1) {
        newItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const newItem = { ...item, amount: item.amount - 1 };
        newItems = [...state.items];
        newItems[itemIndex] = newItem;
      }
      return { items: newItems, totalAmount: newAmount };
    case "CLEAR":
      return cartInitState;
    default:
      throw new Error("Invalid action!");
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    cartInitState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
