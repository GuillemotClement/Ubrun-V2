import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function HeaderMenuAction() {
	// TEMP => for test
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const toggleAuth = () => setIsAuth(!isAuth);
	// =====================

	return (
		<div className="navbar-end">
			{/* allow to switch display*/}
			<button
				type="button"
				onClick={toggleAuth}
				className="btn btn-xs btn-warning me-10"
			>
				auth
			</button>
			{/*==================================*/}

			{isAuth ? (
				<div className="dropdown dropdown-end">
					<button
						tabIndex={0}
						type="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full bg-red-500 flex justify-center items-center">
							{/*TODO: si user est connecter on met son image ou bien la premiere lettre de son mail ou username*/}
							<p className="text-white">U</p>
							{/*<img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />*/}
						</div>
					</button>
					<ul
						tabIndex={-1}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link to="/">Profil</Link>
						</li>
						<li>
							<Link to="/">Paramètres</Link>
						</li>
						<li>
							<Link to="/">Deconnexion</Link>
						</li>
					</ul>
				</div>
			) : (
				<ul>
					<li>
						<Link to="/" className="btn btn-neutral">
							Inscription
						</Link>
						<Link to="/" className="btn btn-primary">
							Connexion
						</Link>
					</li>
				</ul>
			)}
		</div>
	);
}
