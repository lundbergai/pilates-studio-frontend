import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, Plus } from "lucide-react";
import type { IClass, ICreateScheduledClassDto, IUpdateScheduledClassDto } from "@/interfaces";
import { getAllScheduledClasses, createScheduledClass, updateScheduledClass, deleteScheduledClass } from "@/services/apiService";
import ScheduledClassCard from "./ScheduledClassCard";
import ScheduleDialog from "./ScheduleDialog";

export default function Schedule() {
	const { getToken } = useAuth();
	const queryClient = useQueryClient();
	const [showDialog, setShowDialog] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);

	// Fetch all scheduled classes with optional token
	const {
		data: classes = [],
		isLoading,
		error
	} = useQuery({
		queryKey: ["scheduledClasses"],
		queryFn: async () => {
			const token = await getToken();
			return getAllScheduledClasses(token);
		}
	});

	const editingClass = classes.find(c => c.id === editingId) || null;

	// Create mutation
	const createMutation = useMutation({
		mutationFn: async (data: ICreateScheduledClassDto) => {
			const token = await getToken();
			return createScheduledClass(data, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["scheduledClasses"] });
			setShowDialog(false);
		}
	});

	// Update mutation
	const updateMutation = useMutation({
		mutationFn: async ({ id, data }: { id: number; data: IUpdateScheduledClassDto }) => {
			const token = await getToken();
			return updateScheduledClass(id, data, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["scheduledClasses"] });
			setEditingId(null);
			setShowDialog(false);
		}
	});

	// Delete mutation
	const deleteMutation = useMutation({
		mutationFn: async (id: number) => {
			const token = await getToken();
			return deleteScheduledClass(id, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["scheduledClasses"] });
		}
	});

	// Sort classes by start time
	const sortedClasses = [...classes].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

	// Group classes by date
	const classesGroupedByDate: Record<string, IClass[]> = {};
	sortedClasses.forEach(classItem => {
		const date = new Date(classItem.startTime).toLocaleDateString("en-US", {
			weekday: "long",
			month: "long",
			day: "numeric"
		});

		if (!classesGroupedByDate[date]) {
			classesGroupedByDate[date] = [];
		}

		classesGroupedByDate[date].push(classItem);
	});

	// Get all dates as an array
	const dates = Object.keys(classesGroupedByDate);

	const handleOpenAddDialog = () => {
		setEditingId(null);
		setShowDialog(true);
	};

	const handleOpenEditDialog = (id: number) => {
		setEditingId(id);
		setShowDialog(true);
	};

	const handleCloseDialog = () => {
		setShowDialog(false);
		setEditingId(null);
	};

	const handleDelete = (id: number) => {
		deleteMutation.mutate(id);
	};

	const handleAdd = (data: ICreateScheduledClassDto) => {
		createMutation.mutate(data);
	};

	const handleEdit = (data: IUpdateScheduledClassDto) => {
		if (editingId !== null) {
			updateMutation.mutate({ id: editingId, data });
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-[#282c34] text-white p-8 flex items-center justify-center">
				<div className="flex items-center gap-2">
					<Loader size={24} className="animate-spin" />
					<span>Loading class schedule...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-[#282c34] text-white p-8 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-2">Error loading class schedule</h2>
					<p className="text-gray-400">{error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#282c34] text-white p-8">
			<div className="flex items-start justify-between mb-8">
				<div>
					<h1 className="text-5xl font-bold mb-2">Class Schedule</h1>
					<h2 className="text-xl text-gray-400">View and manage weekly classes</h2>
				</div>
				<button
					onClick={handleOpenAddDialog}
					className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
				>
					<Plus size={20} />
					Schedule Class
				</button>
			</div>

			<div className="space-y-8">
				{dates.map(date => (
					<div key={date}>
						<h3 className="text-2xl font-bold mb-4 text-cyan-600">{date}</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{classesGroupedByDate[date].map(classItem => (
								<ScheduledClassCard
									key={classItem.id}
									classData={classItem}
									onEdit={handleOpenEditDialog}
									onDelete={handleDelete}
								/>
							))}
						</div>
					</div>
				))}
			</div>

			<ScheduleDialog
				isOpen={showDialog}
				initialData={
					editingClass
						? {
								classTypeId: editingClass.classTypeId,
								instructorId: editingClass.instructorId,
								startTime: editingClass.startTime
							}
						: null
				}
				title={editingId !== null ? "Edit Scheduled Class" : "Schedule New Class"}
				submitLabel={editingId !== null ? "Save" : "Schedule"}
				onClose={handleCloseDialog}
				onSubmit={data => {
					if (editingId !== null) {
						handleEdit(data as IUpdateScheduledClassDto);
					} else {
						handleAdd(data as ICreateScheduledClassDto);
					}
				}}
				isLoading={createMutation.isPending || updateMutation.isPending}
			/>
		</div>
	);
}
