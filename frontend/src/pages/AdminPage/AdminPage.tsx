import { useEffect, useState } from "react";
import styles from './Admin.module.scss'

type User = {
  id: number;
  email: string;
  createdAt: string;
};

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
      <div className={styles.adminPage}>
        <h1>Список пользователей</h1>
        {users.length === 0 ? (
            <p className={styles.noUsers}>Пользователей пока нет</p>
        ) : (
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                <tr>
                  <th>Email</th>
                  <th>Дата регистрации</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
};

export default AdminPage;
