import { useState } from "react";
import { Plus } from "lucide-react";
import type { IClassType } from "@/interfaces";
import classTypesData from "../data/classtypes.json";
import ClassTypeCard from "./ClassTypeCard";
import ClassTypeAddModal from "./ClassTypeAddModal";
import ClassTypeEditModal from "./ClassTypeEditModal";

export default function ClassTypes() {
	const [classTypes, setClassTypes] = useState<IClassType[]>(classTypesData);
	const [showAddModal, setShowAddModal] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);

	const editingClassType = classTypes.find(ct => ct.id === editingId) || null;

	const handleDelete = (id: number) => {
		setClassTypes(classTypes.filter(ct => ct.id !== id));
	};

	const handleAddSubmit = (data: Omit<IClassType, "id">) => {
		const newClassType: IClassType = {
			...data,
			id: Math.max(...classTypes.map(ct => ct.id), 0) + 1
		};
		setClassTypes([...classTypes, newClassType]);
		setShowAddModal(false);
	};

	const handleEditSubmit = (id: number, data: Omit<IClassType, "id">) => {
		setClassTypes(classTypes.map(ct => (ct.id === id ? { ...data, id } : ct)));
		setEditingId(null);
	};

	return (
		<div className="min-h-screen bg-[#282c34] text-white p-8">
			<div className="flex items-start justify-between mb-8">
				<div>
					<h1 className="text-5xl font-bold mb-2">Class Types</h1>
					<h2 className="text-xl text-gray-400">Manage your studio's class offerings</h2>
				</div>
				<button
					onClick={() => setShowAddModal(true)}
					className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
				>
					<Plus size={20} />
					Add Class Type
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{classTypes.map(classType => (
					<ClassTypeCard key={classType.id} classType={classType} onEdit={setEditingId} onDelete={handleDelete} />
				))}
			</div>

			<ClassTypeAddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleAddSubmit} />

			<ClassTypeEditModal
				isOpen={editingId !== null}
				classType={editingClassType}
				onClose={() => setEditingId(null)}
				onSubmit={handleEditSubmit}
			/>
		</div>
	);
}
