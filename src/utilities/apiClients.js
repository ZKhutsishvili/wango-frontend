import axios from 'axios'

export const backendAxiosClient = axios.create({
    baseURL: "http://localhost:3010",
    headers: {
        Accept: 'application/json',
        'content-Type': 'application/json'
    }
})