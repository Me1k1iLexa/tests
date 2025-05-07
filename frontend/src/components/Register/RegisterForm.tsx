import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Successfully registered!");
            } else {
                alert("Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.registerForm}>
            <h2 className={styles.registerTitle}>Регистрация</h2>
            <input
                className={styles.inputField}
                type="email"
                placeholder="Ваш Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className={styles.inputField}
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                className={styles.inputField}
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div className={styles.buttonWrapper}>
                <button className={styles.registerButton} type="submit">
                    Зарегистрироваться
                </button>
                <Link className={styles.loginLink} to="/login">
                    Уже зарегистрированы?
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;

