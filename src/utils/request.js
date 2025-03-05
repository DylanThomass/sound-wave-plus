import axios from "axios";
import { showToast } from "vant";

// 创建 axios 实例
const request = axios.create({
  baseURL: "http://hejiawen.online:8888/base",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等认证信息
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 这里可以根据你的后端接口规范调整
    if (res.code === 200) {
      return res.data;
    }

    showToast({
      message: res.message || "请求失败",
      type: "fail",
    });
    return Promise.reject(new Error(res.message || "请求失败"));
  },
  (error) => {
    showToast({
      message: error.message || "网络错误",
      type: "fail",
    });
    return Promise.reject(error);
  }
);

export default request;
