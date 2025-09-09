import * as React from "react";
import {NavLink} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {useLocation} from "react-router";
import styles from './Header.module.css';

import type {AppDispatch} from "../../redux/store.ts";
import {logoutThunk} from "../../redux/auth/operations.ts";

const Header: React.FC = () => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        dispatch(logoutThunk());
        setShowDropdown(false);
    };

    if (!isLoggedIn) {
        return (
            <header className={styles.headerWrapper}>
                <div className={styles.secWrapper}>
                    <div className={styles.logo}>
                        <NavLink to="/" className={styles.logoLink}>
                            <span className={styles.logoText}>MyRecipes</span>
                        </NavLink>
                    </div>

                    <nav className={styles.navWrapper}>
                        {location.pathname === '/register' ? (
                            <NavLink to="/login" className={styles.authButton}>
                                Sign In
                            </NavLink>
                        ) : (
                            <NavLink to="/register" className={styles.authButton}>
                                Sign Up
                            </NavLink>
                        )}
                    </nav>
                </div>
            </header>
        );
    }

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

                    <div className={styles.settingsContainer}>
                        <button
                            className={styles.settingsButton}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            Settings
                        </button>

                        {showDropdown && (
                            <div className={styles.dropdown}>
                                <button
                                    className={styles.logoutButton}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;