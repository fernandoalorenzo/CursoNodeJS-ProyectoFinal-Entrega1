import mongoose from "mongoose";

const postSchema = mongoose.Schema(
	{
		titulo: {
			type: String,
			required: true,
		},
		descripcion: {
			type: String,
			required: true,
		},
		imagen: {
			type: String,
			required: true,
		},
		comentarios: [
			{
				usuario: {
					type: String,
					default: ""
				},
				contenido: {
					type: String,
					default: ""
				},
				fecha: {
					type: Date,
					default: Date.now
				}
				
			},
		],
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Posts", postSchema);
export default Post;
