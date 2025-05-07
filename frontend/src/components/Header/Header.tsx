import styles from "./Header.module.scss";
import {Link} from "react-router-dom";
import {useAppSelector} from "@hooks/reduxHooks";

const Header =()=>{
    const isAuth = useAppSelector((state)=> state.auth.isAuthenticated)


return(
    <header className={styles.headerWrapper}>
        <Link to="/">
            <img className={styles.logo} alt="logo" src="/logo.svg"/>
        </Link>
        <nav>
            <form className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Поиск тем..."
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                    🔍
                </button>
            </form>
        </nav>
        {!isAuth ? (
            <div className={styles.buttonWrapper}>
                <Link to="/register" className={styles.authButton}>
                    Зарегистрироваться
                </Link>
                <Link to="/login" className={styles.authButton}>
                    Вход
                </Link>
            </div>
        ) : (
            <div className={styles.buttonWrapper}>
                <Link to="/profile" className={styles.profileButton}>
                    Профиль
                </Link>
            </div>
        )}
    </header>
        )
        }
        export default Header;