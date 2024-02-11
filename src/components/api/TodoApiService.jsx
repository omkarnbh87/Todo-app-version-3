import { apiClient } from "./ApiClient";

export const RetrieveAllTodosApi = (username) =>
  apiClient.get(`/users/${username}/todos`);

export const DeleteTodoApi = (username, id) =>
  apiClient.delete(`/users/${username}/todos/${id}`);

export const RetrieveTodoApi = (username, id) =>
  apiClient.get(`/users/${username}/todos/${id}`);
export const UpdateTodoApi = (username, id, todo) =>
  apiClient.put(`/users/${username}/todos/${id}`, todo);
export const AddTodoApi = (username, todo) =>
  apiClient.post(`/users/${username}/todos`, todo);
