import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { navLink } from "./navLink";
import type { NavLinkData } from "./types";

export default function HeaderMenuResponsive() {
	const [isOpen, setIsOpen] = useState(false);
	const links = navLink;

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="dropdown dropdown-start">
			<button
				type="button"
				className="btn btn-ghost btn-xs lg:hidden"
				onClick={toggleMenu}
			>
				<Menu />
			</button>
			{isOpen && (
				<ul
					className="dropdown-content dropdown-end menu menu-sm bg-base-100 rounded-box z-1 w-52 p-2 shadow"
					onClick={toggleMenu}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							toggleMenu;
						}
					}}
				>
					{links.map((link: NavLinkData) => {
						return (
							<li
								key={link.name}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										toggleMenu;
									}
								}}
								onClick={toggleMenu}
							>
								<Link to={link.url}>{link.name}</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
