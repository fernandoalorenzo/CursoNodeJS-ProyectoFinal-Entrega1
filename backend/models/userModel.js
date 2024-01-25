import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		nombre: {
			type: String,
			required: true,
		},
		apellido: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	try {
		// Verificar si el email ya existe en la base de datos
		const existingUser = await User.findOne({ email: this.email });
		if (existingUser) {
			throw new Error("El email ya está registrado");
		}

		// Encriptar la contraseña antes de guardarla en la base de datos
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;

		next();
	} catch (error) {
		next(error);
	}
});

const User = mongoose.model("Users", userSchema);
export default User;
