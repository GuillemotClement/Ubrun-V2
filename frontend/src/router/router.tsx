import {
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";
import FcmPage from "../pages/Tools/FCM/FcmPage";
import ToolsPage from "../pages/Tools/ToolsPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ClubPage from "../pages/Club/ClubPage";

const rootRoute = createRootRoute({
	component: () => <RootLayout />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => <Homepage />,
});

//  TOOLS PAGE =============================
const toolsPage = createRoute({
	getParentRoute: () => rootRoute,
	path: "/tools",
	component: () => <ToolsPage />,
});

const fcmPage = createRoute({
	getParentRoute: () => toolsPage,
	path: "/fcm",
	component: () => <FcmPage />,
});

// Auth ======================================
const loginPage = createRoute({
	getParentRoute: () => rootRoute,
	path: "/login",
	component: () => <LoginPage />,
});

const registerPage = createRoute({
	getParentRoute: () => rootRoute,
	path: "/register",
	component: () => <RegisterPage />,
});

// Club =========================================
const clubPage = createRoute({
	getParentRoute: () => rootRoute,
	path: "/clubs",
	component: () => <ClubPage />,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	toolsPage,
	fcmPage,
	loginPage,
	registerPage,
	clubPage,
]);

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
});
