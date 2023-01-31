import axios from 'axios';
import Constant from './Constants';

class Request {
    constructor() {
        this.api = axios.create({
            baseURL: Constant.serverlink,
            timeout: Constant.timeout,
            headers: {
                "Content-Type": "application/json"
            },
        });
    }

    debugit() {
        this.api.interceptors.request.use((request) => {
            console.log("Starting Request", request);
            return request;
        });

        this.api.interceptors.response.use((response) => {
            console.log("Response:", response);
            return response;
        });
    }

    async loginWithGoogle(data) {
        const link = "/api/user/google/login";
        return await this.api.post(link, data);
    }

    async createAccount(data) {
        const link = "/api/user";
        return await this.api.post(link, data);
    }

    async get(path) {
        const link = "/api/" + path;
        return await this.api.get(link, path);
    }

    async addToCart(data) {
        const link = "/api/cart";
        return await this.api.post(link, data);
    }

    async getCart(data) {
        const link = "/api/cart/get";
        return await this.api.post(link, data);
    }

    async getFavorite(data) {
        const link = "/api/favorite/get";
        return await this.api.post(link, data);
    }

    async deleteFromcart(data) {
        const link = "/api/cart/delete";
        return await this.api.post(link, data);
    }

    async getShippingAddress(data) {
        const link = "/api/shipping/get";
        return await this.api.post(link, data);
    }

    async updateShippingAddress(data) {
        const link = "/api/shipping";
        return await this.api.post(link, data);
    }

    async checkout(data) {
        const link = "/api/order";
        return await this.api.post(link, data);
    }

    async getFavorites(data) {
        const link = "/api/favorite/get";
        return await this.api.post(link, data);
    }

    async toggleFavorites(data) {
        const link = "/api/favorite";
        return await this.api.post(link, data);
    }

    async getOrders(data) {
        const link = "/api/order/get";
        return await this.api.post(link, data);
    }

    async getOrderById(id) {
        const link = "/api/order/" + id;
        return await this.api.get(link, id);
    }
}

export default Request;