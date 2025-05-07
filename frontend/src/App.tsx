import { Routes, Route } from "react-router-dom";
import RegisterForm from "./components/Register/RegisterForm.tsx";
import AdminPage from "./pages/AdminPage/AdminPage.tsx";
import LoginForm from "./components/Register/LoginForm.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "./hooks/reduxHooks.ts";
import {setAuth, clearAuth} from "./store/auth.ts";
import axios from "axios";
import MainPage from "./pages/MainPage/MainPage.tsx";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const restoreAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                dispatch(clearAuth());
                return;
            }

            try {
                const res = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const user = res.data;
                dispatch(setAuth({ user, token }));
            } catch (err) {
                localStorage.removeItem("token");
                dispatch(clearAuth());
            }
        };

        restoreAuth();
    }, [dispatch]);
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<MainPage/>}/>
    </Routes>
  );
}

export default App;
