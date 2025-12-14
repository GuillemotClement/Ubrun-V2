import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";
import ToolsPage from "../pages/Tools/ToolsPage";
import FcmPage from "../pages/Tools/FCM/FcmPage";

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

const routeTree = rootRoute.addChildren([indexRoute, toolsPage, fcmPage]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});
