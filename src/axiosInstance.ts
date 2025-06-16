import axios from "axios";
import { store } from "./app/store";
import { clearAuth } from "./features/auth/authSlice";
import { setError } from "./features/ui/ui.slice";
import ErrorResponse from "./models/responses/shared/Error.response";

const axiosInstance = axios.create({
  baseURL: "https://proyecto-lapacho-backend.onrender.com/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storeRedux = store.getState();
    const token = storeRedux.auth.loginResponse?.token;

    if (token) {
      if (config.headers) config.headers.x_token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorTipado = error.response.data as ErrorResponse;

    const status = error.response?.status;
    if (status === 401) {
      store.dispatch(clearAuth());
    }

    const msg =
      errorTipado?.msg ||
      error.message ||
      "Error desconocido. Verificá tu conexión.";

    store.dispatch(setError(msg));
    return Promise.reject(error);
  },
);

export default axiosInstance;
