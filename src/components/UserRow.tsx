import type { IUser } from "@/interfaces";

interface IUserRowProps {
	user: IUser;
}

export default function UserRow({ user }: IUserRowProps) {
	// Get array of roles for this user
	const getRoles = (userData: IUser): Array<string> => {
		const roles: Array<string> = [];
		if (userData.isAdmin) roles.push("Admin");
		if (userData.isInstructor) roles.push("Instructor");
		if (userData.isMember) roles.push("Member");
		return roles;
	};

	const roles = getRoles(user);
	const isUnassigned = roles.length === 0;

	return (
		<tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
			<td className="px-6 py-4 text-white">{user.fullName}</td>
			<td className="px-6 py-4 text-gray-300">{user.email}</td>
			<td className="px-6 py-4">
				{isUnassigned ? (
					<span className="inline-block px-3 py-1 rounded text-sm font-medium bg-gray-700 text-gray-300">Unassigned</span>
				) : (
					<div className="flex gap-2 flex-wrap">
						{roles.map(role => (
							<span
								key={role}
								className={`inline-block px-3 py-1 rounded text-sm font-medium ${
									role === "Admin"
										? "bg-red-900 text-red-200"
										: role === "Instructor"
											? "bg-blue-900 text-blue-200"
											: "bg-green-900 text-green-200"
								}`}
							>
								{role}
							</span>
						))}
					</div>
				)}
			</td>
			<td className="px-6 py-4 text-gray-400 text-sm font-mono">
				{user.clerkUserId ? user.clerkUserId.substring(0, 8) + "..." : "—"}
			</td>
		</tr>
	);
}
