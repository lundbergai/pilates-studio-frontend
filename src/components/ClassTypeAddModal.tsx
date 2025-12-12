import { useState } from "react";
import { Loader } from "lucide-react";
import type { ICreateClassTypeDto } from "@/interfaces";
import Dialog from "./Dialog";

interface IClassTypeAddModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: ICreateClassTypeDto) => void;
	isLoading?: boolean;
}

export default function ClassTypeAddModal({ isOpen, onClose, onSubmit, isLoading = false }: IClassTypeAddModalProps) {
	const [formData, setFormData] = useState<ICreateClassTypeDto>({
		title: "",
		description: "",
		duration: 60,
		capacity: 12
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		setFormData({ title: "", description: "", duration: 60, capacity: 12 });
	};

	return (
		<Dialog isOpen={isOpen} onOpenChange={onClose} title="Add Class Type">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1 text-gray-300">Title</label>
					<input
						type="text"
						value={formData.title}
						onChange={e => setFormData({ ...formData, title: e.target.value })}
						className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
						required
						disabled={isLoading}
						autoFocus
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
					<textarea
						value={formData.description}
						onChange={e => setFormData({ ...formData, description: e.target.value })}
						className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors resize-none"
						rows={3}
						required
						disabled={isLoading}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-300">Duration (minutes)</label>
					<input
						type="number"
						value={formData.duration}
						onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
						className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
						required
						disabled={isLoading}
						min="1"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-300">Capacity</label>
					<input
						type="number"
						value={formData.capacity}
						onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
						className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
						required
						disabled={isLoading}
						min="1"
					/>
				</div>

				<div className="flex gap-3 pt-4">
					<button
						type="button"
						onClick={() => onClose()}
						className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 text-white"
						disabled={isLoading}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 text-white"
						disabled={isLoading}
					>
						{isLoading && <Loader size={16} className="animate-spin" />}
						{isLoading ? "Adding..." : "Add"}
					</button>
				</div>
			</form>
		</Dialog>
	);
}
