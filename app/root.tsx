// import NProgress from "nprogress";
// import nProgressStyles from "nprogress/nprogress.css?url";
import { ToastProvider } from "@radix-ui/react-toast";
import React, { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { Provider } from "react-redux";

import type { Route } from "./+types/root";

import "~/app.css";

import { themeSessionResolver } from "~/api/theme-session.server";
import { cn } from "~/lib/helpers";
import { store } from "~/store/store";

{/* Remix-style) convention for defining which external resources */}
export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
  },
  // { rel: "stylesheet", href: nProgressStyles },
];

export async function loader({ request }: Route.LoaderArgs) {
   const [{ getTheme }] = await Promise.all([
    themeSessionResolver(request),
  ]);

  return {
    theme: getTheme(),
  };
}

/**
 * Primary Layout Component
 *
 * This component wraps the entire application with the ThemeProvider
 * to enable dark/light mode functionality. It retrieves theme preferences
 * from the root loader data and provides a theme switching API endpoint.
 *
 * @param children - Child components to render within the layout
 */
export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData("root");

  return (
    <ThemeProvider
      specifiedTheme={data?.theme ?? "dark"} // Default to dark theme if none is specified
      themeAction="/api/settings/theme" // API endpoint for changing theme
    >
      <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  );
}

/**
 * Inner Layout Component
 *
 * This component handles the HTML structure of the application and applies:
 * - Language direction (RTL/LTR) based on the current locale
 * - Theme class to the HTML element
 * - Special handling for pre-rendered routes (blog, legal pages)
 * - Loading of analytics and customer support scripts
 *
 * @param children - Child components to render within the layout
 */
function InnerLayout({ children }: { children: React.ReactNode }) {
  const [theme] = useTheme();
  const data = useRouteLoaderData<typeof loader>("root");

  useEffect(() => {
    // Prevent pull-to-refresh on mobile when at top
    const maybePrevent = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches[0].clientY > 0) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', maybePrevent, { passive: false });
    return () => {
      document.removeEventListener('touchmove', maybePrevent);
    };
  }, []);

  return (
    <html
      className={cn(theme ?? "", "h-full")}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data?.theme)} />
      </head>
      <body className="bg-gradient h-fit">
        {children}
        <ToastProvider/>
        <ScrollRestoration />
        <Scripts />
        {import.meta.env.VITE_GOOGLE_TAG_ID &&
          import.meta.env.VITE_GOOGLE_TAG_ID !== "" && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_TAG_ID}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${import.meta.env.VITE_GOOGLE_TAG_ID}');`,
                }}
              />
            </>
          )}
        {import.meta.env.VITE_CHANNEL_PLUGIN_KEY &&
          import.meta.env.VITE_CHANNEL_PLUGIN_KEY !== "" && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
            ChannelIO('boot', {
              "pluginKey": "${import.meta.env.VITE_CHANNEL_PLUGIN_KEY}"
            });
`,
              }}
            ></script>
          )}
      </body>
    </html>
  );
}



export default function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

