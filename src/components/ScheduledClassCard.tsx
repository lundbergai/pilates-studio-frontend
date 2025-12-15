import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock, Edit2, MapPin, Trash2, User } from "lucide-react";
import type { IClass } from "@/interfaces";
import { bookClass, cancelBooking, getUserBookings } from "@/services/apiService";
import { useUserRole } from "@/hooks/useUserRole";

interface IClassCardProps {
	classData: IClass;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

export default function ClassCard({ classData, onEdit, onDelete }: IClassCardProps) {
	const { isMember } = useUserRole();
	const { getToken } = useAuth();
	const { user } = useUser();
	const queryClient = useQueryClient();
	const [optimisticBooked, setOptimisticBooked] = useState(false);

	const startDate = new Date(classData.startTime);
	const endDate = new Date(startDate.getTime() + classData.classTypeDuration * 60000);
	const availableSpots = classData.classTypeCapacity - classData.bookedSpots;
	const isFull = availableSpots === 0;

	// Check if user has booked this class
	const { data: userBookings = [] } = useQuery({
		queryKey: ["userBookings", user?.id],
		queryFn: async () => {
			const token = await getToken();
			return getUserBookings(token);
		},
		enabled: isMember && !!user
	});

	const isBooked = optimisticBooked || userBookings.some(booking => booking.scheduledClassId === classData.id);
	const bookingId = userBookings.find(booking => booking.scheduledClassId === classData.id)?.id;

	// Book class mutation with optimistic update
	const bookMutation = useMutation({
		mutationFn: async () => {
			const token = await getToken();
			return bookClass(classData.id, token);
		},
		onMutate: () => {
			setOptimisticBooked(true);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userBookings"] });
		},
		onError: () => {
			setOptimisticBooked(false);
		}
	});

	// Cancel booking mutation with optimistic update
	const cancelMutation = useMutation({
		mutationFn: async () => {
			if (!bookingId) return;
			const token = await getToken();
			return cancelBooking(bookingId, token);
		},
		onMutate: () => {
			setOptimisticBooked(false);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userBookings"] });
		},
		onError: () => {
			setOptimisticBooked(true);
		}
	});

	const isLoading = bookMutation.isPending || cancelMutation.isPending;

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
	};

	return (
		<div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-600 transition-colors">
			<div className="flex items-baseline justify-between mb-3">
				<div>
					<h3 className="text-2xl font-bold mb-1">{classData.classTypeName}</h3>
					<p className="text-gray-400 text-sm">{formatDate(startDate)}</p>
				</div>
				{(onEdit || onDelete) && (
					<div className="flex gap-2">
						{onEdit && (
							<button
								onClick={() => onEdit(classData.id)}
								className="text-amber-200 hover:text-amber-400 transition-colors"
								aria-label="Edit class"
								disabled={isLoading}
							>
								<Edit2 size={20} />
							</button>
						)}
						{onDelete && (
							<button
								onClick={() => onDelete(classData.id)}
								className="text-rose-200 hover:text-rose-400 transition-colors"
								aria-label="Delete class"
								disabled={isLoading}
							>
								<Trash2 size={20} />
							</button>
						)}
					</div>
				)}
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

			<div className="w-full bg-gray-700 rounded-full h-2 mb-4">
				<div
					className="bg-cyan-600 h-2 rounded-full"
					style={{ width: `${(classData.bookedSpots / classData.classTypeCapacity) * 100}%` }}
				/>
			</div>

			{isMember && (
				<button
					onClick={() => (isBooked ? cancelMutation.mutate() : bookMutation.mutate())}
					disabled={(!isBooked && isFull) || isLoading}
					className={`w-full py-2 rounded-lg font-semibold transition-colors ${
						isBooked
							? "bg-rose-600 hover:bg-rose-700 text-white disabled:bg-rose-600 disabled:opacity-75"
							: isFull
								? "bg-gray-700 text-gray-500 cursor-not-allowed"
								: "bg-green-600 hover:bg-green-700 text-white disabled:bg-green-600 disabled:opacity-75"
					}`}
				>
					{isBooked ? "Unbook" : "Book Spot"}
				</button>
			)}
		</div>
	);
}
