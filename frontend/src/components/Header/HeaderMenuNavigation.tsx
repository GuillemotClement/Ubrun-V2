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

        {/*<li>
          <a>Item 1</a>
        </li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul className="p-2 bg-base-100 w-40 z-1">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>Item 3</a>
        </li>*/}
      </ul>
    </div>
  );
}
