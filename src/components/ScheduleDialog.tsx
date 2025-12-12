import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ICreateScheduledClassDto, IUpdateScheduledClassDto } from "@/interfaces";
import { getAllClassTypes, getInstructors } from "@/services/apiService";
import FormDialog from "./FormDialog";
import { useAuth } from "@clerk/clerk-react";

interface IScheduleDialogProps {
	isOpen: boolean;
	initialData?: {
		classTypeId: number;
		instructorId: number;
		startTime: string;
	} | null;
	title: string;
	submitLabel: string;
	onClose: () => void;
	onSubmit: (data: ICreateScheduledClassDto | IUpdateScheduledClassDto) => void;
	isLoading?: boolean;
}

function formatToDatetimeLocal(isoString: string): string {
	if (!isoString) return "";
	return isoString.replace("Z", "").split(".")[0];
}

export default function ScheduleDialog({
	isOpen,
	initialData,
	title,
	submitLabel,
	onClose,
	onSubmit,
	isLoading = false
}: IScheduleDialogProps) {
	const { getToken } = useAuth();
	const [formData, setFormData] = useState<ICreateScheduledClassDto>({
		classTypeId: 0,
		instructorId: 0,
		startTime: ""
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Fetch class types
	const { data: classTypes = [], isLoading: classTypesLoading } = useQuery({
		queryKey: ["classTypes"],
		queryFn: async () => {
			const token = await getToken();
			return getAllClassTypes(token);
		}
	});

	// Fetch instructors
	const { data: instructors = [], isLoading: instructorsLoading } = useQuery({
		queryKey: ["instructors"],
		queryFn: async () => {
			const token = await getToken();
			return getInstructors(token);
		}
	});

	useEffect(() => {
		if (initialData) {
			setFormData({
				classTypeId: initialData.classTypeId,
				instructorId: initialData.instructorId,
				startTime: formatToDatetimeLocal(initialData.startTime)
			});
		} else {
			setFormData({
				classTypeId: 0,
				instructorId: 0,
				startTime: ""
			});
		}
		setErrors({});
	}, [initialData, isOpen]);

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (formData.classTypeId === 0) {
			newErrors.classTypeId = "Class type is required";
		}

		if (formData.instructorId === 0) {
			newErrors.instructorId = "Instructor is required";
		}

		if (!formData.startTime) {
			newErrors.startTime = "Start time is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	const dropdownClass =
		"w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-600 transition-colors";

	return (
		<FormDialog
			isOpen={isOpen}
			onOpenChange={onClose}
			title={title}
			onSubmit={handleSubmit}
			onCancel={onClose}
			isLoading={isLoading || classTypesLoading || instructorsLoading}
			submitLabel={submitLabel}
		>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1 text-gray-300">Class Type</label>
					<select
						value={formData.classTypeId}
						onChange={e => setFormData({ ...formData, classTypeId: parseInt(e.target.value) })}
						className={`${dropdownClass} ${errors.classTypeId ? "border-rose-500" : ""}`}
						required
						disabled={isLoading || classTypesLoading}
						autoFocus
					>
						<option value={0}>Select a class type...</option>
						{classTypes.map(classType => (
							<option key={classType.id} value={classType.id}>
								{classType.title} ({classType.duration} min)
							</option>
						))}
					</select>
					{errors.classTypeId && <p className="text-rose-400 text-sm mt-1">{errors.classTypeId}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-300">Instructor</label>
					<select
						value={formData.instructorId}
						onChange={e => setFormData({ ...formData, instructorId: parseInt(e.target.value) })}
						className={`${dropdownClass} ${errors.instructorId ? "border-rose-500" : ""}`}
						required
						disabled={isLoading || instructorsLoading}
					>
						<option value={0}>Select an instructor...</option>
						{instructors.map(instructor => (
							<option key={instructor.id} value={instructor.id}>
								{instructor.fullName}
							</option>
						))}
					</select>
					{errors.instructorId && <p className="text-rose-400 text-sm mt-1">{errors.instructorId}</p>}
				</div>

				<div>
					<label className="block text-sm font-medium mb-1 text-gray-300">Start Time</label>
					<input
						type="datetime-local"
						value={formData.startTime}
						onChange={e => setFormData({ ...formData, startTime: e.target.value })}
						className={`w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-600 transition-colors ${
							errors.startTime ? "border-rose-500" : ""
						}`}
						required
						disabled={isLoading}
					/>
					{errors.startTime && <p className="text-rose-400 text-sm mt-1">{errors.startTime}</p>}
				</div>
			</div>
		</FormDialog>
	);
}
