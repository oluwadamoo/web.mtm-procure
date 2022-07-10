import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Receipt = lazy(() => import("../pages/Receipt"));
const Product = lazy(() => import("../pages/Product"));
const Charts = lazy(() => import("../pages/Charts"));
const Modals = lazy(() => import("../pages/Modals"));
const Expense = lazy(() => import("../pages/Expense"));
const Page404 = lazy(() => import("../pages/404"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/receipts",
    component: Receipt,
  },
  {
    path: "/products",
    component: Product,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/modals",
    component: Modals,
  },
  {
    path: "/expenses",
    component: Expense,
  },
  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
