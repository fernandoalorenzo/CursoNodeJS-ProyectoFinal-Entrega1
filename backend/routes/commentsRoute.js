import express from "express";
import {
	deleteComment,
	getCommentsByPostId,
	getCommentById,
	updateComment,
	createComment
} from "../controllers/commentController.js";
import authenticateToken from "../functions/tokenVerify.js";

const commentsRouter = express.Router();

// DEFINIMOS LAS RUTAS
commentsRouter.get("/:postId", authenticateToken, getCommentsByPostId);
commentsRouter.get("/:postId/:commentId", authenticateToken, getCommentById);
commentsRouter.patch("/:postId/:commentId", authenticateToken, updateComment);
commentsRouter.delete("/:postId/:commentId", authenticateToken, deleteComment);
commentsRouter.post("/:commentId", createComment);

export default commentsRouter;
