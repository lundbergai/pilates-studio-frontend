import { BookOpen, Globe, Home, Network } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export default function Navigation() {
	const { user } = useUser();

	return (
		<div className="flex h-screen">
			{/* Navigation */}
			<nav className="w-fit bg-gray-900 text-white shadow-2xl flex flex-col overflow-hidden">
				<div className="flex items-center justify-center p-4 border-b border-gray-700">
					<h2 className="text-2xl px-6 py-2 font-bold whitespace-nowrap">PILATES STUDIO</h2>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<Link
						to="/"
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 whitespace-nowrap"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2 whitespace-nowrap"
						}}
					>
						<Home size={20} />
						<span className="font-medium">Home</span>
					</Link>

					<Link
						to="/classtypes"
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 whitespace-nowrap"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2 whitespace-nowrap"
						}}
					>
						<BookOpen size={20} />
						<span className="font-medium">Class Types</span>
					</Link>

					<Link
						to="/clerk"
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 whitespace-nowrap"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2 whitespace-nowrap"
						}}
					>
						<Globe size={20} />
						<span className="font-medium">Clerk</span>
					</Link>

					<Link
						to="/tanstack-query"
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 whitespace-nowrap"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2 whitespace-nowrap"
						}}
					>
						<Network size={20} />
						<span className="font-medium">TanStack Query</span>
					</Link>
				</nav>

				<div className="p-4 border-t border-gray-700 bg-gray-800 flex flex-col gap-3">
					<SignedIn>
						<div className="flex items-center gap-3">
							<UserButton />
							<span className="text-sm font-medium">{user?.fullName}</span>
						</div>
					</SignedIn>
					<SignedOut>
						<SignInButton />
					</SignedOut>
				</div>
			</nav>

			{/* Main Content */}
			<div className="flex-1" />
		</div>
	);
}
