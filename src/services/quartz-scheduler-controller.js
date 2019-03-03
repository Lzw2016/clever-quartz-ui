// import { stringify } from 'qs';
import request from '../utils/request';
import { ProxyPrefix } from '../utils/constant';

// 获取所有调度器
export async function allScheduler() {
  return request(`${ProxyPrefix}/api/quartz/scheduler.json`, { method: 'GET' });
}

// 获取SchedulerContext
export async function getContext() {
  return request(`${ProxyPrefix}/api/quartz/scheduler/context.json`, { method: 'GET' });
}

// 中断Job
export async function interrupt(jobDetailKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/scheduler/interrupt.json`, { method: 'POST', body: jobDetailKeyReq });
}

// 获取Scheduler信息
export async function getMetaData() {
  return request(`${ProxyPrefix}/api/quartz/scheduler/meta_data.json`, { method: 'GET' });
}

// 暂停所有的触发器
export async function pauseAll() {
  return request(`${ProxyPrefix}/api/quartz/scheduler/pause_all.json`, { method: 'POST' });
}

// 取消暂停所有的触发器
export async function resumeAll() {
  return request(`${ProxyPrefix}/api/quartz/scheduler/resume_all.json`, { method: 'POST' });
}

// 获取正在运行的Job
export async function getRunningJobs() {
  return request('/api/quartz/scheduler/running_job.json', { method: 'GET' });
}

// 暂停调度器
export async function standby() {
  return request(`${ProxyPrefix}/api/quartz/scheduler/standby.json`, { method: 'POST' });
}

// 继续运行调度器
export async function start() {
  return request(`${ProxyPrefix}/api/quartz/scheduler/start.json`, { method: 'POST' });
}

