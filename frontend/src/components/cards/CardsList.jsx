/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import CardModalAgregar from "./CardModalAgregar.jsx";
import { ToastOK } from "../toast/Toast.jsx";
import { Toaster } from "react-hot-toast";

const CardsList = (posts) => {
	const [data, setData] = useState([]);
	const [modalInfo, setModalInfo] = useState(false);
	const [modalAgregar, setModalAgregar] = useState(false);

	const [searchTerm, setSearchTerm] = useState("");

	const openModalAgregar = () => {
		setModalAgregar(true);
	};

	const closeModalAgregar = async () => {
		setModalAgregar(false);
		await fetchData();
	};

	const fetchData = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/posts");
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			// console.log(data.data);
			setData(data.data);

			return setModalInfo(true);
		} catch (error) {
			console.error("Error al intentar obtener datos: ", error);
		}
	};

	const handleSearch = () => {
		// Filtra los datos convirtiendo los 2 datos a minuscula
		const filteredData = data.filter((card) =>
			card.titulo.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setData(filteredData);
	};

	const clearSearch = () => {
		// Limpia el filtro
		setSearchTerm("");
		fetchData();
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="container my-2">
				<div className="row justify-content-center mx-4">
					<div className="row row-cols-auto p-3 justify-content-end my-1">
						<button
							className="btn btn-primary align-self-end"
							onClick={openModalAgregar}>
							Nuevo Post
						</button>
					</div>
				</div>
				<div className="row justify-content-center mx-4 border border-success border-2 rounded">
					<div className="row  justify-content-center">
						<div className="col-sm-8 d-flex p-3 justify-content-center my-1">
							<input
								className="form-control"
								type="text"
								placeholder="Buscar por título"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className="col-sm-2 d-flex p-3 justify-content-center my-1">
							<button
								className="btn btn-success d-grip border border-light"
								style={{ width: "100%" }}
								onClick={handleSearch}>
								<i
									className="fa-solid fa-magnifying-glass fa-xl me-3"
									style={{ color: "#ffffff" }}></i>
								Buscar
							</button>
						</div>
						<div className="col-sm-2 d-flex p-3 justify-content-center my-1">
							<button
								className="btn btn-dark d-grip border border-light"
								style={{ width: "100%" }}
								onClick={clearSearch}>
								<i
									className="fa-solid fa-broom fa-xl me-3"
									style={{ color: "#ffffff" }}></i>
								Limpiar
							</button>
						</div>
					</div>
				</div>
				<div className="row justify-content-center row-cols-auto">
					{data.map((card) => (
						<div
							className="m-4 mx-3"
							key={card._id}
							style={{ width: "18rem" }}>
							<div className="card">
								<Card
									titulo={card.titulo}
									descripcion={card.descripcion}
									imagen={card.imagen}
									_id={card._id}
									onInfoClick={() => setModalInfo(true)}
									fetchData={fetchData}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			{modalAgregar === true ? (
				<CardModalAgregar
					onClose={closeModalAgregar}
					onSave={fetchData}
				/>
			) : (
				""
			)}
			<Toaster />
		</>
	);
};

export default CardsList;
