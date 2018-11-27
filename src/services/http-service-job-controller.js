// import { stringify } from 'qs';
import request from '../utils/request';

// 增加HTTP任务
export async function addHttpServiceJob(addHttpServiceJobReq) {
  return request('/api/quartz/http_job.json', { method: 'POST', body: addHttpServiceJobReq });
}
