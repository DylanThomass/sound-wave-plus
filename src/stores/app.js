import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore(
  "app",
  () => {
    // 主题色
    const primaryColor = ref("#1989fa");

    // 是否显示底部导航栏
    const showTabbar = ref(true);

    // 是否显示加载动画
    const loading = ref(false);

    // 设置主题色
    const setPrimaryColor = (color) => {
      primaryColor.value = color;
    };

    // 设置底部导航栏显示状态
    const setShowTabbar = (show) => {
      showTabbar.value = show;
    };

    // 设置加载状态
    const setLoading = (status) => {
      loading.value = status;
    };

    return {
      primaryColor,
      showTabbar,
      loading,
      setPrimaryColor,
      setShowTabbar,
      setLoading,
    };
  },
  {
    persist: {
      key: "app-store",
      storage: localStorage,
      paths: ["primaryColor"],
    },
  }
);
