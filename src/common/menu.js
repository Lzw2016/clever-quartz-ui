import { isUrl } from '../utils/utils';

const menuData = [
  // {
  // name: 'Dashboard',
  // icon: 'dashboard',
  // path: 'dashboard',
  // hideInBreadcrumb: true,
  // hideInMenu: true,
  // authority: 'admin',
  // },
  {
    name: 'Demo',
    icon: 'http1',
    path: 'demo/:list',
  },
  {
    name: 'Http调度任务',
    icon: 'HTTP',
    path: 'http_job/:list',
  },
  {
    name: 'Dubbo调度任务',
    icon: 'dubbo',
    path: 'dubbo_job/:list',
  },
  {
    name: '所有调度任务',
    icon: 'tasks',
    path: 'all_job/:list',
  },
  {
    name: '所有触发器',
    icon: 'implement',
    path: 'all_trigger/:list',
  },
  {
    name: '调度任务日志',
    icon: 'renwu',
    path: 'job_log/:list',
  },
  {
    name: '触发器日志',
    icon: 'rizhi',
    path: 'trigger_log/:list',
  },
  {
    name: '调度器事件',
    icon: 'shijian',
    path: 'scheduler_log/:list',
  },
  // {
  //   name: '调度任务故障',
  //   icon: 'yichang2',
  //   path: 'error_log/:list',
  // },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
