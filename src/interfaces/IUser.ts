import { Role } from "../enums/Role";

export interface IUser {
    role: Role.user,
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    city?: string,
    address?: string,
}