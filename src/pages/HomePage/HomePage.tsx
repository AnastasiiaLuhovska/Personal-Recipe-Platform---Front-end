import {Link, NavLink} from "react-router";
import styles from './HomePage.module.css'
import {useSelector} from "react-redux";
import * as React from "react";

const HomePage: React.FC = () => {
        const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

    return (
        <div className={styles.homeWrapper}>
            <section className={styles.heroSection}>
                <div className='container'>
                    <div className={styles.heroInner}>
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>Add Your Favorite Recipes</h1>
                            <p className={styles.heroDescription}>
                                Create your personal recipe collection and share culinary masterpieces
                            </p>
                            {isLoggedIn ?
                                <Link to="/catalog" className={styles.catalogButton}>
                                    View Recipes
                                </Link> :
                                <div className={styles.buttonWrapper}>
                                <NavLink to="/login" className={styles.authButton}>
                                    Sign In
                                </NavLink>
                                <NavLink to="/register" className={styles.authButton}>
                            Sign Up
                        </NavLink>
                                </div>}
                        </div>
                        <div className={styles.heroImage}>
                            <img
                                src="/images/recipe-image.jpg"
                                alt="Delicious dish"
                                className={styles.recipeImage}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.featuresSection}>
                <div className='container'>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <h3 className={styles.featureTitle}>Save Your Recipes</h3>
                            <p className={styles.featureText}>Keep all your favorite recipes in one place</p>
                        </div>
                        <div className={styles.featureCard}>
                            <h3 className={styles.featureTitle}>Easy to Add</h3>
                            <p className={styles.featureText}>Simple form to add new recipes quickly</p>
                        </div>
                        <div className={styles.featureCard}>
                            <h3 className={styles.featureTitle}>Personal Collection</h3>
                            <p className={styles.featureText}>Build your own unique recipe library</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default HomePage;