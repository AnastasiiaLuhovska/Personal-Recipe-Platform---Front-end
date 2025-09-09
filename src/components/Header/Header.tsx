import * as React from "react";
import {NavLink} from "react-router";
import styles from './Header.module.css'


const Header: React.FC = () => {
    return (
        <header className={styles.headerWrapper}>
            <div className={styles.secWrapper}>

                <div className={styles.logo}>
                    <NavLink to="/" className={styles.logoLink}>
                        <span className={styles.logoText}>MyRecipes</span>
                    </NavLink>
                </div>

                <nav className={styles.navWrapper}>
                    <NavLink to="/" className={styles.navLink}>
                        Home
                    </NavLink>
                    <NavLink to="/catalog" className={styles.navLink}>
                        Catalog
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;