import { useEffect, useState } from "react";
import type { ICreateClassTypeDto, IUpdateClassTypeDto } from "@/interfaces";
import FormDialog from "./FormDialog";

interface IClassTypeDialogProps {
	isOpen: boolean;
	initialData?: {
		title: string;
		description: string;
		duration: number;
		capacity: number;
	} | null;
	title: string;
	submitLabel: string;
	onClose: () => void;
	onSubmit: (data: ICreateClassTypeDto | IUpdateClassTypeDto) => void;
	isLoading?: boolean;
}

export default function ClassTypeDialog({
	isOpen,
	initialData,
	title,
	submitLabel,
	onClose,
	onSubmit,
	isLoading = false
}: IClassTypeDialogProps) {
	const [formData, setFormData] = useState<ICreateClassTypeDto | IUpdateClassTypeDto>({
		title: "",
		description: "",
		duration: 60,
		capacity: 12
	});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		} else {
			setFormData({
				title: "",
				description: "",
				duration: 60,
				capacity: 12
			});
		}
	}, [initialData, isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<FormDialog
			isOpen={isOpen}
			onOpenChange={onClose}
			title={title}
			onSubmit={handleSubmit}
			onCancel={onClose}
			isLoading={isLoading}
			submitLabel={submitLabel}
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
