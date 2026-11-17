import { AuthContext } from "./AuthContext.js"; 
import useSecureAuth from "../../hooks/useSecureState.js";

export default function AuthProvider({ children }) {
    const [user, saveUser, removeUser] = useSecureAuth('auth', null)

    // useEffect(() => {
    //     loadUser()
    // }, [])

    const login = async (userData) => {
        await saveUser(userData);
    };

    const register = async (userData) => {
        await saveUser(userData);
    };

    const logout = async () => {
        await removeUser();
    };

    // const saveUser = async (data) => {

    //     const userInfo = {
    //         id: data.user.id,
    //         email: data.user.email,
    //         access_token: data.access_token,
    //         refresh_token: data.refresh_token
    //     };

    //     try {
    //         await SecureStore.setItemAsync('auth', JSON.stringify(userInfo))

    //         setState(userInfo);

    //     } catch (error) {
    //         alert('Cannot save in storage!')
    //     }
    // }

    // const loadUser = async () => {
    //     const user = await SecureStore.getItemAsync('auth');

    //     if (user !== null) {
    //         return setState(JSON.parse(user))
    //     }

    //     return null
    // }


    const contextValues = {
        isAuthenticated: !!user,
        user,
        login,
        register,
        logout
    };


    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};