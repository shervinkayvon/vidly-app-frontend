import { axiosInstance } from "./api";

export default class RequestApis {
    static authRequest(credentials) {
        const payload = {
            email: credentials.email,
            password: credentials.password
        };
        return axiosInstance.post('/api/auth', payload);
    }
}