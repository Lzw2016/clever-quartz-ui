// import { stringify } from 'qs';
import request from '../utils/request';
import { ProxyPrefix } from '../utils/constant';

// 增加HTTP任务
export async function addHttpServiceJob(addHttpServiceJobReq) {
  return request(`${ProxyPrefix}/api/quartz/http_job.json`, { method: 'POST', body: addHttpServiceJobReq });
}
