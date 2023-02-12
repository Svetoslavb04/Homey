import { Role } from "../enums/Role";

export interface IAgency {
    role: Role.agency
    _id: string,
    email: string,
    agencyName: string,
    city: string,
    address: string,
    phoneNumber?: string,
}