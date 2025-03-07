<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white"
  >
    <div class="text-center p-6">
      <div class="relative mb-6">
        <div
          class="w-20 h-20 mx-auto rounded-[1.25rem] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl"
        >
          <i class="fab fa-weixin text-white text-3xl"></i>
        </div>
        <div
          class="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 opacity-50 blur-lg"
        ></div>
      </div>
      <h2 class="text-xl font-semibold mb-2 text-gray-900">微信授权登录中</h2>
      <p class="text-gray-500 text-sm mb-4">请稍候，正在处理授权...</p>
      <van-loading type="spinner" color="#7C3AED" size="24px" vertical>
        {{ loadingText }}
      </van-loading>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast } from "vant";
import { wxLogin } from "@/api/wechat";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const loadingText = ref("正在登录");

// 处理微信授权回调
const handleWxAuth = async () => {
  const { code, state } = route.query;

  if (!code) {
    showToast({
      message: "授权失败，请重试",
      type: "fail",
    });
    router.replace("/");
    return;
  }

  try {
    loadingText.value = "获取用户信息";
    const loginData = await wxLogin(code);

    loadingText.value = "登录中";
    console.log(loginData);
    userStore.setLoginState(loginData);

    showToast({
      message: "登录成功",
      type: "success",
    });

    // 使用 state 参数作为重定向地址，如果没有则跳转到个人信息页面
    const redirectPath = decodeURIComponent(state || "/profile");
    router.replace(redirectPath);
  } catch (error) {
    console.error("微信登录失败:", error);
    showToast({
      message: error.message || "登录失败",
      type: "fail",
    });
    router.replace("/");
  }
};

onMounted(() => {
  handleWxAuth();
});
</script>
