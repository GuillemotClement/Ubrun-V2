import { Link, Outlet } from "@tanstack/react-router";
import { HeartPulse, House, PanelLeftOpen } from "lucide-react";

export default function ToolsPage() {
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				{/* Navbar */}
				<nav className="navbar w-full bg-base-300">
					<label
						htmlFor="my-drawer-4"
						aria-label="open sidebar"
						className="btn btn-square btn-ghost"
					>
						{/* Sidebar toggle icon */}
						<PanelLeftOpen />
					</label>
					<div className="px-4">Outils</div>
				</nav>
				{/* Page content here */}
				<div className="py-10 px-4">
					<Outlet />
				</div>
			</div>

			<div className="drawer-side is-drawer-close:overflow-visible">
				<label
					htmlFor="my-drawer-4"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>

				<div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
					{/* Sidebar content here */}

					<ul className="menu w-full grow">
						{/* List item */}
						<li>
							<Link
								to="/"
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Homepage"
							>
								{/* Home icon */}
								<House />
								<span className="is-drawer-close:hidden">Accueil</span>
							</Link>
						</li>

						<li>
							<Link
								to="/tools/fcm"
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Fréquence Cardique"
							>
								<HeartPulse />

								<span className="is-drawer-close:hidden">
									Fréquence Cardiaque
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
