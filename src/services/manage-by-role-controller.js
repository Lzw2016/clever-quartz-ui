import { stringify } from 'qs';
import request from '../utils/request';

export async function findByPage(params) {
  return request(`/api/manage/role?${stringify(params)}`);
}

export async function getRoleInfo(name) {
  return request(`/api/manage/role/${encodeURIComponent(name)}`);
}

export async function addRole(params) {
  return request(`/api/manage/role`, { method: 'POST', body: params });
}

export async function updateRole(name, params) {
  return request(`/api/manage/role/${encodeURIComponent(name)}`, { method: 'PUT', body: params });
}

export async function delRole(name) {
  return request(`/api/manage/role/${encodeURIComponent(name)}`, { method: 'DELETE' });
}
