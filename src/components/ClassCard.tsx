import { Clock, MapPin, User } from "lucide-react";
import type { IClass } from "@/interfaces";

interface IClassCardProps {
	classData: IClass;
}

export default function ClassCard({ classData }: IClassCardProps) {
	const startDate = new Date(classData.startTime);
	const endDate = new Date(startDate.getTime() + classData.classTypeDuration * 60000);
	const availableSpots = classData.classTypeCapacity - classData.bookedSpots;

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
	};

	return (
		<div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-600 transition-colors">
			<div className="mb-3">
				<h3 className="text-2xl font-bold mb-1">{classData.classTypeName}</h3>
				<p className="text-gray-400 text-sm">{formatDate(startDate)}</p>
			</div>

			<div className="space-y-3 mb-4">
				<div className="flex items-center gap-2 text-gray-300">
					<Clock size={18} className="text-cyan-600" />
					<span>
						{formatTime(startDate)} - {formatTime(endDate)}
					</span>
				</div>
				<div className="flex items-center gap-2 text-gray-300">
					<User size={18} className="text-cyan-600" />
					<span>{classData.instructor}</span>
				</div>
				<div className="flex items-center gap-2 text-gray-300">
					<MapPin size={18} className="text-cyan-600" />
					<span>
						{availableSpots} / {classData.classTypeCapacity} spots available
					</span>
				</div>
			</div>

			<div className="w-full bg-gray-700 rounded-full h-2">
				<div
					className="bg-cyan-600 h-2 rounded-full"
					style={{ width: `${(classData.bookedSpots / classData.classTypeCapacity) * 100}%` }}
				/>
			</div>
		</div>
	);
}
