import { useState } from "react";
import {useDispatch} from "react-redux";
import {loginRequest} from "@store/auth";
import styles from "@components/Register/LoginForm.module.scss";


const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginRequest({ email, password }))
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2 className={styles.loginTitle}>Вход</h2>
            <input
                className={styles.inputField}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className={styles.inputField}
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.loginButton} type="submit">
                Войти
            </button>
        </form>
    );
};

export default LoginForm;
