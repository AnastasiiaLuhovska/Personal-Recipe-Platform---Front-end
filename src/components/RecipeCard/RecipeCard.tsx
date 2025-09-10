import type { Recipe } from "../../types/types";
import styles from "./RecipeCard.module.css";

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
    return (
        <div className={styles.card}>
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
        </div>
    );
};

export default RecipeCard;