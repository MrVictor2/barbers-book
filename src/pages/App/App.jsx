import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import LoginPage from "./LoginPage/LoginPage";
import NavBar from "../../components/NavBar/NavBar";
import NotePage from "../NotePage/NotePage";
import BarbersPage from "../BarbersPage/BarbersPage";
import CustomerPage from "../CustomerPage/CustomerPage";
import MyAppointmentsPage from "../MyAppointmentsPage/MyAppointmentsPage";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  function handleLogout() {
    setUser(null);
    // Redirect to the login page
    return <Navigate to="/login" />;
  }

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/notes" element={<NotePage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/barbers" element={<BarbersPage />} />
            <Route path="/appointments" element={<MyAppointmentsPage />} />
            <Route path="/" element={<Navigate to="/notes" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<AuthPage setUser={setUser} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </main>
  );
}
