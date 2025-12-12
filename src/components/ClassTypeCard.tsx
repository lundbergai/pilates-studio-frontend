import { Edit2, Trash2 } from "lucide-react";
import type { IClassType } from "@/interfaces";

interface IClassTypeCardProps {
	classType: IClassType;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

export default function ClassTypeCard({ classType, onEdit, onDelete }: IClassTypeCardProps) {
	return (
		<div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-600 transition-colors">
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-2xl font-bold">{classType.title}</h3>
				<div className="flex gap-2">
					{onEdit && (
						<button
							onClick={() => onEdit(classType.id)}
							className="text-amber-200 hover:text-amber-400 transition-colors"
							aria-label="Edit class type"
						>
							<Edit2 size={20} />
						</button>
					)}
					{onDelete && (
						<button
							onClick={() => onDelete(classType.id)}
							className="text-rose-200 hover:text-rose-400 transition-colors"
							aria-label="Delete class type"
						>
							<Trash2 size={20} />
						</button>
					)}
				</div>
			</div>

			<p className="text-gray-400 mb-4">{classType.description}</p>

			<div className="flex gap-4 text-sm">
				<div>
					<span className="text-gray-500">Duration:</span>
					<p className="font-semibold">{classType.duration} min</p>
				</div>
				<div>
					<span className="text-gray-500">Capacity:</span>
					<p className="font-semibold">{classType.capacity}</p>
				</div>
			</div>
		</div>
	);
}
