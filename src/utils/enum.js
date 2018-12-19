// 状态 1启用 0未启用
const StatusArray = [
  { value: '0', label: '未启用' },
  { value: '1', label: '启用' },
];

// 排序
const SorterOrderMapper = {
  'descend': 'DESC',
  'ascend': 'ASC',
};

// http 请求类型 GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, TRACE
const HttpMethodMapper = {
  'GET': { background: '#61affe' },
  'HEAD': { background: '#9012fe' },
  'POST': { background: '#49cc90' },
  'PUT': { background: '#fca130' },
  'PATCH': { background: '#50e3c2' },
  'DELETE': { background: '#f93e3e' },
  'OPTIONS': { background: '#0d5aa7' },
  'error': { background: undefined },
}

// Trigger状态，PAUSED_BLOCKED:停止_阻塞; PAUSED:停止; WAITING:等待执行; ACQUIRED:等待执行; EXECUTING:执行中; COMPLETE:完成; BLOCKED:阻塞; ERROR:错误; DELETED:已删除
// NONE, NORMAL, PAUSED, COMPLETE, ERROR, BLOCKED 
const TriggerStateArray = [
  { value: 'PAUSED_BLOCKED', label: '停止-阻塞' },
  { value: 'PAUSED', label: '暂停' },
  { value: 'WAITING', label: '等待执行' },
  { value: 'ACQUIRED', label: '等待执行' },
  { value: 'EXECUTING', label: '执行中' },
  { value: 'COMPLETE', label: '完成' },
  { value: 'BLOCKED', label: '阻塞' },
  { value: 'ERROR', label: '错误' },
  { value: 'DELETED', label: '已删除' },
];
const TriggerStateMapper = {
  'PAUSED_BLOCKED': { label: '停止-阻塞', color: '#faad14', status: 'warning' },
  'PAUSED': { label: '暂停', color: 'faad14', status: 'warning' },
  'WAITING': { label: '等待执行', color: '#faad14', status: 'warning' },
  'ACQUIRED': { label: '等待执行', color: '#1890ff', status: 'processing' },
  'EXECUTING': { label: '执行中', color: '#1890ff', status: 'processing' },
  'COMPLETE': { label: '完成', color: '#52c41a', status: 'success' },
  'BLOCKED': { label: '阻塞', color: '#faad14', status: 'warning' },
  'ERROR': { label: '错误', color: '#f5222d', status: 'error' },
  'DELETED': { label: '已删除', color: '#f5222d', status: 'error' },
};

export {
  StatusArray,
  SorterOrderMapper,
  HttpMethodMapper,
  TriggerStateArray,
  TriggerStateMapper,
};
