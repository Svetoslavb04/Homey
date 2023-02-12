export const countriesnowBaseURL = 'https://countriesnow.space/api/v0.1'
export const citiesOfCountryURL = `${countriesnowBaseURL}/countries/cities`

export const homeyAPIBaseURL = 'http://localhost:3001'
export const homeyAPI = {
    me: `${homeyAPIBaseURL}/me`,
    login: `${homeyAPIBaseURL}/login`,
    logout: `${homeyAPIBaseURL}/logout`,
    registerUser: `${homeyAPIBaseURL}/register/user`,
    registerAgency: `${homeyAPIBaseURL}/register/agency`,
}