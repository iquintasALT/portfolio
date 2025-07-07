import "./app.css";

import ClientRoot from "./ClientRoot";
import ReactQueryProvider from "./ReactQueryProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ReactQueryProvider>
          <ClientRoot>{children}</ClientRoot>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
