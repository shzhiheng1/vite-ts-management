export type IconKey =
  | 'DesktopOutlined'
  | 'UserOutlined'
  | 'TeamOutlined'
  | 'FileOutlined'

export interface MenuItem {
  label: string
  key: string
  icon?: IconKey
  children?: MenuItem[],
  isinlink?:string
  url?: string // 当 isinlink 为 true 时，存储实际要展示的URL
}

export const items: MenuItem[] = [
  // {
  //   label: '传统redux的使用',
  //   key: '/page1',
  //   icon: <PieChartOutlined />
  // },
  {
    label: 'reduxjs/toolkit的使用',
    key: '/page2',
    icon: 'DesktopOutlined'
  },
  {
    label: '功能学习',
    key: 'page3',
    icon: 'UserOutlined',
    children: [
      {
        label: '栏目3-01',
        key: '/page3/page301'
      },
      {
        label: '栏目3-02',
        key: '/page3/page302'
      },
      {
        label: '栏目3-03',
        key: '/page3/page303'
      },
      {
        label: 'useLayoutEffect',
        key: '/study/useLayoutEffect'
      },
      {
        label: 'useRef',
        key: '/study/useRef'
      },
      {
        label: 'useMemo',
        key: '/study/useMemo'
      },
      {
        label: 'useCallback',
        key: '/study/useCallback'
      }
    ]
  },
  {
    label: '栏目4',
    key: 'page4',
    icon: 'TeamOutlined',
    children: [
      {
        label:'栏目4-01',
        key:'page401',
        children:[
           {
             label:'栏目4-01-01',
             key:'/page4/page40101',
           }
        ]
      },
      {
        label: '栏目4-02',
        key: '/page4/page402'
      }
    ]
  },
  {
    label: '发现',
    key: 'discover',
    icon: 'FileOutlined',
    children: [
      {
        label: '精品推荐',
        key: '/discover/recommend'
      },
      {
        label: 'antd官网-外链接',
        key: 'https://ant.design'
      }
    ]
  },
  {  
    label:'文档',
    key:'document',
    icon:'FileOutlined',
    children:[
      {
        label:'react 中文官网',
        key:'/document/react',
        isinlink:"true",
        url: 'https://zh-hans.react.dev' // 存储实际要展示的URL
      }
    ]
  },
  {
    label: '测试demo',
    key: '/demo',
    icon: 'FileOutlined'
  }
]
