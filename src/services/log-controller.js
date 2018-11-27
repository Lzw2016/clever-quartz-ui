import { stringify } from 'qs';
import request from '../utils/request';

// 查询Job执行日志
export async function findJobLogByPage(jobLogQueryReq) {
  return request(`/api/quartz/log/job_log.json?${stringify(jobLogQueryReq)}`, { method: 'GET' });
}

// 查询trigger触发日志
export async function findTriggerLogByPage(triggerLogQueryReq) {
  return request(`/api/quartz/log/trigger_log.json?${stringify(triggerLogQueryReq)}`, { method: 'GET' });
}

// 查询scheduler日志
export async function findSchedulerLogByPage(qrtzSchedulerLogQueryReq) {
  return request(`/api/quartz/log/scheduler_log.json?${stringify(qrtzSchedulerLogQueryReq)}`, { method: 'GET' });
}
