# React + TypeScript + Vite

## 创建项目(选择ts和react)

```
npm init vite
```

## 添加常用的依赖

```
npm i redux react-redux react-router-dom --dev-save
```

## 常用命令配置

### 启动命令

```
    "dev": "vite --host --port 3002 --open",
```

### 样式初始化

```
  yarn add reset-css --dev-save

  import 'reset-css'
```

### vite.config.ts中配置@别名(注意：需要安装@types/node)和tsconfig.json中配置---代码提示

## 常用知识：

### 样式模块化

1. 创建 xxx.module.scss
2. 引用 import styles form '@/xxxx'
3. 使用 `<div className={styles.box}></div>`

### ant 和@ant-design/icons

1. 安装

```
 yarn add antd
 yarn add @ant-design/icons
```

2. antd使用

```
import {Button} from 'antd'
import {StepForwardOutlined} from '@ant-design/icons'
...
<Button type='primary'>按钮</Button>
<StepForwardOutlined />

```

3. react-router-dom V6的使用有两种用法。原来组件嵌套路由，现在路由map的方式。
4. 使用路由懒加载的时候，注意：lazy和Suspense一起使用。
5. react-router-dom V6使用 useNavigate进行路由跳转
6. react-redux redux ,状态管理的封装。但是目前这种做法非常规做法。(已废弃)
   redux官方推荐使用@reduxjs/toolket。在本项目中也做了实例
7. 格式化工具：prettier和 校验工具eslint的配合使用
8. JOSN TO TS 工具，将json 转为 ts 类型
9. 代码片段配置。https://99cc.vip/vscode。或https://snippet-generator.app/

### 前端部署使用了netlify自动化工具。

1. 部署分支prod；
2. 部署命令 git push
3. 部署网址：https://prod--warm-raindrop-bd6c2d.netlify.app/login
