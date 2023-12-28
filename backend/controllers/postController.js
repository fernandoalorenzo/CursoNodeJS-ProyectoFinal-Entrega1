import Post from "../models/postModel.js";

// Crear un nuevo posteo
const createPost = async (request, response) => {
    try {
		const post = await Post.create(request.body);

        return response.status(201).send({
            message: "El posteo fue creado exitosamente!",
            data: post
        })
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Obtener todos los posteos
const getPosts = async (request, response) => {
	try {
		const posts = await Post.find({});
		return response.status(200).json({
			count: posts.lenght,
			data: posts,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}

};

// Obtener un posteo por Id
const getPostById = async (request, response) => {
	try {
		const { id } = request.params;
		const post = await Post.findById(id);
		return response.status(200).json(post);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Actualizar posteos
const updatePost = async (request, response) => {
	try {
		const { id } = request.params;
		const result = await Post.findByIdAndUpdate(id, request.body);

		if (!result) {
			return response
				.status(404)
				.json({ message: "El posteo no fue encontrado!" });
		}
		return response
			.status(200)
			.json({ message: "El posteo fue actualizado exitosamente!" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Eliminar un posteo
const deletePost = async (request, response) => {
	try {
		const { id } = request.params;
		const result = await Post.findByIdAndDelete(id);
		if (!result) {
			return response
				.status(404)
				.json({ message: "El posteo no fue encontrado!" });
		}
		return response
			.status(200)
			.json({ message: "El posteo fue eliminado exitosamente!" });
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
};

// Exportamos todas las rutas
export { createPost, getPosts, getPostById, updatePost, deletePost };