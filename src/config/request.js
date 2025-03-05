import axios from "axios";
import { showToast } from "vant";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理，例如添加 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error("请求错误：", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 这里可以根据后端的响应结构进行调整
    if (res.code === 200) {
      return res.data;
    } else {
      // 处理业务错误
      showToast({
        message: res.message || "请求失败",
        type: "fail",
      });
      return Promise.reject(new Error(res.message || "请求失败"));
    }
  },
  (error) => {
    // 处理 HTTP 错误
    console.error("响应错误：", error);
    const message = error.response?.data?.message || "网络错误，请稍后重试";

    // 处理特定状态码
    switch (error.response?.status) {
      case 401:
        // 未授权，清除 token 并跳转到登录页
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 403:
        showToast({
          message: "没有权限访问",
          type: "fail",
        });
        break;
      case 404:
        showToast({
          message: "请求的资源不存在",
          type: "fail",
        });
        break;
      case 500:
        showToast({
          message: "服务器错误",
          type: "fail",
        });
        break;
      default:
        showToast({
          message,
          type: "fail",
        });
    }

    return Promise.reject(error);
  }
);

export default service;
