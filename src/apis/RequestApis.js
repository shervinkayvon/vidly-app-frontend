import { axiosInstance } from "./api";

const AUTH = '/api/auth';
const CUSTOMERS = '/api/customers';
const GENRES = '/api/genres';
const MOVIES = '/api/movies';
const RENTALS = '/api/rentals';
const USERS = '/api/users';

export default class RequestApis {
    static authRequest(credentials) {
        const payload = {
            email: credentials.email,
            password: credentials.password
        };
        return axiosInstance.post(AUTH, payload);
    }

    static getCustomers() {
        return axiosInstance.get(`${CUSTOMERS}?page=1&pageSize=100`);
    }

    static addCustomer(customer) {
        return axiosInstance.post(CUSTOMERS, customer);
    }

    static editCustomer(customer) {
        return axiosInstance.put(`${CUSTOMERS}/${customer.id}`, {
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        });
    }

    static deleteCustomer(customer) {
        return axiosInstance.delete(`${CUSTOMERS}/${customer.id}`);
    }

    static getGenres() {
        return axiosInstance.get(GENRES);
    }

    static addGenre(genre) {
        return axiosInstance.post(GENRES, genre);
    }

    static editGenre(genre) {
        return axiosInstance.put(`${GENRES}/${genre.id}`, {
            name: genre.name
        });
    }

    static deleteGenre(genre) {
        return axiosInstance.delete(`${GENRES}/${genre.id}`);
    }

    static getMovies() {
        return axiosInstance.get(MOVIES);
    }

    static addMovie(movie) {
        return axiosInstance.post(MOVIES, {
            title: movie.title,
            genreId: movie.genre,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        });
    }

    static editMovie(movie) {
        return axiosInstance.put(`${MOVIES}/${movie.id}`, {
            title: movie.title,
            genreId: movie.genre,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        });
    }

    static deleteMovie(movie) {
        return axiosInstance.delete(`${MOVIES}/${movie.id}`);
    }
}