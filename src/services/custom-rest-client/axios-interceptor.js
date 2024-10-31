import axios from "axios";
import authService from "../auth-service/auth-service";
import AuthStateEnum from "../../data/enums/auth-state-enum";
import AuthModel from "../../data/models/auth-model";

const request = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

const AxiosInterceptor = () => {
    const reqInterceptor = async (config) => {
        config.validateStatus = () => {
            return true;
        };

        const auth = await authService.getAuth();

        if (auth.authStatus === AuthStateEnum.authenticated) {
            config.headers["Authorization"] = `Bearer ${auth.token}`;
        }

        return config;
    };

    const resInterceptor = (response) => {
        if (response.status === 401) {
            authService.storeAuth(new AuthModel());
        }
        return response;
    };

    const errInterceptor = async (error) => {
        // eslint-disable-next-line no-unused-vars
        const { config } = error;
        return Promise.reject(error);
    };
    request.interceptors.request.use(reqInterceptor);
    request.interceptors.response.use(resInterceptor, errInterceptor);
};

export { AxiosInterceptor, request };
