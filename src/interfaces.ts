export interface IClassType {
	id: number;
	title: string;
	description: string;
	duration: number;
	capacity: number;
}

export interface ICreateClassTypeDto {
	title: string;
	description?: string;
	duration: number;
	capacity: number;
}

export interface IUpdateClassTypeDto {
	title?: string;
	description?: string;
	duration?: number;
	capacity?: number;
}

export interface IClass {
	id: number;
	classTypeId: number;
	classTypeName: string;
	classTypeDuration: number;
	classTypeCapacity: number;
	instructorId: number;
	instructor: string;
	startTime: string;
	bookedSpots: number;
}

export interface ICreateScheduledClassDto {
	classTypeId: number;
	instructorId: number;
	startTime: string;
}

export interface IUpdateScheduledClassDto {
	classTypeId?: number;
	instructorId?: number;
	startTime?: string;
}

export interface IInstructor {
	id: number;
	fullName: string;
	email: string;
}

export interface IUser {
	id: number;
	fullName: string;
	email: string;
	clerkUserId: string | null;
	isAdmin: boolean;
	isInstructor: boolean;
	isMember: boolean;
}
