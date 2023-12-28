/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import CardModalAgregar from "./CardModalAgregar.jsx";

const CardsList = (posts) => {
	const [data, setData] = useState([]);
	const [modalInfo, setModalInfo] = useState(false);
	const [modalAgregar, setModalAgregar] = useState(false);
	
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
			console.log(data.data);
			setData(data.data);
			return setModalInfo(true);
		} catch (error) {
			console.error("Error al intentar obtener datos: ", error);
		}
		
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="container my-4">
				<div className="row justify-content-center row-cols-auto mx-4">
					<div className="col-md-6"></div>
					<div className="col-md-6 text-end">
						<button
							className="btn btn-primary align-self-end"
							onClick={openModalAgregar}>
							Nuevo Post
						</button>
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
		</>
	);
};

export default CardsList;
