import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../../redux/store.ts";
import {searchRecipesThunk} from "../../redux/recipes/operations.ts";
import {selectRecipes} from "../../redux/recipes/selectors.ts";
import RecipeCard from "../RecipeCard/RecipeCard.tsx";
import styles from "./RecipeCollection.module.css";

const RecipeCollection = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(searchRecipesThunk(""))
    }, [dispatch])

    const recipes = useSelector(selectRecipes)

    return (
        recipes.length > 0 ? (
            <div className={styles.container}>
                <h2 className={styles.title}>Recipes Collection</h2>
                <div className={styles.grid}>
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>
        ) :
            (
            <h2>Nothing here yet</h2>
        )
    );
};

export default RecipeCollection;