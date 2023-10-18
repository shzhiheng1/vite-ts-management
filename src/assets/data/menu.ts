// import {
//   DesktopOutlined,
//   FileOutlined,
//   // PieChartOutlined,
//   TeamOutlined,
//   UserOutlined
// } from '@ant-design/icons'
interface item {
  label: string
  key: string
  icon?: React.ReactNode
  children?: item[]
}

export const items: item[] = [
  // {
  //   label: '传统redux的使用',
  //   key: '/page1',
  //   icon: <PieChartOutlined />
  // },
  {
    label: 'reduxjs/toolkit的使用',
    key: '/page2'
  },
  {
    label: '功能学习',
    key: 'page3',
    // icon: <UserOutlined />,
    children: [
      {
        label: '栏目3-01',
        key: '/page3/page301'
      },
      {
        label: '栏目3-01',
        key: '/page3/page302'
      },
      {
        label: '栏目3-01',
        key: '/page3/page303'
      }
    ]
  },
  {
    label: '栏目4',
    key: 'page4',
    // icon: <TeamOutlined />,
    children: [
      // {
      //   label:'栏目4-01',
      //   key:'page401',
      //   icon:<FileOutlined />,
      //   children:[
      //      {
      //        label:'栏目4-01-01',
      //        key:'/page4/page40101',
      //      }
      //   ]
      // },
      {
        label: '栏目4-02',
        key: '/page4/page402'
      }
    ]
  },
  {
    label: '发现',
    key: 'discover',
    // icon: <FileOutlined></FileOutlined>,
    children: [
      {
        label: '精品推荐',
        key: '/discover/recommend'
      }
    ]
  },
  {
    label: '测试demo',
    key: '/demo'
    // icon: <FileOutlined />
  }
]
