# Daily Plan and Diary - Frontend

## React + Vite + Tailwind CSS

github库：https://github.com/ErinwithBMQ/DailyPlanAndDiary-Frontend

git clone 到本地后，先运行 `npm install`

`npm run dev` 可以启动本地服务

目前 axios 默认配置的是我部署在服务器上的后端地址。如需连接本地后端，请修改`axios.config.js`的`baseURL`，并且将
`diary.jsx`和`allDiary,jsx`里图片url的前置地址改为本地地址。
注：部署已下线

### 项目结构如下：

`src/components` 文件夹下存放各个组件

`src/components/css` 文件夹下存放各个组件对应的样式文件

`App.jsx` 配置了动态路由，有新的页面就加一个路由

`main.jsx` 是整个页面的入口
