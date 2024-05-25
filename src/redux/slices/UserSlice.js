// UserSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {
    accessTokenLoginUser,
    registerUser,
    loginUser,
    logoutUser,
    googleLoginUser,
    updateUserProfile,
    uploadAsset
} from "../thunk/UserThunk";

const initialUser = (localStorage.getItem('user') && localStorage.getItem('user') !== "undefined") ? JSON.parse(localStorage.getItem('user'))
    : null;
console.log(initialUser)

const slice = createSlice({
    name: 'user',
    initialState: {
        user: initialUser,
        token: localStorage.getItem('token') ?? null,
        isLoading: false,
        error: null,
    },
    reducers: {
        resetUser: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(registerUser.fulfilled, (state, action) => {

                state.isLoading = false;
                state.user = action.payload;
                console.log(action.payload)

                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token)

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(loginUser.pending, (state) => {
                // state.user = null;
                state.isLoading = true;
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("FDrom login")
                console.log(action.payload)
                if (action.payload) {
                    state.isLoading = false;
                    state.user = action.payload;
                    console.log("login ")
                    console.log(action.payload)

                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                    localStorage.setItem('token', action.payload.token)
                }

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .addCase(accessTokenLoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(accessTokenLoginUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                    console.log("hete")
                    console.log(action.payload)
                    // state.user = action.payload;
                    localStorage.setItem('user', JSON.stringify(action.payload));
                    // localStorage.setItem('token', action.payload.token);
                }
            })
            .addCase(accessTokenLoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(googleLoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(googleLoginUser.fulfilled, (state, action) => {
                if (action.payload && action.payload.token) {
                    state.user = action.payload;
                    console.log(action.payload)
                    // state.user = action.payload;
                    localStorage.setItem('user', JSON.stringify(action.payload));
                    localStorage.setItem('token', action.payload.token);
                }
            })

            .addCase(googleLoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(updateUserProfile.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                    console.log(action.payload)
                    // state.user = action.payload;
                    localStorage.setItem('user', JSON.stringify(action.payload));
                    // localStorage.setItem('token', action.payload.token);
                }
            })

            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(uploadAsset.fulfilled, (state, action) => {
                state.isLoading = false;

            })

            .addCase(uploadAsset.pending, (state) => {
                state.isLoading = true;

            })

            .addCase(uploadAsset.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })


    }
});

export const {loginSuccess, logoutSuccess , resetUser} = slice.actions;
export default slice.reducer;
