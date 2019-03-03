import { stringify } from 'qs';
import request from '../utils/request';
import { ProxyPrefix } from '../utils/constant';

// 查询Job执行日志
export async function findJobLogByPage(jobLogQueryReq) {
  return request(`${ProxyPrefix}/api/quartz/log/job_log.json?${stringify(jobLogQueryReq)}`, { method: 'GET' });
}

// 查询trigger触发日志
export async function findTriggerLogByPage(triggerLogQueryReq) {
  return request(`${ProxyPrefix}/api/quartz/log/trigger_log.json?${stringify(triggerLogQueryReq)}`, { method: 'GET' });
}

// 查询scheduler日志
export async function findSchedulerLogByPage(qrtzSchedulerLogQueryReq) {
  return request(`${ProxyPrefix}/api/quartz/log/scheduler_log.json?${stringify(qrtzSchedulerLogQueryReq)}`, { method: 'GET' });
}
