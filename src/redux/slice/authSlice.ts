import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { login as loginApi } from '../../api/api';
import type { AppDispatch } from '..';
interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
    },
    fail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { start, success, fail, logout } = slice.actions;

export const login = (creds: { email: string; password: string }) => async (dispatch: AppDispatch) => {
  try {
    dispatch(start());    
    const res = await loginApi(creds);
    const token = res.data.token;    
    localStorage.setItem('token', token);
    dispatch(success(token));
  } catch (err: any) {
    dispatch(fail(err.response?.data?.error || err.message));
  }
};

export default slice.reducer;
