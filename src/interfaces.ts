export interface IClassType {
	id: number;
	title: string;
	description: string;
	duration: number;
	capacity: number;
}

export interface ICreateClassTypeDto {
	title: string;
	description: string;
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
	startTime: string;
	bookedSpots: number;
	instructor: string;
}
