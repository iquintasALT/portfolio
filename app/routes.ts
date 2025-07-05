import { index, prefix, route,type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("/api", [
    ...prefix("/settings", [
      route("/theme", "api/set-theme.tsx"),
    ]),
  ]),
  route("/projects/:projectName", "routes/ProjectDetailsPage.tsx"),
  route("*", "routes/NotFound.tsx"),
] satisfies RouteConfig;
