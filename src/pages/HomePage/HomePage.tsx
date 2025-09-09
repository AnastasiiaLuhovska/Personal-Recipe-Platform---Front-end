import {Link} from "react-router";
import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
    return (
        <div className={styles.homeWrapper}>
            <section className={styles.heroSection}>
                <div className='container'>
                    <div className={styles.heroInner}>
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>Welcome to the world of taste</h1>
                            <p className={styles.heroDescription}>
                                Discover amazing recipes and create culinary masterpieces at home
                            </p>
                            <Link to="/catalog" className={styles.catalogButton}>
                                View Recipes
                            </Link>
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
                            <h3 className={styles.featureTitle}>Simple Recipes</h3>
                            <p className={styles.featureText}>Step-by-step instructions for any skill level</p>
                        </div>
                        <div className={styles.featureCard}>
                            <h3 className={styles.featureTitle}>Fresh Ideas</h3>
                            <p className={styles.featureText}>New recipes every week</p>
                        </div>
                        <div className={styles.featureCard}>
                            <h3 className={styles.featureTitle}>Family Friendly</h3>
                            <p className={styles.featureText}>Dishes that everyone will love</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default HomePage;