import { axiosInstance } from "./api";

const AUTH = '/api/auth';
const CUSTOMERS = '/api/customers';

export default class RequestApis {
    static authRequest(credentials) {
        const payload = {
            email: credentials.email,
            password: credentials.password
        };
        return axiosInstance.post(AUTH, payload);
    }

    static getCustomers() {
        return axiosInstance.get(CUSTOMERS);
    }

    static setCustomer(customer) {
        return axiosInstance.post(CUSTOMERS, customer);
    }

    static editCustomer(customer) {
        return axiosInstance.put(`${CUSTOMERS}/${customer.id}`, {
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        });
    }
}