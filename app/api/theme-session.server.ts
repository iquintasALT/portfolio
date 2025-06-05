/**
 * Theme Session Management Module
 *
 * This module sets up and exports a theme session resolver to handle user theme preferences
 * throughout the app. It works with remix-themes to enable both server-side theme detection
 * and cookie-based persistence.
 *
 * The user's theme choice is stored in a cookie that is accessible to both the server and client
 * (not httpOnly). This ensures the correct theme is applied on the first render and remains
 * consistent during navigation.
 */
import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";

/**
 * Cookie session storage for theme selection
 *
 * This storage uses these options:
 * - name: "theme" — The cookie's name for saving the theme
 * - path: "/" — Makes the cookie available site-wide
 * - httpOnly: false — Lets JavaScript read the cookie (needed for client theme switching)
 * - sameSite: "lax" — Adds some CSRF protection but allows normal navigation
 *
 * Note: httpOnly is purposely set to false so the client can detect the theme
 * without a server request. This is standard for non-sensitive theme cookies.
 */
const sessionStorage = createCookieSessionStorage({
  cookie: {
    secrets: ["notReallyNeededButAvoidsWarning"], // Not sensitive
    name: "theme",
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  },
});

/**
 * Theme session resolver for theme management
 *
 * This resolver exposes methods to get and set the theme preference
 * on both the server and client. The ThemeProvider uses it to initialize the theme,
 * and theme toggles use it to update the value.
 *
 * @example
 * // In a loader
 * export async function loader({ request }: LoaderArgs) {
 *   const { getTheme } = await themeSessionResolver(request);
 *   const theme = getTheme();
 *   return json({ theme });
 * }
 *
 * // In an action for theme switching
 * export async function action({ request }: ActionArgs) {
 *   const { getTheme, setTheme } = await themeSessionResolver(request);
 *   const formData = await request.formData();
 *   const theme = formData.get("theme") as Theme;
 *   return json(
 *     { success: true },
 *     { headers: { "Set-Cookie": await setTheme(theme) } }
 *   );
 * }
 */
export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
