import http from '../http-common';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await http.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log('refreshed')
            return { ...prev, user: response.data.user, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;