import axios from 'axios'; 
import * as SecureStore from 'expo-secure-store';

const base = axios.create({
    baseURL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    headers: {
        apikey: process.env.EXPO_PUBLIC_SUPABASE_KEY,
        'Content-Type': 'application/json',
        "Prefer": 'return=representation',
    }
})

export const api = axios.create({
    ...base.defaults,
    baseURL: `${base.defaults.baseURL}/rest/v1`,
})

export const authenticationApi = axios.create({
    ...base.defaults,
    baseURL: `${base.defaults.baseURL}/auth/v1`,
})

export const storageApi = axios.create({
    ...base.defaults,
    baseURL: `${base.defaults.baseURL}/storage/v1/object/`
})


const authInterceptor = (instance) => {
    instance.interceptors.request.use(async (config) => {
        const storedUser = await SecureStore.getItemAsync('auth');

        if (storedUser) {
            const user = JSON.parse(storedUser);

            if (user?.access_token) {
                config.headers.Authorization =
                    `Bearer ${user.access_token}`;
            }
        } 
        
        return config;
    });
}

const refreshTokenInterceptor = (instance) => {
    instance.interceptors.response.use(
        (response) => response,

        async (error) => {
            const originalRequest = error.config;
            const result = error.response?.data;

            if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
                return Promise.reject(error);
            }

            if (result?.message !== 'JWT expired' && result?.code !== 'PGRST301') {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            let refreshedData;

            try {
    
                const userData = await SecureStore.getItemAsync('auth');
                const user = userData ? JSON.parse(userData) : null;

                const refreshToken = user?.refresh_token;

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
 
                const response = await authenticationApi.post(
                    '/token?grant_type=refresh_token',
                    { refresh_token: refreshToken }
                );

                refreshedData = response.data; 
                
                await SecureStore.setItemAsync(
                    'auth',
                    JSON.stringify({
                        ...user,
                        ...refreshedData
                    })
                );

            } catch (refreshError) {
        

                await SecureStore.deleteItemAsync('auth');

                return Promise.reject(refreshError);
            }

     
            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${refreshedData.access_token}`
            };

       
            return instance(originalRequest);
        }
    );
};

 

authInterceptor(api);
refreshTokenInterceptor(api);
authInterceptor(authenticationApi);
refreshTokenInterceptor(authenticationApi)
authInterceptor(storageApi);
refreshTokenInterceptor(storageApi);