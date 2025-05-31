import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./app";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Toaster richColors />
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</StrictMode>,
	);
} else {
	throw new Error("Root element with id 'root' not found");
}
