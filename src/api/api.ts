import axios, { type AxiosResponse } from 'axios';

const API = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json',' x-api-key': 'reqres-free-v1' },
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface LoginResponse {
  token: string;
}

export interface CreateUpdateUserResponse {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  job?: string;
}

export const login = (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> =>
  API.post('/login', payload);

export const fetchUsers = (page = 1): Promise<AxiosResponse<UsersResponse>> =>
  API.get('/users', { params: { page, per_page: 12 } });

export const createUser = (data: User): Promise<AxiosResponse<CreateUpdateUserResponse>> =>
  API.post('/users', data);

export const updateUser = (id: number | string, data: User): Promise<AxiosResponse<CreateUpdateUserResponse>> =>
  API.put(`/users/${id}`, data);

export const deleteUserApi = (id: number | string): Promise<AxiosResponse<void>> =>
  API.delete(`/users/${id}`);

export default API;
