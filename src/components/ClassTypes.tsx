import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import type { IClassType } from "@/interfaces";
import classTypesData from "../data/classtypes.json";

export default function ClassTypes() {
	const [classTypes, setClassTypes] = useState<IClassType[]>(classTypesData);
	const [showAddModal, setShowAddModal] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);

	const handleDelete = (id: number) => {
		setClassTypes(classTypes.filter(ct => ct.id !== id));
	};

	return (
		<div className="min-h-screen bg-[#282c34] text-white p-8">
			<div className="mb-8">
				<h1 className="text-5xl font-bold mb-2">Class Types</h1>
				<h2 className="text-xl text-gray-400">Manage your studio's class offerings</h2>
			</div>

			<button
				onClick={() => setShowAddModal(true)}
				className="mb-8 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold transition-colors"
			>
				<Plus size={20} />
				Add Class Type
			</button>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{classTypes.map(classType => (
					<div
						key={classType.id}
						className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-600 transition-colors"
					>
						<h3 className="text-2xl font-bold mb-2">{classType.title}</h3>
						<p className="text-gray-400 mb-4">{classType.description}</p>

						<div className="flex gap-4 mb-6 text-sm">
							<div>
								<span className="text-gray-500">Duration:</span>
								<p className="font-semibold">{classType.duration} min</p>
							</div>
							<div>
								<span className="text-gray-500">Capacity:</span>
								<p className="font-semibold">{classType.capacity}</p>
							</div>
						</div>

						<div className="flex gap-3">
							<button
								onClick={() => setEditingId(classType.id)}
								className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors text-amber-200"
							>
								<Edit2 size={18} />
								Edit
							</button>
							<button
								onClick={() => handleDelete(classType.id)}
								className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors text-rose-200"
							>
								<Trash2 size={18} />
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{showAddModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
					<div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
						<h3 className="text-2xl font-bold mb-4">Add Class Type</h3>
						<p className="text-gray-400">Modal coming soon...</p>
						<button
							onClick={() => setShowAddModal(false)}
							className="mt-4 w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
						>
							Close
						</button>
					</div>
				</div>
			)}

			{editingId && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
					<div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
						<h3 className="text-2xl font-bold mb-4">Edit Class Type</h3>
						<p className="text-gray-400">Modal coming soon...</p>
						<button
							onClick={() => setEditingId(null)}
							className="mt-4 w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
