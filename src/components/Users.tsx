import { useState } from "react";
import { SignedIn, useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Loader, Plus, Search } from "lucide-react";
import { getAllUsers } from "@/services/apiService";
import UsersTable from "./UsersTable";

export default function Users() {
	const { getToken } = useAuth();
	const [searchQuery, setSearchQuery] = useState("");

	// Fetch all users
	const {
		data: users = [],
		isLoading,
		error
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const token = await getToken();
			return getAllUsers(token);
		}
	});

	// Filter users based on search
	const filteredUsers = users.filter(
		user =>
			user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleEdit = (id: number) => {
		// TODO: Implement edit modal
		console.log("Edit user:", id);
	};

	const handleDelete = (id: number) => {
		// TODO: Implement delete logic
		console.log("Delete user:", id);
	};

	const handleAddUser = () => {
		// TODO: Implement add user modal
		console.log("Add user");
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-[#282c34] text-white p-8 flex items-center justify-center">
				<div className="flex items-center gap-2">
					<Loader size={24} className="animate-spin" />
					<span>Loading users...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-[#282c34] text-white p-8 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-2">Error loading users</h2>
					<p className="text-gray-400">{error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<SignedIn>
			<div className="min-h-screen bg-[#282c34] text-white p-8">
				<div className="flex items-start justify-between mb-8">
					<div>
						<h1 className="text-5xl font-bold mb-2">Users</h1>
						<h2 className="text-xl text-gray-400">Manage studio members and staff</h2>
					</div>
					<button
						onClick={handleAddUser}
						className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
					>
						<Plus size={20} />
						Add User
					</button>
				</div>

				{/* Search */}
				<div className="mb-6">
					<div className="relative">
						<Search className="absolute left-3 top-3 text-gray-500" size={20} />
						<input
							type="text"
							placeholder="Search by name or email..."
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
						/>
					</div>
				</div>

				{/* Table */}
				<div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
					{filteredUsers.length > 0 ? (
						<UsersTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
					) : (
						<div className="p-8 text-center">
							<p className="text-gray-400">No users found matching your search.</p>
						</div>
					)}
				</div>
			</div>
		</SignedIn>
	);
}
