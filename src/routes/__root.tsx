import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navigation from "../components/Navigation";

export const Route = createRootRoute({
	component: () => (
		<div className="flex h-screen">
			<Navigation />
			<main className="flex-1 overflow-auto">
				<Outlet />
			</main>
		</div>
	)
});
