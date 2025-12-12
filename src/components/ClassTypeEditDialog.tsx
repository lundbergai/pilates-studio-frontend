import { useEffect, useState } from "react";
import type { IClassType, IUpdateClassTypeDto } from "@/interfaces";
import FormDialog from "./FormDialog";

interface IClassTypeEditDialogProps {
	isOpen: boolean;
	classType: IClassType | null;
	onClose: () => void;
	onSubmit: (id: number, data: IUpdateClassTypeDto) => void;
	isLoading?: boolean;
}

export default function ClassTypeEditDialog({ isOpen, classType, onClose, onSubmit, isLoading = false }: IClassTypeEditDialogProps) {
	const [formData, setFormData] = useState<IUpdateClassTypeDto>({
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
	}, [classType, isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (classType) {
			onSubmit(classType.id, formData);
		}
	};

	return (
		<FormDialog
			isOpen={isOpen}
			onOpenChange={onClose}
			title="Edit Class Type"
			onSubmit={handleSubmit}
			onCancel={onClose}
			isLoading={isLoading}
			submitLabel="Save"
		>
			<div className="space-y-4">
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
			</div>
		</FormDialog>
	);
}
