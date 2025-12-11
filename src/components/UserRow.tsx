import { Edit2, Trash2 } from "lucide-react";
import type { IUser } from "@/interfaces";

interface IUserRowProps {
	user: IUser;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

export default function UserRow({ user, onEdit, onDelete }: IUserRowProps) {
	const getRoleBadgeColor = (role: string | null) => {
		switch (role) {
			case "admin":
				return "bg-red-900 text-red-200";
			case "instructor":
				return "bg-blue-900 text-blue-200";
			case "member":
				return "bg-green-900 text-green-200";
			default:
				return "bg-gray-700 text-gray-300";
		}
	};

	const getRoleLabel = (role: string | null) => {
		return role ? role.charAt(0).toUpperCase() + role.slice(1) : "Unassigned";
	};

	return (
		<tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
			<td className="px-6 py-4 text-white">{user.fullName}</td>
			<td className="px-6 py-4 text-gray-300">{user.email}</td>
			<td className="px-6 py-4">
				<span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getRoleBadgeColor(user.role)}`}>
					{getRoleLabel(user.role)}
				</span>
			</td>
			<td className="px-6 py-4 text-gray-400 text-sm font-mono">
				{user.clerkUserId ? user.clerkUserId.substring(0, 8) + "..." : "—"}
			</td>
			<td className="px-6 py-4">
				<div className="flex gap-3">
					{onEdit && (
						<button
							onClick={() => onEdit(user.id)}
							className="text-amber-200 hover:text-amber-400 transition-colors"
							aria-label="Edit user"
						>
							<Edit2 size={18} />
						</button>
					)}
					{onDelete && (
						<button
							onClick={() => onDelete(user.id)}
							className="text-rose-200 hover:text-rose-400 transition-colors"
							aria-label="Delete user"
						>
							<Trash2 size={18} />
						</button>
					)}
				</div>
			</td>
		</tr>
	);
}
