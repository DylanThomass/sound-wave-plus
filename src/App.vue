<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 全局加载动画 -->
    <van-loading
      v-if="appStore.loading"
      class="global-loading"
      type="spinner"
      color="#1989fa"
    />
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores";
import { Loading } from "vant";
import { onMounted } from "vue";
import { initWxConfig } from "@/api/wechat";

const appStore = useAppStore();

// 初始化微信配置
onMounted(async () => {
  if (process.env.NODE_ENV === "development") {
    try {
      await initWxConfig();
    } catch (error) {
      console.error("初始化微信配置失败:", error);
    }
  }
});
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.global-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

// 路由过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
