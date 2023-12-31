/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ModalInfo from "./CardModalInfo";

const Card = ({ titulo, imagen, descripcion, _id , fetchData }) => {
	const [modalInfo, setModalInfo] = useState(false);
	const maxDescriptionLength = 100;

	return (
		<>
			<div
				className="card"
				style={{ minHeight: "23rem", maxHeight: "23rem" }}>
				<div className="card-header">
					<div className="row">
						<div className="col-9">
							<h5 className="card-title text-start">{titulo}</h5>
						</div>
						<div className="col-2 me-3">
							<i
								className="btn fa-solid fa-circle-info fa-fade fa-xl"
								style={{ color: "#1100ff" }}
								onClick={() => setModalInfo(true)}></i>
						</div>
					</div>
				</div>
				<img
					src={imagen}
					className="card-img img-thumbnail img-fluid img-responsive"
					alt={titulo}
				/>
				<div className="card-body">
					{descripcion.length > maxDescriptionLength ? (
						<p className="card-text text-start">
							{descripcion.slice(0, maxDescriptionLength) + "..."}
						</p>
					) : (
						<p className="card-text text-start">{descripcion}</p>
					)}
				</div>
			</div>
			{modalInfo === true ? (
				<ModalInfo
					_id={_id}
					titulo={titulo}
					descripcion={descripcion}
					imagen={imagen}
					onClose={() => setModalInfo(false)}
					fetchData={fetchData}
				/>
			) : (
				""
			)}
		</>
	);
};

export default Card;