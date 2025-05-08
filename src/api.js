import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_MOCKAPI_BASE_URL,
    timeout: 3000,
    headers: { "content-type": "application/JSON" }
})

http.interceptors.response.use(({ data }) => data);

export const api = {
    todos: {
        getAll(params = {}) {
            return http
                .get("todos", { params })
                .catch((error) =>
                    error?.response.status === 404 ? [] : Promise.reject(error)
                );
        },

        create(data) {
            return http.post("todos", data);
        },

        update(id, data) {
            return http.put(`todos/${id}`, data);
        },

        delete(id) {
            return http.delete(`todos/${id}`);
        },
    },
};