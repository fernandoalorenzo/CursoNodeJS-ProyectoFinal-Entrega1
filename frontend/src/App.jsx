/* eslint-disable no-unused-vars */
// import { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	BrowserRouter,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import NoDisponible from "./pages/404";
import LoginForm from "./components/users/LoginForm";
import UserInfoForm from "./components/users/UserInfoForm";
import UserPasswordForm from "./components/users/UserPasswordForm";
import Footer from "./components/footer/Footer";
import "./styles/styles.css";
import { useState } from "react";

const App = () => {
	const [currentUser, setCurrentUser] = useState(
			JSON.parse(localStorage.getItem("user"))
	);
	
	// ACTUALIZA LOS DATOS DE USUARIO
	const updateUser = (newUserData) => {
		setCurrentUser(newUserData);
	};

	// Obtener la información del usuario desde el localStorage
	const user = JSON.parse(localStorage.getItem("user"));

	// Determinar si hay un usuario logueado, estamos actualizando
	const isUpdating = !!user;

	return (
		<BrowserRouter>
			<Navbar updateUser={updateUser} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginForm />} />
				<Route
					path="/register"
					element={<UserInfoForm isUpdating={false} />}
				/>
				<Route
					path="/profile"
					element={
						<UserInfoForm
							isUpdating={isUpdating}
							updateUser={updateUser}
						/>
					}
				/>
				<Route path="/changepwd" element={<UserPasswordForm />} />
				<Route path="*" element={<NoDisponible />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
