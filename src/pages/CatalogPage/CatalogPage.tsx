import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import RecipeCollection from "../../components/RecipeCollection/RecipeCollection.tsx";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm.tsx";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={styles.catalogContainer}>
            <div className={styles.header}>
                <SearchBar/>
                <button className={styles.addButton} onClick={openModal}>
                    + Add Recipe
                </button>
            </div>
            <RecipeCollection/>
            
            {isModalOpen && <AddRecipeForm onClose={closeModal} />}
        </div>
    );

};

export default CatalogPage;