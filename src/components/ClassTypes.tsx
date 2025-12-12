import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, Plus } from "lucide-react";
import ClassTypeDialog from "./ClassTypeDialog";
import ClassTypeCard from "./ClassTypeCard";
import type { ICreateClassTypeDto, IUpdateClassTypeDto } from "@/interfaces";
import { createClassType, deleteClassType, getAllClassTypes, updateClassType } from "@/services/apiService";
import { SignedIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

export default function ClassTypes() {
	const queryClient = useQueryClient();
	const [showDialog, setShowDialog] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const { getToken } = useAuth();

	// Fetch all class types
	const {
		data: classTypes = [],
		isLoading,
		error
	} = useQuery({
		queryKey: ["classTypes"],
		queryFn: async () => {
			const token = await getToken();
			return getAllClassTypes(token);
		}
	});

	const editingClassType = classTypes.find(ct => ct.id === editingId) || null;

	// Delete mutation
	const deleteMutation = useMutation({
		mutationFn: async (id: number) => {
			const token = await getToken();
			return deleteClassType(id, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["classTypes"] });
		}
	});

	// Create mutation
	const createMutation = useMutation({
		mutationFn: async (data: ICreateClassTypeDto) => {
			const token = await getToken();
			return createClassType(data, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["classTypes"] });
			setShowDialog(false);
		}
	});

	// Update mutation
	const updateMutation = useMutation({
		mutationFn: async ({ id, data }: { id: number; data: IUpdateClassTypeDto }) => {
			const token = await getToken();
			return updateClassType(id, data, token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["classTypes"] });
			setEditingId(null);
			setShowDialog(false);
		}
	});

	const handleDelete = (id: number) => {
		deleteMutation.mutate(id);
	};

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

	const handleAdd = (data: ICreateClassTypeDto) => {
		createMutation.mutate(data);
	};

	const handleEdit = (id: number, data: IUpdateClassTypeDto) => {
		updateMutation.mutate({ id, data });
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-[#282c34] text-white p-8 flex items-center justify-center">
				<div className="flex items-center gap-2">
					<Loader size={24} className="animate-spin" />
					<span>Loading class types...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-[#282c34] text-white p-8 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-2">Error loading class types</h2>
					<p className="text-gray-400">{error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<SignedIn>
			<div className="min-h-screen bg-[#282c34] text-white p-8">
				<div className="flex items-start justify-between mb-8">
					<div>
						<h1 className="text-5xl font-bold mb-2">Class Types</h1>
						<h2 className="text-xl text-gray-400">Manage your studio's class offerings</h2>
					</div>
					<button
						onClick={handleOpenAddDialog}
						className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
					>
						<Plus size={20} />
						Add Class Type
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{classTypes.map(classType => (
						<ClassTypeCard key={classType.id} classType={classType} onEdit={handleOpenEditDialog} onDelete={handleDelete} />
					))}
				</div>

				<ClassTypeDialog
					isOpen={showDialog}
					initialData={
						editingClassType
							? {
									title: editingClassType.title,
									description: editingClassType.description,
									duration: editingClassType.duration,
									capacity: editingClassType.capacity
								}
							: null
					}
					title={editingId !== null ? "Edit Class Type" : "Add Class Type"}
					submitLabel={editingId !== null ? "Save" : "Add"}
					onClose={handleCloseDialog}
					onSubmit={data => {
						if (editingId !== null) {
							handleEdit(editingId, data as IUpdateClassTypeDto);
						} else {
							handleAdd(data as ICreateClassTypeDto);
						}
					}}
					isLoading={createMutation.isPending || updateMutation.isPending}
				/>
			</div>
		</SignedIn>
	);
}
