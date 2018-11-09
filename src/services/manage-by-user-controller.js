import { stringify } from 'qs';
import request from '../utils/request';

export async function findByPage(params) {
  return request(`/api/manage/user?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/api/manage/user', { method: 'POST', body: params });
}

export async function delUser(username) {
  return request(`/api/manage/user/${username}`, { method: 'DELETE' });
}

export async function getUser(username) {
  return request(`/api/manage/user/${username}`);
}

export async function updateUser(username, userData) {
  return request(`/api/manage/user/${username}`, { method: 'PUT', body: userData });
}
