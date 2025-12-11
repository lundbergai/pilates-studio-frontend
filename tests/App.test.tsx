import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../src/components/App";

global.fetch = vi.fn();

describe("App Tests", () => {
	test("App component renders", () => {
		vi.clearAllMocks();
		(global.fetch as any).mockResolvedValue({
			json: async () => await []
		});

		const queryClient = new QueryClient();

		const { container } = render(
			<ClerkProvider publishableKey={process.env.VITE_CLERK_PUBLISHABLE_KEY || ""}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ClerkProvider>
		);

		const appElement = container.querySelector("div");
		expect(appElement).toBeDefined();
	});
});
