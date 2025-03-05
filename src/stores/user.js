import { defineStore } from "pinia";
import { ref } from "vue";
import { login, getUserInfo, logout } from "@/api/user";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref(localStorage.getItem("token") || "");
    const userInfo = ref(null);

    // 登录
    const loginAction = async (loginData) => {
      const res = await login(loginData);
      token.value = res.token;
      localStorage.setItem("token", res.token);
      return res;
    };

    // 获取用户信息
    const getUserInfoAction = async () => {
      const res = await getUserInfo();
      userInfo.value = res;
      return res;
    };

    // 退出登录
    const logoutAction = async () => {
      await logout();
      token.value = "";
      userInfo.value = null;
      localStorage.removeItem("token");
    };

    // 更新用户信息
    const updateUserInfo = (info) => {
      userInfo.value = { ...userInfo.value, ...info };
    };

    return {
      token,
      userInfo,
      loginAction,
      getUserInfoAction,
      logoutAction,
      updateUserInfo,
    };
  },
  {
    persist: {
      key: "user-store", // 存储的key
      storage: localStorage, // 存储方式，默认sessionStorage
      paths: ["token"], // 指定要持久化的字段，这里只持久化token
    },
  }
);
