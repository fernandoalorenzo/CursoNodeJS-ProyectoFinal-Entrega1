/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../logo/logo";

export default function Navbar() {
	const { state } = useLocation();
	console.log(state);

	const navigate = useNavigate();

	const onLogout = () => {
		navigate("/login", { replace: true });
	};

	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-light bg-warning bg-gradient">
			<div className="container-fluid">
				<Link className="navbar-brand m-0" to="/">
					<Logo alt="logo" className="d-inline align-text-top"></Logo>
				</Link>
				<span className="logo-titulo">MeetMe.gram</span>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarSupportedContent">
					<ul className="navbar-nav me-5">
						{state?.logger ? (
							<>
								<li className="nav-item menu-item mx-4">
									<Link className="nav-link " to="/">
										Inicio
									</Link>
								</li>
								<li className="nav-item menu-item mx-4">
									<Link className="nav-link" to="#">
										Perfil
									</Link>
								</li>
								<i className="fa-solid fa-user fa-lg pe-2"></i>
								<span>
									{state?.nombre + " " + state?.apellido}
								</span>
								{/* <i className="fa-solid fa-power"></i> */}
								<button
									className="btn btn-light ms-2"
									onClick={onLogout}>
									Cerrar Sesión
								</button>
							</>
						) : (
							<>
								<li className="nav-item menu-item mx-4">
									<Link className="nav-link" to="login">
										Iniciar sesión
									</Link>
								</li>
								<li className="nav-item menu-item mx-4">
									<Link className="nav-link" to="register">
										Registrarse
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
