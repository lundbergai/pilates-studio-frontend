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
