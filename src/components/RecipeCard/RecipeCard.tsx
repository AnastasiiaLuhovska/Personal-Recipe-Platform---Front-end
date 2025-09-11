import type { RecipeWithId} from "../../types/types";
import styles from "./RecipeCard.module.css";
import {Link} from "react-router";

interface RecipeCardProps {
    recipe: RecipeWithId;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
    return (
        <Link to={`/catalog/${recipe._id}`} className={styles.card}>
            <h3 className={styles.title}>{recipe.name}</h3>
            <p className={styles.description}>{recipe.description}</p>
            <div className={styles.info}>
                <div className={styles.time}>
                    <span className={styles.icon}>⏱️</span>
                    <span>{recipe.cookTime} min</span>
                </div>
                <div className={styles.servings}>
                    <span className={styles.icon}>🍽️</span>
                    <span>{recipe.servings} portions</span>
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;