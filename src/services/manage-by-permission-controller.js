import { stringify } from 'qs';
import request from '../utils/request';

export async function findByPage(params) {
  return request(`/api/manage/permission?${stringify(params)}`);
}

export async function delPermissionModel(permissionStr) {
  return request(`/api/manage/permission/${encodeURIComponent(permissionStr)}`, { method: 'DELETE' });
}

export async function delPermissionModels(permissionSet) {
  return request(`/api/manage/permission/batch?${stringify(permissionSet, { indices: false })}`, { method: 'DELETE' });
}

export async function addPermission(permission) {
  return request('/api/manage/permission', { method: 'POST', body: permission });
}

export async function getPermissionModel(permissionStr) {
  return request(`/api/manage/permission/${encodeURIComponent(permissionStr)}`);
}

export async function updatePermission(permissionStr, data) {
  return request(`/api/manage/permission/${encodeURIComponent(permissionStr)}`, { method: 'PUT', body: data });
}
