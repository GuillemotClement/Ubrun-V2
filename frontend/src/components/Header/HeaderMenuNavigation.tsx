import { Link } from "@tanstack/react-router";
import { navLink } from "./navLink";
import type { NavLinkData } from "./types";

const links: NavLinkData[] = navLink;

export default function HeaderMenuNavigation() {
	return (
		<div className="navbar-center hidden lg:flex">
			<ul className="menu menu-horizontal px-1">
				{links.map((link) => {
					return (
						<li key={link.name}>
							<Link to={link.url}>{link.name}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
