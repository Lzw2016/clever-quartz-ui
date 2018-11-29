import { stringify } from 'qs';
import request from '../utils/request';

// 查询任务及其触发器
export async function queryJobAndTrigger(req) {
  return request(`/api/query/job_and_trigger.json?${stringify(req)}`, { method: 'GET' });
}
