import { useState } from "react";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [isShowCart, setIsShowCart] = useState(false);
  const showCart = () => {
    setIsShowCart(true);
  };
  const hideCart = () => {
    setIsShowCart(false);
  };
  return (
    <CartProvider>
      {isShowCart && <Cart onHideCart={hideCart} />}
      <Header onShowCart={showCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
