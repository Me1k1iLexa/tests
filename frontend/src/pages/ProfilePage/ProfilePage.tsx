import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserData } from "../../types/user.ts";
import styles from './Profile.module.scss'
import axios from "axios";
import {useAppDispatch} from "../../hooks/reduxHooks.ts";
import {clearAuth} from "../../store/auth.ts";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
            "http://localhost:5000/api/user/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
        );

        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Пользователь не найден</p>;

    const handleLogOut = () => {
        localStorage.removeItem("token");
        dispatch(clearAuth());
        navigate("/");
    };

  return (
      <div className={styles.profilePage}>
        <h1 className={styles.profileTitle}>Профиль {user.username}</h1>
        <div className={styles.profileInfo}>
          <p>Email: {user.email}</p>
          <p>Дата регистрации: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <button
            onClick={handleLogOut}
            type="button"
            className={styles.logoutButton}
        >
          Выйти
        </button>
      </div>
  );
};

export default ProfilePage;

