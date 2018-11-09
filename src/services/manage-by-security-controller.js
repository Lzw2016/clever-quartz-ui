// import { stringify } from 'qs';
import request from '../utils/request';

export async function userBindSys(params) {
  return request(`/api/manage/security/user_sys`, { method: 'POST', body: params });
}

export async function userBindRole(params) {
  return request(`/api/manage/security/user_role`, { method: 'POST', body: params });
}

export async function roleBindPermission(params) {
  return request(`/api/manage/security/role_permission`, { method: 'POST', body: params });
}

export async function singleUserBindRole({ username, roleName }) {
  return request(`/api/manage/security/user_role/bind`, { method: 'POST', body: { username, roleName } });
}

export async function singleUserUnBindRole({ username, roleName }) {
  return request(`/api/manage/security/user_role/un_bind`, { method: 'POST', body: { username, roleName } });
}

export async function singleRoleBindPermission({ roleName, permissionStr }) {
  return request(`/api/manage/security/role_permission/bind`, { method: 'POST', body: { roleName, permissionStr } });
}

export async function singleRoleUnBindPermission({ roleName, permissionStr }) {
  return request(`/api/manage/security/role_permission/un_bind`, { method: 'POST', body: { roleName, permissionStr } });
}
