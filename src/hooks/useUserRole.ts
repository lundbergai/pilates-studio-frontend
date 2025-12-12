import { useAuth } from "@clerk/clerk-react";

export function useUserRole() {
	const { sessionClaims } = useAuth();

	const isAdmin = (sessionClaims?.admin as boolean) || false;
	const isInstructor = (sessionClaims?.instructor as boolean) || false;
	const isMember = (sessionClaims?.member as boolean) || false;

	// Only admins can manage content
	const canManage = isAdmin;

	return {
		isAdmin,
		isInstructor,
		isMember,
		canManage
	};
}
