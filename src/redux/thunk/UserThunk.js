import {createAsyncThunk} from '@reduxjs/toolkit';
import userService from '../actions/UserAction';

export const registerUser = createAsyncThunk('user/register', async (newUser) => {
    try {
        const userData = await userService.register(newUser);
        return userData?.data?.data;
    } catch (e) {
        throw e.message;
    }
});
export const loginUser = createAsyncThunk('user/login', async ({email, password}) => {
    try {
        const userData = await userService.login({email, password});
        // console.log(userData.data.data)
        return userData?.data?.data;
    } catch (e) {
        console.log(e)
        throw e.message;
    }
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
    try {
        const userData = await userService.logout();
        return userData?.data?.data;
    } catch (e) {
        throw e.message;
    }

});

export const accessTokenLoginUser = createAsyncThunk('user/accessTokenLogin', async () => {
    try {
        const userData = await userService.accessTokenLogin();
        return userData?.data?.data;
    } catch (e) {
        throw e.message;
    }
});


export const googleLoginUser = createAsyncThunk('user/googleLogin', async () => {
    try {
        const userData = await userService.googleLogin();
        return userData?.data?.data;
    } catch (e) {
        throw e.message;
    }
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (data) => {
    try {
        const userData = await userService.updateUserProfile(data);
        return userData?.data?.data;
    } catch (e) {
        throw e.message;
    }
}
);export const uploadAsset = createAsyncThunk('user/upload/fulfilled', async (data) => {
    try {
        const userData = await userService.uploadAsset(data);
        return userData?.data?.data;
    } catch (e) {
        throw e.message;
    }
}
);
