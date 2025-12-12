import type { IUser } from "@/interfaces";
import UserRow from "./UserRow";

interface IUsersTableProps {
	users: IUser[];
}

export default function UsersTable({ users }: IUsersTableProps) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="border-b border-gray-700 bg-gray-900">
						<th className="px-6 py-4 font-semibold text-gray-300">Full Name</th>
						<th className="px-6 py-4 font-semibold text-gray-300">Email</th>
						<th className="px-6 py-4 font-semibold text-gray-300">Roles</th>
						<th className="px-6 py-4 font-semibold text-gray-300">Clerk ID</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<UserRow key={user.id} user={user} />
					))}
				</tbody>
			</table>
		</div>
	);
}
