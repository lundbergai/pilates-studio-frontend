import { useUser } from "@clerk/clerk-react";

export default function ClerkDemo() {
	const { isSignedIn, user, isLoaded } = useUser();

	if (!isLoaded) {
		return <div className="p-4">Loading...</div>;
	}

	if (!isSignedIn) {
		return <div className="p-4">Sign in to view this page</div>;
	}

	return <div className="p-4">Hello {user.firstName}!</div>;
}
