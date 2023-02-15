import { homeyAPIBaseURL } from "../../env";

export const countriesnowBaseURL = 'https://countriesnow.space/api/v0.1'
export const citiesOfCountryURL = `${countriesnowBaseURL}/countries/cities`

export const homeyAPI = {
    me: `${homeyAPIBaseURL}/me`,
    login: `${homeyAPIBaseURL}/login`,
    logout: `${homeyAPIBaseURL}/logout`,
    registerUser: `${homeyAPIBaseURL}/register/user`,
    registerAgency: `${homeyAPIBaseURL}/register/agency`,
    properties: {
        baseURL: `${homeyAPIBaseURL}/properties`,
        get getTop(): string { return `${this.baseURL}/top` },
        get getFiltered(): string { return `${this.baseURL}/filtered` },
        get getMetaData(): string { return `${this.baseURL}/meta` },
        get getById(): string { return `${this.baseURL}` },
        get create(): string { return `${this.baseURL}` },
        get delete(): string {return `${this.baseURL}` },
        get edit(): string { return `${this.baseURL}` },
    },
    images: {
        baseURL : `${homeyAPIBaseURL}/images`
    }
}