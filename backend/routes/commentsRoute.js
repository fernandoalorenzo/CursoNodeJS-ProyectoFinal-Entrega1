import express from "express";
import {
	deleteComment,
	getCommentsByPostId,
	getCommentById,
	updateComment,
	createComment
} from "../controllers/commentController.js";

const commentsRouter = express.Router();

// DEFINIMOS LAS RUTAS
commentsRouter.get("/:postId", getCommentsByPostId);
commentsRouter.get("/:postId/:commentId", getCommentById);
commentsRouter.patch("/:postId/:commentId", updateComment);
commentsRouter.delete("/:postId/:commentId", deleteComment);
commentsRouter.post("/:commentId", createComment);

export default commentsRouter;
