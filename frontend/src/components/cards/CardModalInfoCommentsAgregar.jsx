/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CardModalAgregar = ({ onSave, onCancel }) => {
	const [usuario, setUsuario] = useState("");
	const [comentario, setComentario] = useState("");
	const [isGuardarDisabled, setGuardarDisabled] = useState(true);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Actualizar el estado segun el campo que cambio
		if (name === "usuario") {
			setUsuario(value);
		} else if (name === "comentario") {
		setComentario(value);
		}
	};

	useEffect(() => {
		// Verificar si los campos no estan vacios despues de actualizar estados
		setGuardarDisabled(
			usuario.trim() === "" || comentario.trim() === ""
		);
	}, [usuario, comentario]);
	
	const handleSave = () => {
		// Validar que los campos no esten vacios
		if (usuario.trim() === "" || comentario.trim() === "") {
			alert("Por favor, complete ambos campos.");
			return;
		}

		// Pasando datos del nuevo comentario
		onSave({ usuario, comentario });

		// Limpiar campos y cerrar modal
		setUsuario("");
		setComentario("");
		setGuardarDisabled(true);
	};

	return (
		<div
			className="modal fade show"
			tabIndex="-1"
			role="dialog"
			style={{ display: "block" }}>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header bg-primary text-white">
						<h5 className="modal-title">Agregar Comentario</h5>
						<button
							type="button"
							className="btn-close"
							onClick={onCancel}></button>
					</div>
					<div className="modal-body">
						<div className="form-group mb-4">
							<div className="row align-items-start">
								<label className="col-auto form-label">
									Usuario
								</label>
							</div>

							<input
								type="text"
								className="form-control"
								name="usuario"
								value={usuario}
								onInput={handleInputChange}
							/>
						</div>
						<div className="form-group mb-4">
							<div className="row align-items-start">
								<label className="col-auto form-label">
									Comentario
								</label>
							</div>
							<textarea
								rows="3"
								className="form-control"
								name="comentario"
								value={comentario}
								onInput={handleInputChange}>
							</textarea>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-primary"
							onClick={handleSave}
							disabled={isGuardarDisabled}>
							Guardar
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
							onClick={onCancel}>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardModalAgregar;
