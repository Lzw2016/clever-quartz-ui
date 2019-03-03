import { stringify } from 'qs';
import request from '../utils/request';
import { ProxyPrefix } from '../utils/constant';

// 查询任务及其触发器
export async function queryJobAndTrigger(req) {
  return request(`${ProxyPrefix}/api/query/job_and_trigger.json?${stringify(req)}`, { method: 'GET' });
}
