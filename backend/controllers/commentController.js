import Post from "../models/postModel.js";

// Crear un nuevo comentario
const createComment = async (request, response) => {
	try {
		const { commentId } = request.params;
		const { usuario, contenido } = request.body;

		const comentario = await Post.findByIdAndUpdate(
			commentId,
			{ $push: { comentarios: { usuario, contenido } } },
			{ new: true }
		);

		if (!comentario) {
			return response.json({
				message: "No se encontró el posteo para agregar un comentario",
			});
		}

		return response.json(comentario); // Devuelve el documento actualizado si es necesario
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: "Error interno del servidor" });
	}
};

// Obtener todos los comentarios de un posteo
const getCommentsByPostId = async (request, response) => {
	try {
		const { postId } = request.params;

		const post = await Post.findById(postId);

		if (!post) {
			return response.json({ message: "No se encontró el posteo" });
		}

		const comments = post.comentarios;

		return response.status(200).json({
			cantidadComentarios: comments.length,
			comentarios: comments
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Obtener un comentario por Id de posteo y Id de comentario
const getCommentById = async (request, response) => {
	try {
		const { postId, commentId } = request.params;

		const post = await Post.findById(postId);

		if (!post) {
			return response.json({ message: "No se encontró el posteo" });
		}

		const comment = post.comentarios.find(
				(comentario) => comentario._id == commentId
			);

		if (!comment) {
			return response.json({ message: "No se encontró el comentario" });
		}

		return response.status(200).json(comment);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Actualizar un comentario
const updateComment = async (request, response) => {
	try {
		const { postId, commentId } = request.params;
		const { usuario, contenido } = request.body;

		const updatedPost = await Post.findOneAndUpdate(
			{ _id: postId, "comentarios._id": commentId }, // Filtra por ID del post y del comentario
			{
				$set: {
					"comentarios.$.usuario": usuario,
					"comentarios.$.contenido": contenido,
				},
			}, // Actualiza los campos del comentario
			{ new: true }
		);

		if (!updatedPost) {
			return response
				.status(404)
				.json({ message: "El comentario no fue encontrado!" });
		}
		return response
			.status(200)
			.json({ message: "El comentario fue actualizado exitosamente!" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Eliminar un comentario
const deleteComment = async (request, response) => {
	try {
		const { postId, commentId } = request.params;

		const deletePost = await Post.findByIdAndUpdate(
			postId,
			{ $pull: { comentarios: { _id: commentId } } },
			{ new: true }
		);

		if (!deletePost) {
			return response.json({
				message: "No se encontró el posteo para eliminar el comentario",
			});
		}
		return response
			.status(200)
			.json({ message: "El comentario fue eliminado exitosamente!" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Exportamos todas las rutas
export {
	getCommentsByPostId,
	getCommentById,
	updateComment,
	deleteComment,
	createComment,
};
