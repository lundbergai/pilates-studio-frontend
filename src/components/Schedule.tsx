import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader, Plus } from "lucide-react";
import type { IClass } from "@/interfaces";
import { getAllScheduledClasses } from "@/services/apiService";
import ClassCard from "./ClassCard";

export default function Schedule() {
	const [showScheduleModal, setShowScheduleModal] = useState(false);

	// Fetch all scheduled classes
	const {
		data: classes = [],
		isLoading,
		error
	} = useQuery({
		queryKey: ["scheduledClasses"],
		queryFn: getAllScheduledClasses
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

	const handleDelete = (id: number) => {
		// TODO: Implement delete functionality
		console.log("Delete class:", id);
	};

	const handleEdit = (id: number) => {
		// TODO: Implement edit modal
		console.log("Edit class:", id);
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
					onClick={() => setShowScheduleModal(true)}
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
								<ClassCard key={classItem.id} classData={classItem} onEdit={handleEdit} onDelete={handleDelete} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
