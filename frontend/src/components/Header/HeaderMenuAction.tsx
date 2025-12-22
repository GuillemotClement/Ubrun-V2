import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { authClient } from "../../libs/better-auth";

export default function HeaderMenuAction() {
	const navigate = useNavigate();

	const { data: session } = authClient.useSession();

	const mutation = useMutation({
		mutationFn: async () => {
			const { error } = await authClient.signOut();

			if (error) {
				console.error(error);
			}

			navigate({ to: "/" });
		},
	});

	const handleLogout = () => {
		mutation.mutate();
	};

	return (
		<div className="navbar-end">
			{session ? (
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
							{/** biome-ignore lint/a11y/useKeyWithClickEvents: <flemme> */}
							<p onClick={handleLogout}>Deconnexion</p>
						</li>
					</ul>
				</div>
			) : (
				<ul className="flex gap-x-3">
					<li>
						<Link to="/register" className="btn btn-neutral">
							Inscription
						</Link>
					</li>
					<li>
						<Link to="/login" className="btn btn-primary">
							Connexion
						</Link>
					</li>
				</ul>
			)}
		</div>
	);
}
