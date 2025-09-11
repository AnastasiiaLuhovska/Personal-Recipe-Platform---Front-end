import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
    return (
        <div className={styles.notFoundWrapper}>
            <div className={styles.notFoundContainer}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>Page Not Found</h2>
                <p className={styles.description}>
                    The page you are looking for doesn't exist or has been moved.
                    Let's get you back to something delicious!
                </p>
                <Link to="/" className={styles.homeButton}>
                    🏠 Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;