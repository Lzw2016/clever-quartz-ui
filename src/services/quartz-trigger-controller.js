import { stringify } from 'qs';
import request from '../utils/request';

// 暂停而且删除Trigger
export async function deleteTrigger(triggerKeyReq) {
  return request(`/api/quartz/trigger.json?${stringify(triggerKeyReq)}`, { method: 'DELETE' });
}

// 给JobDetail增加一个CronTrigger
export async function addCronTriggerForJob(addCronTriggerForJobReq) {
  return request('/api/quartz/trigger/add_cron_trigger_for_job.json', { method: 'POST', body: addCronTriggerForJobReq });
}

// 给JobDetail增加一个SimpleTrigger
export async function addSimpleTriggerForJob(addSimpleTriggerForJobReq) {
  return request('/api/quartz/trigger/add_simple_trigger_for_job.json', { method: 'POST', body: addSimpleTriggerForJobReq });
}

// 获取所有的CalendarName
export async function findTriggers(findTriggersReq) {
  return request(`/api/quartz/trigger.json?${stringify(findTriggersReq)}`, { method: 'GET' });
}

// 获取所有的CalendarName
export async function getCalendarNames() {
  return request('/api/quartz/trigger/all_calendar_names.json', { method: 'GET' });
}

// 获取所有的TriggerGroupName
export async function getTriggerGroupNames() {
  return request('/api/quartz/trigger/all_trigger_group_name.json', { method: 'GET' });
}

// 获取Trigger
export async function getTrigger(triggerGroup, triggerName) {
  return request(`/api/quartz/trigger/info/${encodeURIComponent(triggerGroup)}/${encodeURIComponent(triggerName)}.json`, { method: 'GET' });
}

// 获取JobDetail的所有Trigger
export async function getTriggerByJob(jobDetailKeyReq) {
  return request(`/api/quartz/trigger/job.json?${stringify(jobDetailKeyReq)}`, { method: 'GET' });
}

// 删除一个JobDetail的所有Trigger
export async function deleteTriggerByJob(jobDetailKeyReq) {
  return request(`/api/quartz/trigger/job.json?${stringify(jobDetailKeyReq)}`, { method: 'DELETE' });
}

// 暂停Trigger
export async function pauseTrigger(triggerKeyReq) {
  return request('/api/quartz/trigger/pause.json', { method: 'POST', body: triggerKeyReq });
}

// 取消暂停Trigger
export async function resumeTrigger(triggerKeyReq) {
  return request('/api/quartz/trigger/resume.json', { method: 'POST', body: triggerKeyReq });
}

// 获取所有的TriggerKey
export async function getTriggerKeyByGroup(triggerGroup) {
  return request(`/api/quartz/trigger/trigger_group/${encodeURIComponent(triggerGroup)}.json`, { method: 'GET' });
}

// 验证cron表达式
export async function validatorCron(validatorCronReq) {
  return request(`/api/quartz/trigger/validator_cron.json?${stringify(validatorCronReq)}`, { method: 'GET' });
}
