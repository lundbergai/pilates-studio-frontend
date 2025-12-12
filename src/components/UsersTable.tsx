import type { IUser } from "@/interfaces";
import UserRow from "./UserRow";

interface IUsersTableProps {
	users: IUser[];
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

export default function UsersTable({ users, onEdit, onDelete }: IUsersTableProps) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="border-b border-gray-700 bg-gray-900">
						<th className="px-6 py-4 font-semibold text-gray-300">Full Name</th>
						<th className="px-6 py-4 font-semibold text-gray-300">Email</th>
						<th className="px-6 py-4 font-semibold text-gray-300">Roles</th>
						<th className="px-6 py-4 font-semibold text-gray-300">Clerk ID</th>
						<th className="px-6 py-4 font-semibold text-gray-300">Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
					))}
				</tbody>
			</table>
		</div>
	);
}
