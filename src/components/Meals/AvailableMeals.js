import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function FetchData() {
      const res = await fetch(
        "https://foode-order-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json/"
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();

      let reFactoryData = [];

      for (const key of Object.keys(data)) {
        data[key].id = key;
        reFactoryData.push(data[key]);
      }

      setMeals(reFactoryData);
      setIsLoading(false);
    }

    FetchData().catch((err) => {
      console.log(err);
      setIsLoading(false);
      setIsError(err.message);
    });
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

  if (isError) {
    return (
      <section className={styles.meals}>
        <Card>
          <h2>{isError}</h2>
        </Card>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={styles.meals}>
        <Card>
          <Loading />
        </Card>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
