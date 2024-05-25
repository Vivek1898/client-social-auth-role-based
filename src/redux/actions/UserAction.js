import api from '../../config/api';

const userService = {
    register: async (newUser) => {
        return await api.post('/auth/register', {...newUser});
    },
    login: async (data) => {
        return await api.post('/auth/login', {...data});

    },
    logout: async () => {
        return await api.post('/admin/logout');
    },
    accessTokenLogin: async () => {
        return await api.post('/user/accessTokenLogin')
    },
    tokenLogin: async (token) => {
        return await api.post('/user/accessTokenLogin', {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    },

    googleLogin: async () => {
        return window.open(`/public-list`, "_self");
    },
    getPublicUserList: async (data) => {

        return await api.post('/user/public-list', data);
    },
    getAdminUserList: async (data) => {
        return await api.post('/user/admin-list', data);
    },
    updateUserProfile: async (data) => {
        return await api.put('/user/update', data);
    },
    uploadAsset: async (data) => {

        return await api.post('/user/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default userService;
