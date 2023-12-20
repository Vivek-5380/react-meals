import classes from "./AvailableMeal.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";


const AvailableMeal = () => {

    const [meals , setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error , setError] = useState();

    useEffect(()=>{
        const fetchMeals = async() => {
            const response = await fetch("https://foodapp-9693-default-rtdb.asia-southeast1.firebasedatabase.app/food/meals.json");
            
            if(!response.ok){
                throw new Error("An Error Occured!");
            }

            const responseData = await response.json();
            const loadedMeals = [];

            for(const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }


            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(e => {
            setIsLoading(false);
            setError(e.message);
        });   
        
    }, []);

    if(isLoading){
        return <section className={classes.MealsLoading}>
            <p>
                Loading.....
            </p>
        </section>
    }

    if(error){
        return <section className={classes.MealsError}>
            <p>
                {error}
            </p>
        </section>
    }


    const mealsList = meals.map((meal) => (
    <MealItem 
        key={meal.id}
        id={meal.id}
        name={meal.name} 
        description={meal.description} 
        price={meal.price} 
    />
    ));
    
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>

    </section>
};

export default AvailableMeal;