import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../shared/api/getErrorMessage';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '../../../shared/config/auth';
import { getCurrentUser, loginUser } from '../api/authApi';
import type { AuthState, LoginCredentials, LoginResponse, User } from './types';

function getStoredUser(): User | null {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

function clearStoredAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
const storedUser = getStoredUser();

const initialState: AuthState = {
  user: storedUser,
  accessToken: storedAccessToken,
  refreshToken: storedRefreshToken,
  status: storedAccessToken ? 'loading' : 'idle',
  error: null,
};

export const login = createAsyncThunk<LoginResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);

      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

      const user: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      };

      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Не удалось выполнить вход.'));
    }
  }
);

export const initializeAuth = createAsyncThunk<User | null, void, { rejectValue: string }>(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      return null;
    }

    try {
      const user = await getCurrentUser();

      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;
    } catch (error) {
      clearStoredAuth();

      return rejectWithValue(getErrorMessage(error, 'Не удалось восстановить авторизацию.'));
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  clearStoredAuth();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        const {
          accessToken,
          refreshToken,
          id,
          username,
          email,
          firstName,
          lastName,
          gender,
          image,
        } = action.payload;

        state.user = {
          id,
          username,
          email,
          firstName,
          lastName,
          gender,
          image,
        };

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.status = 'authenticated';
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = 'error';
        state.error = action.payload ?? 'Не удалось выполнить вход.';
      })

      .addCase(initializeAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (!action.payload) {
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          state.status = 'idle';
          state.error = null;
          return;
        }

        state.user = action.payload;
        state.status = 'authenticated';
        state.error = null;
      })

      .addCase(initializeAuth.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = 'idle';
        state.error = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
