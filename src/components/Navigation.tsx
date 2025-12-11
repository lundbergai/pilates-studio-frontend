import { BookOpen, Globe, Home, Menu, Users as UsersIcon, X } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function Navigation() {
	const { user } = useUser();
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const navLinkClass = "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2 whitespace-nowrap";
	const navLinkActiveClass =
		"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2 whitespace-nowrap";

	return (
		<div className="flex h-screen">
			{/* Mobile Menu Button */}
			<button
				onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
				className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded-lg"
			>
				{isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Mobile Backdrop */}
			{isMobileNavOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsMobileNavOpen(false)} />}

			{/* Navigation */}
			<nav
				className={`fixed md:relative w-fit bg-gray-900 text-white shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 z-40 ${
					isMobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
				} h-screen`}
			>
				<div className="flex items-center justify-center p-4 border-b border-gray-700">
					<h2 className="text-2xl px-6 py-2 font-bold whitespace-nowrap">PILATES STUDIO</h2>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<Link
						to="/"
						onClick={() => setIsMobileNavOpen(false)}
						className={navLinkClass}
						activeProps={{
							className: navLinkActiveClass
						}}
					>
						<Home size={20} />
						<span className="font-medium">Schedule</span>
					</Link>

					<Link
						to="/classtypes"
						onClick={() => setIsMobileNavOpen(false)}
						className={navLinkClass}
						activeProps={{
							className: navLinkActiveClass
						}}
					>
						<BookOpen size={20} />
						<span className="font-medium">Class Types</span>
					</Link>

					<Link
						to="/users"
						onClick={() => setIsMobileNavOpen(false)}
						className={navLinkClass}
						activeProps={{
							className: navLinkActiveClass
						}}
					>
						<UsersIcon size={20} />
						<span className="font-medium">Users</span>
					</Link>

					<Link
						to="/clerk"
						onClick={() => setIsMobileNavOpen(false)}
						className={navLinkClass}
						activeProps={{
							className: navLinkActiveClass
						}}
					>
						<Globe size={20} />
						<span className="font-medium">Clerk</span>
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
