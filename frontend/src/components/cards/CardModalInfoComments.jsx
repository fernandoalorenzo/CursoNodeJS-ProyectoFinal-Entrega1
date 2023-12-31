/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ModalDelete from "./../delete/ModalConfirmDelete";
import CardModalAgregar from "./CardModalInfoCommentsAgregar";
import { Toaster } from "react-hot-toast";
import { ToastError, ToastOK } from "../toast/Toast";

const CardModalInfoComments = ({ postId }) => {
	const [comentarios, setComentarios] = useState([]);
	const [editCommentId, setEditCommentId] = useState(null);
	const [deleteCommentId, setDeleteCommentId] = useState(null);

	// ESTADO DE MODAL PARA NUEVOS COMENTARIOS
	const [showAgregarModal, setShowAgregarModal] = useState(false);

	useEffect(() => {
		const fetchComentarios = async () => {
			try {
				const response = await fetch(
					`http://127.0.0.1:5000/comments/${postId}`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setComentarios(data.comentarios);
			} catch (error) {
				console.error("Error al intentar obtener comentarios: ", error);
			}
		};

		fetchComentarios();
	}, [postId]);

	// ------------------ Desde aca, todo para editar el comentario ------------------
	const handleEdit = (commentId) => {
		setEditCommentId(commentId);
	};

	const handleSaveEdit = async (editedContent, commentId) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/comments/${postId}/${commentId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ contenido: editedContent }),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Actualiza lista de comentarios con el contenido editado
			const updatedResponse = await fetch(
				`http://127.0.0.1:5000/comments/${postId}`
			);
			if (!updatedResponse.ok) {
				throw new Error(
					`HTTP error! Status: ${updatedResponse.status}`
				);
			}
			const updatedData = await updatedResponse.json();
			setComentarios(updatedData.comentarios);

			// Oculta el formulario de edicion
			setEditCommentId(null);

			// Muestra notificacion
			ToastOK("Comentario", "modificado");
		} catch (error) {
			console.error(
				"Error al intentar guardar la edición del comentario: ",
				error
			);
		}
	};

	const handleEditContentChange = (commentId, e) => {
		const editedComentarios = comentarios.map((comentario) => {
			if (comentario._id === commentId) {
				return { ...comentario, contenido: e.target.value };
			}
			return comentario;
		});
		setComentarios(editedComentarios);
	};

	const handleCancelEdit = () => {
		setEditCommentId(null);
	};

	// ------------------ Desde aca, todo para eliminar el comentario ------------------
	const handleConfirmDelete = async () => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/comments/${postId}/${deleteCommentId}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Actualizar la lista de comentarios despues de la eliminacion
			const updatedResponse = await fetch(
				`http://127.0.0.1:5000/comments/${postId}`
			);
			if (!updatedResponse.ok) {
				throw new Error(
					`HTTP error! Status: ${updatedResponse.status}`
				);
			}
			const updatedData = await updatedResponse.json();
			setComentarios(updatedData.comentarios);

			// Ocultar modal de eliminacion
			handleHideDeleteModal();

			// Mostrar Toast
			ToastOK("Comentario", "eliminado");
		} catch (error) {
			console.error("Error al intentar eliminar el comentario: ", error);
		}
	};

	// Muestra el modal para confirmar la eliminacion del comentario
	const handleShowDeleteModal = (commentId) => {
		setDeleteCommentId(commentId);
	};

	// Ocultar el modal para confirmar la eliminacion del comentario
	const handleHideDeleteModal = () => {
		setDeleteCommentId(null);
	};

	// ------------------ Desde aca, todo para agregar un nuevo comentario ------------------
	// Abre modal para agregar comentario
	const handleShowAgregarModal = () => {
		setShowAgregarModal(true);
	};
	// Guardar nuevo comentario
	const handleSaveComment = async ({ usuario, comentario }) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/comments/${postId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						usuario,
						contenido: comentario,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Actualizar lista de comentarios despues de crear el comentario
			const updatedResponse = await fetch(
				`http://127.0.0.1:5000/comments/${postId}`
			);

			if (!updatedResponse.ok) {
				throw new Error(
					`HTTP error! Status: ${updatedResponse.status}`
				);
			}
			const updatedData = await updatedResponse.json();
			setComentarios(updatedData.comentarios);

			// Ocultar modal agregar comentario
			setShowAgregarModal(false);

			// Mostrar Toast OK
			ToastOK("Comentario", "guardado");
		} catch (error) {
			console.error("Error al intentar guardar el comentario: ", error);

			// Mostrar Toast ERROR
			ToastError("comentario", "guardar");
		}
	};

	return (
		<>
			<div className="my-0">
				<div className="row justify-content-between">
					<div className="col">
						{/* MUESTRA EL BADGE COMENTARIOS SI HAY ALGUN COMENTARIO */}
						{comentarios.length > 0 && (
							<h4 className="card-title text-start">
								<span className="badge bg-secondary position-relative">
									Comentarios
									<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
										{comentarios.length}
									</span>
								</span>
							</h4>
						)}
					</div>
					{/* BOTON PARA AGREGAR COMENTARIOS */}
					<div className="col-2 align-items-end justify-content-end">
						<button
							className="btn btn-sm btn-success position-relative align-self-end"
							type="button"
							name="agregarComentario"
							onClick={handleShowAgregarModal}
							title="Nuevo comentario">
							<i className="fa-solid fa-comment-dots"></i>
						</button>
					</div>
				</div>
			</div>

			{comentarios.map((comentario) => (
				<div
					className="card border border-primary mb-4"
					key={comentario._id}>
					{/* SI HAY ID DE COMENTARIO, MUESTRA LOS INPUTS PARA MODIFICAR EL COMENTARIO */}
					{editCommentId === comentario._id ? (
						<div className="card-body">
							<textarea
								rows="3"
								value={comentario.contenido}
								className="form-control mb-2"
								onChange={(e) =>
									handleEditContentChange(comentario._id, e)
								}></textarea>
							<button
								className="btn btn-sm btn-success me-2"
								onClick={() =>
									handleSaveEdit(
										comentario.contenido,
										comentario._id
									)
								}
								/* SI EL COMENTARIO ESTA VACIO NO SE PUEDE GUARDAR */
								disabled={!comentario.contenido.trim()} // Deshabilitar si el contenido está vacío
							>
								Guardar
							</button>
							<button
								className="btn btn-sm btn-secondary"
								onClick={handleCancelEdit}>
								Cancelar
							</button>
						</div>
					) : (
						/* SI NO HAY ID DE COMENTARIO SELECCIONADO, MUESTRA LOS COMENTARIOS DEL POSTEO */
						<>
							<div>
								<div className="card-header text-start ps-1">
									<b className="text-success">
										{comentario.usuario}
									</b>{" "}
									comentó:
								</div>
								<div className="card-body text-start p-2 fs-6 fst-italic">
									{comentario.contenido}
								</div>
								<div className="card-footer p-1">
									<div className="row justify-content-between">
										<div className="col align-items-start">
											<p className="text-muted text-start align-items-start">
												Publicado el{" "}
												{comentario.fecha &&
													comentario.fecha.substr(
														8,
														2
													) +
														"/" +
														comentario.fecha.substr(
															5,
															2
														) +
														"/" +
														comentario.fecha.substr(
															0,
															4
														)}
											</p>
										</div>
										<div className="col-3 align-items-end justify-content-end me-0">
											<button
												className="btn btn-sm btn-warning me-2"
												onClick={() =>
													handleEdit(comentario._id)
												}
												title="Editar comentario">
												<i className="fa-solid fa-regular fa-edit"></i>
											</button>
											<button
												className="btn btn-sm btn-danger"
												onClick={() =>
													handleShowDeleteModal(
														comentario._id
													)
												}
												title="Eliminar comentario">
												<i className="fa-regular fa-trash-can"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			))}
			{deleteCommentId && (
				<ModalDelete
					onCancel={handleHideDeleteModal}
					onConfirm={handleConfirmDelete}
					tipoEliminacion="comentario"
				/>
			)}
			{showAgregarModal && (
				<CardModalAgregar
					onSave={handleSaveComment}
					onCancel={() => setShowAgregarModal(false)}
				/>
			)}
			<Toaster />
		</>
	);
};

export default CardModalInfoComments;
