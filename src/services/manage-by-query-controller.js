// import { stringify } from 'qs';
import request from '../utils/request';

export async function existsUserByUsername(username) {
  return request(`/api/manage/user/username/${encodeURIComponent(username)}/exists`);
}

export async function existsUserByTelephone(telephone) {
  return request(`/api/manage/user/telephone/${encodeURIComponent(telephone)}/exists`);
}

export async function existsUserByEmail(email) {
  return request(`/api/manage/user/email/${encodeURIComponent(email)}/exists`);
}

export async function allSysName() {
  return request('/api/manage/sys_name');
}

export async function findSysNameByUser(username) {
  return request(`/api/manage/sys_name/${encodeURIComponent(username)}`);
}

export async function allRoleName() {
  return request('/api/manage/role_name');
}

export async function findRoleNameByUser(username) {
  return request(`/api/manage/role_name/${encodeURIComponent(username)}`);
}

export async function findPermissionStrByRole(roleName) {
  return request(`/api/manage/permission_str/${encodeURIComponent(roleName)}`);
}

