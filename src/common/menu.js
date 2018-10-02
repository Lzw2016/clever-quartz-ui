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
    name: '系统设置',
    icon: 'set',
    path: '01',
    children: [
      {
        name: '用户管理',
        icon: 'yonghuguanli',
        path: '02',
      },
      {
        name: '角色管理',
        icon: 'jiaoseguanli',
        path: '03',
      },
      {
        name: '系统参数',
        icon: 'xitongcanshu1',
        path: '04',
      },
      {
        name: '系统字典',
        icon: 'xitongzidian',
        path: '05',
      },
    ],
  },
  {
    name: '系统演示',
    icon: 'xitongcanshu',
    path: 'demo',
    // hideInBreadcrumb: true,
    // hideInMenu: true,
    // authority: 'admin',
    children: [
      {
        name: '复杂表格',
        path: '01',
      },
      {
        name: '富文本控件',
        path: '02',
      },
      {
        name: '其他控件',
        path: '03',
      },
    ],
  },
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
