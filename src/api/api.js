import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const base = axios.create({
    baseURL: 'https://jekwxfohagnknpkqdgdo.supabase.co',
    headers: {
        apikey: 'sb_publishable_5H15oY-8n1QtXELqWorURg_FvFk-0Ha',
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
        const storedUser = await AsyncStorage.getItem('auth');

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

            if (
                error.response?.status !== 401 ||
                !originalRequest ||
                originalRequest._retry
            ) {
                return Promise.reject(error);
            }

            if (
                result?.message !== 'JWT expired' &&
                result?.code !== 'PGRST301'
            ) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            let refreshedData;

            try {
                // Get stored authentication data
                const userData = await AsyncStorage.getItem('auth');
                const user = userData ? JSON.parse(userData) : null;

                const refreshToken = user?.refresh_token;

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Request new tokens
                const response = await authenticationApi.post(
                    '/token?grant_type=refresh_token',
                    { refresh_token: refreshToken }
                );

                refreshedData = response.data;

                // Save new tokens
                await AsyncStorage.setItem(
                    'auth',
                    JSON.stringify({
                        ...user,
                        ...refreshedData
                    })
                );

            } catch (refreshError) {
                console.log('Refresh failed:', refreshError.response?.data || refreshError.message);

                await AsyncStorage.removeItem('auth');

                return Promise.reject(refreshError);
            }

            // Update original request
            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${refreshedData.access_token}`
            };

            // Retry original request
            return instance(originalRequest);
        }
    );
};

// const refreshTokenInterceptor = (instance) => {
//     instance.interceptors.response.use(
//         (response) => response,

//         async (error) => {
//             const originalRequest = error.config;

//             if (
//                 error.response?.status !== 401 || !originalRequest || originalRequest?._retry) {
//                 return Promise.reject(error);
//             }

//             const result = error.response.data;

//             if (
//                 result.message !== 'JWT expired' && result.code !== 'PGRST301') {
//                 return Promise.reject(error);
//             }

//             originalRequest._retry = true;

//             try {
//                 // Get stored authentication data
//                 const userData = await AsyncStorage.getItem('auth');
//                 const user = userData ? JSON.parse(userData) : null;

//                 const refreshToken = user?.refresh_token;

//                 if (!refreshToken) {
//                     throw new Error('No refresh token available');
//                 }

//                 // Request new tokens
//                 const response = await authenticationApi.post('/token?grant_type=refresh_token', { refresh_token: refreshToken });

//                 // Store new authentication data
//                 await AsyncStorage.setItem('auth', JSON.stringify(response.data));

//                 // Update original request with new access token
//                 originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

//                 // Retry original request
//                 return instance(originalRequest);

//             } catch (refreshError) {
//                 await AsyncStorage.removeItem('auth');

//                 return Promise.reject(refreshError);
//             }
//         }
//     );
// };

authInterceptor(api);
refreshTokenInterceptor(api);
authInterceptor(authenticationApi);
refreshTokenInterceptor(authenticationApi)
authInterceptor(storageApi);
refreshTokenInterceptor(storageApi);