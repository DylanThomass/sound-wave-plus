import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref(localStorage.getItem("token") || "");
    const userInfo = ref(null);

    // 设置登录状态
    const setLoginState = (wxUserInfo) => {
      // if (!wxUserInfo || !wxUserInfo.openid) {
      //   throw new Error("登录数据不完整");
      // }

      // 使用 openid 作为 token
      token.value = wxUserInfo.token;
      localStorage.setItem("token", token.value);

      // 设置用户信息，处理可能的空值
      userInfo.value = {
        ...wxUserInfo.userInfo,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
    };

    // 获取用户信息
    const getUserInfoAction = async () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        userInfo.value = JSON.parse(storedUserInfo);
      }
      return userInfo.value;
    };

    // 更新用户信息
    const updateUserInfo = (newUserInfo) => {
      if (userInfo.value) {
        userInfo.value = {
          ...userInfo.value,
          ...newUserInfo,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
      }
    };

    // 退出登录
    const logoutAction = () => {
      token.value = "";
      userInfo.value = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    };

    return {
      token,
      userInfo,
      setLoginState,
      getUserInfoAction,
      updateUserInfo,
      logoutAction,
    };
  },
  {
    persist: {
      key: "user-store",
      storage: localStorage,
      paths: ["token", "userInfo"],
    },
  }
);
