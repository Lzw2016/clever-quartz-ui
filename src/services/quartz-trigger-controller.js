import { stringify } from 'qs';
import request from '../utils/request';
import { ProxyPrefix } from '../utils/constant';

// 暂停而且删除Trigger
export async function deleteTrigger(triggerKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger.json?${stringify(triggerKeyReq)}`, { method: 'DELETE' });
}

// 给JobDetail增加一个CronTrigger
export async function addCronTriggerForJob(addCronTriggerForJobReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger/add_cron_trigger_for_job.json`, { method: 'POST', body: addCronTriggerForJobReq });
}

// 给JobDetail增加一个SimpleTrigger
export async function addSimpleTriggerForJob(addSimpleTriggerForJobReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger/add_simple_trigger_for_job.json`, { method: 'POST', body: addSimpleTriggerForJobReq });
}

// 获取所有的CalendarName
export async function findTriggers(findTriggersReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger.json?${stringify(findTriggersReq)}`, { method: 'GET' });
}

// 获取所有的CalendarName
export async function getCalendarNames() {
  return request(`${ProxyPrefix}/api/quartz/trigger/all_calendar_names.json`, { method: 'GET' });
}

// 获取所有的TriggerGroupName
export async function getTriggerGroupNames() {
  return request(`${ProxyPrefix}/api/quartz/trigger/all_trigger_group_name.json`, { method: 'GET' });
}

// 获取Trigger
export async function getTrigger(triggerGroup, triggerName) {
  return request(`${ProxyPrefix}/api/quartz/trigger/info/${encodeURIComponent(triggerGroup)}/${encodeURIComponent(triggerName)}.json`, { method: 'GET' });
}

// 获取JobDetail的所有Trigger
export async function getTriggerByJob(jobDetailKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger/job.json?${stringify(jobDetailKeyReq)}`, { method: 'GET' });
}

// 删除一个JobDetail的所有Trigger
export async function deleteTriggerByJob(jobDetailKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger/job.json?${stringify(jobDetailKeyReq)}`, { method: 'DELETE' });
}

// 暂停Trigger
export async function pauseTrigger(triggerKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger/pause.json`, { method: 'POST', body: triggerKeyReq });
}

// 取消暂停Trigger
export async function resumeTrigger(triggerKeyReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger/resume.json`, { method: 'POST', body: triggerKeyReq });
}

// 获取所有的TriggerKey
export async function getTriggerKeyByGroup(triggerGroup) {
  return request(`${ProxyPrefix}/api/quartz/trigger/trigger_group/${encodeURIComponent(triggerGroup)}.json`, { method: 'GET' });
}

// 验证cron表达式
export async function validatorCron(validatorCronReq) {
  return request(`${ProxyPrefix}/api/quartz/trigger/validator_cron.json?${stringify(validatorCronReq)}`, { method: 'GET' });
}
