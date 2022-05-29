import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore } from "../../../models/IStore";
import { IUser } from "../../../models/IUser";
import { userLogin, userRegistration, userLogout, userCheckAuth } from "./ActionCreators";

const initialState: IStore = {
    user: {
        email: '',
        isActivated: false,
        id: '',
    },
    isAuth: false,
    isLoading: false,
    error: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [userLogin.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
            state.error = '';
        },
        [userRegistration.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
            state.error = '';
        },
        [userLogout.fulfilled.type]: (state) =>  state = initialState,
        [userCheckAuth.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
            state.error = '';
        },
        [userLogin.pending.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = true;
        },
        [userLogin.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [userRegistration.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default userSlice.reducer;