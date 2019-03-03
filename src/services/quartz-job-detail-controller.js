import { stringify } from 'qs';
import request from '../utils/request';
import { ProxyPrefix } from '../utils/constant';

// 查询Job信息
export async function findJobDetail(findJobDetailReq) {
  return request(`${ProxyPrefix}/api/quartz/job_detail.json?${stringify(findJobDetailReq)}`, { method: 'GET' });
}

// 保存Job
export async function saveJobDetail(saveJobDetailReq) {
  return request(`${ProxyPrefix}/api/quartz/job_detail.json`, { method: 'POST', body: saveJobDetailReq });
}

// 删除Job
export async function deleteJobDetail(jobDetailKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/job_detail.json?${stringify(jobDetailKeyReq)}`, { method: 'DELETE' });
}

// 获取所有的Job类型
export async function getAllJobClassName() {
  return request(`${ProxyPrefix}/api/quartz/job_detail/all_job_classname.json`, { method: 'GET' });
}

// 获取所有的Job Group Name
export async function getJobGroupNames() {
  return request(`${ProxyPrefix}/api/quartz/job_detail/all_job_group_name.json`, { method: 'GET' });
}

// 获取Job信息
export async function getJobDetails(jobGroup, jobName) {
  return request(`${ProxyPrefix}/api/quartz/job_detail/info/${encodeURIComponent(jobGroup)}/${encodeURIComponent(jobName)}.json`, { method: 'GET' });
}

// 获取所有的Job Key
export async function getJobKeyByGroup(jobGroup) {
  return request(`${ProxyPrefix}/api/quartz/job_detail/job_group/${encodeURIComponent(jobGroup)}.json`, { method: 'GET' });
}

// 暂停Job
export async function pauseJob(jobDetailKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/job_detail/pause.json`, { method: 'POST', body: jobDetailKeyReq });
}

// 取消暂停Job
export async function resumeJob(jobDetailKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/job_detail/resume.json`, { method: 'POST', body: jobDetailKeyReq });
}

// 立即运行Job
export async function triggerJob(jobDetailKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/job_detail/trigger.json`, { method: 'POST', body: jobDetailKeyReq });
}
