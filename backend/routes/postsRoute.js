import express from "express";
import {
	createPost,
	deletePost,
	getPostById,
	getPosts,
	updatePost,
} from "../controllers/postController.js";

const postsRouter = express.Router();

// DEFINIMOS LAS RUTAS
postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPostById);
postsRouter.post("/", createPost);
postsRouter.put("/:id", updatePost);
postsRouter.delete("/:id", deletePost);

export default postsRouter;
