import HeaderLogo from "./HeaderLogo";
import HeaderMenuAction from "./HeaderMenuAction";
import HeaderMenuNavigation from "./HeaderMenuNavigation";
import HeaderMenuResponsive from "./HeaderMenuResponsive";

export default function Header() {
	return (
		<header className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<HeaderMenuResponsive />
				<HeaderLogo />
			</div>

			{/* menu navigation */}
			<HeaderMenuNavigation />

			{/* menu action */}
			<HeaderMenuAction />
		</header>
	);
}
