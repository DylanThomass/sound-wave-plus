import axios from "axios";
import { showToast } from "vant";
import router from "@/router";

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || "/base",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("请求错误：", error);
    return Promise.reject(new Error(error.message || "请求发送失败"));
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 这里可以根据后端的响应结构进行调整
    if (res.code === 200) {
      return res.data;
    }

    // 处理特定的业务状态码
    switch (res.code) {
      case 401:
        // 未登录或 token 过期
        localStorage.removeItem("token");
        router.replace("/login");
        break;
      case 403:
        showToast({
          message: "没有操作权限",
          type: "fail",
        });
        break;
      default:
        showToast({
          message: res.message || "请求失败",
          type: "fail",
        });
    }

    return Promise.reject(new Error(res.message || "请求失败"));
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
        router.replace("/login");
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

    return Promise.reject(new Error(message));
  }
);

export default request;
