import type {
	IClass,
	IClassType,
	ICreateClassTypeDto,
	IUpdateClassTypeDto,
	ICreateScheduledClassDto,
	IUpdateScheduledClassDto,
	IInstructor,
	IUser,
	IClassBooking
} from "@/interfaces";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to create auth headers with optional token
function getAuthHeaders(token?: string | null): HeadersInit {
	const headers: HeadersInit = {
		"Content-Type": "application/json"
	};

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}

	return headers;
}

// Class Types (requires token)
export async function getAllClassTypes(token?: string | null): Promise<Array<IClassType>> {
	const response = await fetch(`${API_BASE_URL}/classtypes`, {
		headers: getAuthHeaders(token)
	});
	if (!response.ok) throw new Error("Failed to fetch class types");

	return response.json();
}

export async function createClassType(data: ICreateClassTypeDto, token?: string | null): Promise<IClassType> {
	const response = await fetch(`${API_BASE_URL}/classtypes`, {
		method: "POST",
		headers: getAuthHeaders(token),
		body: JSON.stringify(data)
	});
	if (!response.ok) throw new Error("Failed to create class type");

	return response.json();
}

export async function updateClassType(id: number, data: IUpdateClassTypeDto, token?: string | null): Promise<IClassType> {
	const response = await fetch(`${API_BASE_URL}/classtypes/${id}`, {
		method: "PATCH",
		headers: getAuthHeaders(token),
		body: JSON.stringify(data)
	});
	if (!response.ok) throw new Error("Failed to update class type");

	return response.json();
}

export async function deleteClassType(id: number, token?: string | null): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/classtypes/${id}`, {
		method: "DELETE",
		headers: getAuthHeaders(token)
	});
	if (!response.ok) throw new Error("Failed to delete class type");
}

// Scheduled Classes (token optional)
export async function getAllScheduledClasses(token?: string | null): Promise<Array<IClass>> {
	const response = await fetch(`${API_BASE_URL}/scheduledclasses`, {
		headers: getAuthHeaders(token)
	});
	if (!response.ok) throw new Error("Failed to fetch scheduled classes");

	return response.json();
}

export async function createScheduledClass(data: ICreateScheduledClassDto, token?: string | null): Promise<IClass> {
	const response = await fetch(`${API_BASE_URL}/scheduledclasses`, {
		method: "POST",
		headers: getAuthHeaders(token),
		body: JSON.stringify(data)
	});
	if (!response.ok) throw new Error("Failed to create scheduled class");

	return response.json();
}

export async function updateScheduledClass(id: number, data: IUpdateScheduledClassDto, token?: string | null): Promise<IClass> {
	const response = await fetch(`${API_BASE_URL}/scheduledclasses/${id}`, {
		method: "PATCH",
		headers: getAuthHeaders(token),
		body: JSON.stringify(data)
	});
	if (!response.ok) throw new Error("Failed to update scheduled class");

	return response.json();
}

export async function deleteScheduledClass(id: number, token?: string | null): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/scheduledclasses/${id}`, {
		method: "DELETE",
		headers: getAuthHeaders(token)
	});
	if (!response.ok) throw new Error("Failed to delete scheduled class");
}

// Instructors
export async function getInstructors(token?: string | null): Promise<Array<IInstructor>> {
	const response = await fetch(`${API_BASE_URL}/users/instructors`, {
		headers: getAuthHeaders(token)
	});
	if (!response.ok) throw new Error("Failed to fetch instructors");

	return response.json();
}

// Users
export async function getAllUsers(token?: string | null): Promise<Array<IUser>> {
	const response = await fetch(`${API_BASE_URL}/users`, {
		headers: getAuthHeaders(token)
	});
	if (!response.ok) throw new Error("Failed to fetch users");

	return response.json();
}

// Bookings
export async function bookClass(scheduledClassId: number, token?: string | null): Promise<IClassBooking> {
	const response = await fetch(`${API_BASE_URL}/bookings`, {
		method: "POST",
		headers: getAuthHeaders(token),
		body: JSON.stringify({ scheduledClassId })
	});
	if (!response.ok) throw new Error("Failed to book class");

	return response.json();
}

export async function cancelBooking(bookingId: number, token?: string | null): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
		method: "DELETE",
		headers: getAuthHeaders(token)
	});
	if (!response.ok) throw new Error("Failed to cancel booking");
}

export async function getUserBookings(token?: string | null): Promise<Array<IClassBooking>> {
	const response = await fetch(`${API_BASE_URL}/bookings/me`, {
		headers: getAuthHeaders(token)
	});
	if (!response.ok) throw new Error("Failed to fetch bookings");

	return response.json();
}
