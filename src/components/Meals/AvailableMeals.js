import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    (async function FetchData() {
      const res = await fetch(
        "https://react-http-ad4b3-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json/"
      );
      const data = await res.json();

      let reFactoryData = [];

      for (const key of Object.keys(data)) {
        data[key].id = key;
        reFactoryData.push(data[key]);
      }
      setMeals(reFactoryData);
    })();
  }, []);

  const mealsList = meals.map((meal, i) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
