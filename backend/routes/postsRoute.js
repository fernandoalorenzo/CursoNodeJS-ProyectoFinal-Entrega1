import express from "express";
import {
	createPost,
	deletePost,
	getPostById,
	getPosts,
	updatePost,
} from "../controllers/postController.js";
import authenticateToken from "../functions/tokenVerify.js";

const postsRouter = express.Router();

// DEFINIMOS LAS RUTAS
postsRouter.get("/", authenticateToken, getPosts);
postsRouter.get("/:id", authenticateToken, getPostById);
postsRouter.post("/", authenticateToken, createPost);
postsRouter.put("/:id", authenticateToken, updatePost);
postsRouter.delete("/:id", authenticateToken, deletePost);

export default postsRouter;
