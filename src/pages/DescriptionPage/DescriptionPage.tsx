import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getRecipeById} from "../../redux/recipes/operations.ts";
import {useParams} from "react-router";
import type {AppDispatch, RootState} from "../../redux/store.ts";
import styles from './DescriptionPage.module.css';
import Loader from "../../components/Loader/Loader.tsx";

const DescriptionPage = () => {
    const {recipeId} = useParams()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        recipeId && dispatch(getRecipeById(recipeId))
    }, [dispatch, recipeId])

    const {recipe, isLoading, error} = useSelector((state: RootState) => state.recipes)

    if (isLoading) {
        return (
            <div className={styles.loadingWrapper}>
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.pageWrapper}>
                <div className="container">
                    <div className={styles.errorMessage}>
                        Error loading recipe: {error}
                    </div>
                </div>
            </div>
        )
    }

    if (!recipe || !recipe.name) {
        return (
            <div className={styles.pageWrapper}>
                <div className="container">
                    <div className={styles.errorMessage}>
                        Recipe not found
                    </div>
                </div>
            </div>
        )
    }

    const getDifficultyClass = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return styles.difficultyEasy;
            case 'hard':
                return styles.difficultyHard;
            default:
                return styles.difficultyMedium;
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <div className="container">
                <div className={styles.recipeContainer}>
                    <div className={styles.recipeHeader}>
                        <h1 className={styles.recipeTitle}>{recipe.name}</h1>
                        <p className={styles.recipeDescription}>{recipe.description}</p>
                        <div className={styles.recipeInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>⏱️</span>
                                <span>{recipe.cookTime} minutes</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>🍽️</span>
                                <span>{recipe.servings} servings</span>
                            </div>
                        </div>
                        <div className={`${styles.difficultyBadge} ${getDifficultyClass(recipe.difficulty)}`}>
                            <span>🎯</span>
                            <span>{recipe.difficulty}</span>
                        </div>
                    </div>
                    
                    <div className={styles.recipeContent}>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🛒</span>
                                Ingredients
                            </h2>
                            <ul className={styles.ingredientsList}>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className={styles.ingredientItem}>
                                        <span className={styles.checkIcon}>✓</span>
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>📋</span>
                                Instructions
                            </h2>
                            <p className={styles.instructions}>{recipe.instructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptionPage;