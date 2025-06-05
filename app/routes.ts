import { index, prefix, route,type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("/api", [
    ...prefix("/settings", [
      route("/theme", "api/set-theme.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
