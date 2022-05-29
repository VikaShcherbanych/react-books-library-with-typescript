import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

import AuthService from '../../../services/AuthService';

interface IRequestParams {
  email: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: IRequestParams, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      return response.data.user;
    } catch (e: any) {
      toast.error(e.response.data.message || e.message);
      return thunkAPI.rejectWithValue(e.response.data.message || e.message);
    }
  },
);

export const userRegistration = createAsyncThunk(
  'auth/registration',
  async ({ email, password }: IRequestParams, thunkAPI) => {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      if (response.status === 200) {
        toast.success(
          'Success! You have registered. Please, confirm your email address',
        );
      }
      return response.data.user;
    } catch (e: any) {
      toast.error(e.response.data.message || e.message);
      return thunkAPI.rejectWithValue(e.response.data.message || e.message);
    }
  },
);

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
    } catch (e: any) {
      toast.error(e.response.data.message || e.message);
      return thunkAPI.rejectWithValue(e.response.data.message || e.message);
    }
  },
);

export const userCheckAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.checkAuth();
      localStorage.setItem('token', response.data.accessToken);
    } catch (e: any) {
      toast.error(e.response.data.message || e.message);
      return thunkAPI.rejectWithValue(e.response.data.message || e.message);
    }
  },
);
