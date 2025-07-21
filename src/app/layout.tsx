import "@/app/app.css";

import ClientRoot from "@/app/client-root";
import ReactQueryProvider from "@/components/providers/react-query-provider";

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
