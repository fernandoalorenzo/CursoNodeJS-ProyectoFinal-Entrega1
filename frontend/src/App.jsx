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
import Footer from "./components/footer/Footer";
import "./styles/styles.css";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NoDisponible />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
