import { get, post } from "@/api";

// 用户登录
export function login(data) {
  return post("/user/login", data);
}

// 获取用户信息
export function getUserInfo() {
  return get("/user/info");
}

// 更新用户信息
export function updateUserInfo(data) {
  return post("/user/update", data);
}

// 退出登录
export function logout() {
  return post("/user/logout");
}
