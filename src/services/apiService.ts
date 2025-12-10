import type { IClassType, ICreateClassTypeDto, IUpdateClassTypeDto } from "@/interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllClassTypes(): Promise<Array<IClassType>> {
	const response = await fetch(`${API_BASE_URL}/classtypes`);
	if (!response.ok) throw new Error("Failed to fetch class types");

	return response.json();
}

export async function getClassTypeById(id: number): Promise<IClassType> {
	const response = await fetch(`${API_BASE_URL}/classtypes/${id}`);
	if (!response.ok) throw new Error("Failed to fetch class type");

	return response.json();
}

export async function createClassType(data: ICreateClassTypeDto): Promise<IClassType> {
	const response = await fetch(`${API_BASE_URL}/classtypes`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	if (!response.ok) throw new Error("Failed to create class type");

	return response.json();
}

export async function updateClassType(id: number, data: IUpdateClassTypeDto): Promise<IClassType> {
	const response = await fetch(`${API_BASE_URL}/classtypes/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	});
	if (!response.ok) throw new Error("Failed to update class type");

	return response.json();
}

export async function deleteClassType(id: number): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/classtypes/${id}`, {
		method: "DELETE"
	});
	if (!response.ok) throw new Error("Failed to delete class type");
}
