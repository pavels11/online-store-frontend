import { api } from '../../../shared/api/axios';

import type { LoginCredentials, LoginResponse, User } from '../model/types';

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', credentials);

  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>('/auth/me');

  return response.data;
}
