import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import type { IClassType } from "@/interfaces";

interface IClassTypeEditModalProps {
	isOpen: boolean;
	classType: IClassType | null;
	onClose: () => void;
	onSubmit: (id: number, data: Omit<IClassType, "id">) => void;
	isLoading?: boolean;
}

export default function ClassTypeEditModal({ isOpen, classType, onClose, onSubmit, isLoading = false }: IClassTypeEditModalProps) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		duration: 60,
		capacity: 12
	});

	useEffect(() => {
		if (classType) {
			setFormData({
				title: classType.title,
				description: classType.description,
				duration: classType.duration,
				capacity: classType.capacity
			});
		}
	}, [classType]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			return () => document.removeEventListener("keydown", handleEscape);
		}
	}, [isOpen, onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (classType) {
			onSubmit(classType.id, formData);
		}
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!isOpen || !classType) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
			<div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
				<h3 className="text-2xl font-bold mb-4">Edit Class Type</h3>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Title</label>
						<input
							type="text"
							value={formData.title}
							onChange={e => setFormData({ ...formData, title: e.target.value })}
							className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-600"
							required
							disabled={isLoading}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Description</label>
						<textarea
							value={formData.description}
							onChange={e => setFormData({ ...formData, description: e.target.value })}
							className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-600 resize-none"
							rows={3}
							required
							disabled={isLoading}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Duration (minutes)</label>
						<input
							type="number"
							value={formData.duration}
							onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
							className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-600"
							required
							disabled={isLoading}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Capacity</label>
						<input
							type="number"
							value={formData.capacity}
							onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
							className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-600"
							required
							disabled={isLoading}
						/>
					</div>

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
							disabled={isLoading}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
							disabled={isLoading}
						>
							{isLoading && <Loader size={16} className="animate-spin" />}
							{isLoading ? "Saving..." : "Save"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
