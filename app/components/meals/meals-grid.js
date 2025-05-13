import classes from './meals-grid.module.css'
import MealItem from './meal-item'
export default function MealsGird({meals}){
    return (
        <ul className={classes.meals}>
            {meals.map(meal =><li key={meal.id}>
                <MealItem {...meal}/>
            </li>)}
        </ul>
    )
}