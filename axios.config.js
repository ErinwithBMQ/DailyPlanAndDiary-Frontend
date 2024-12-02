import axios from 'axios';

// 创建axios实例
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:7001', // 设置基础URL
});

// 设置请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        // 获取JWT token
        const token = localStorage.getItem('token');
        if (token) {
            // 将token添加到请求头部
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 设置响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 400 || error.response.status === 401) {
            // 如果响应状态码为400或401，则跳转到登录页面
            localStorage.removeItem('token');
            window.location.href = '/';
            alert('您还未登录。')
        }
    }
)

export default axiosInstance;

