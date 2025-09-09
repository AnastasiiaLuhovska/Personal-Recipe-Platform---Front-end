import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SearchBar.module.css';
import {searchRecipesThunk} from "../../redux/recipes/operations.ts";
import type {AppDispatch} from "../../redux/store.ts";

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(searchRecipesThunk(searchTerm.trim()));
    };

    return (
        <div className={styles.catalogWrapper}>
            <div className="container">
                <h1>Browse Recipes</h1>

                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search recipes by name..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.submitButton}>
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchBar