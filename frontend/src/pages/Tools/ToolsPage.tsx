import { Link, Outlet } from "@tanstack/react-router";

export default function ToolsPage() {
  return (
    <div>
      tools page
      <ul>
        <li>
          <Link to="/tools/fcm">fcm</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
