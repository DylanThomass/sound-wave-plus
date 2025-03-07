<template>
  <div
    class="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white relative overflow-hidden"
  >
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="Sound Wave"
      fixed
      placeholder
      safe-area-inset-top
      class="nav-bar-gradient"
    >
      <template #right>
        <i
          class="fas fa-search text-purple-600 text-base hover:text-purple-700 transition-colors cursor-pointer"
        ></i>
      </template>
    </van-nav-bar>

    <!-- 未登录状态 -->
    <div v-if="!isLoggedIn" class="p-6">
      <div class="text-center py-12">
        <div class="relative">
          <div
            class="w-24 h-24 mx-auto mb-6 rounded-[1.5rem] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <i class="fas fa-music text-white text-3xl"></i>
          </div>
          <div
            class="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 opacity-50 blur-xl"
          ></div>
        </div>
        <h1
          class="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 title-kksjt"
        >
          发现你的音乐伙伴
        </h1>
        <p class="text-gray-500 mb-6 text-base text-kksjt">
          加入我们，开启你的音乐之旅
        </p>
        <van-button
          type="primary"
          block
          class="login-btn"
          @click="handleWxLogin"
        >
          <i class="fab fa-weixin mr-2"></i>
          微信一键登录
        </van-button>
        <p class="text-xs text-gray-400 mt-3">
          登录即代表同意
          <span
            class="text-purple-600 cursor-pointer hover:text-purple-700 transition-colors"
            @click="showPrivacyPolicy"
            >《用户协议和隐私政策》</span
          >
        </p>
      </div>
    </div>

    <!-- 已登录状态 -->
    <div v-else class="p-4">
      <!-- 快速行动区 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div
          class="action-card bg-gradient-to-br from-purple-50 to-pink-50"
          @click="handleCreateBand"
        >
          <div
            class="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 shadow-lg"
          >
            <i class="fas fa-plus text-white text-base"></i>
          </div>
          <h3 class="text-base font-semibold text-gray-900">发起组队</h3>
          <p class="text-xs text-gray-500 mt-1">创建你的乐队</p>
        </div>
        <div
          class="action-card bg-gradient-to-br from-indigo-50 to-blue-50"
          @click="handleFindBand"
        >
          <div
            class="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-3 shadow-lg"
          >
            <i class="fas fa-search text-white text-base"></i>
          </div>
          <h3 class="text-base font-semibold text-gray-900">寻找乐队</h3>
          <p class="text-xs text-gray-500 mt-1">发现心仪乐队</p>
        </div>
      </div>

      <!-- 推荐乐队 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-gray-900">推荐乐队</h2>
          <van-button type="primary" size="mini" plain class="more-btn">
            更多
          </van-button>
        </div>
        <div class="space-y-3">
          <div
            v-for="(band, index) in recommendBands"
            :key="index"
            class="band-card"
          >
            <div class="flex items-center mb-3">
              <div
                class="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 shadow-lg"
              >
                <span class="text-white text-base font-semibold">{{
                  band.name[0]
                }}</span>
              </div>
              <div>
                <h3 class="text-base font-semibold text-gray-900">
                  {{ band.name }}
                </h3>
                <p class="text-xs text-gray-500">{{ band.style }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span
                  v-for="(tag, tagIndex) in band.tags"
                  :key="tagIndex"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              <van-button type="primary" size="mini" class="join-btn">
                申请加入
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部装饰元素 -->
    <div
      class="fixed bottom-0 left-0 right-0 pointer-events-none select-none opacity-[0.15] overflow-hidden h-[70vh]"
    >
      <div class="relative w-full h-full">
        <!-- 斜向文字 -->
        <div class="absolute left-[-10%] bottom-[45%] transform -rotate-12">
          <div
            class="text-[120px] font-bold text-purple-900 font-rock tracking-widest"
          >
            ROCK
          </div>
        </div>
        <div class="absolute left-[20%] bottom-[25%] transform rotate-6">
          <div
            class="text-[100px] font-bold text-pink-700 font-rock tracking-wider"
          >
            MUSIC
          </div>
        </div>
        <div class="absolute right-[-5%] bottom-[10%] transform -rotate-6">
          <div
            class="text-[110px] font-bold text-indigo-800 font-rock tracking-wider"
          >
            BAND
          </div>
        </div>

        <!-- 音符和乐器图标 -->
        <i
          class="fas fa-music absolute top-[20%] left-[30%] text-5xl text-purple-400 transform rotate-12 floating-icon"
        ></i>
        <i
          class="fas fa-guitar absolute top-[35%] right-[25%] text-6xl text-pink-400 transform -rotate-12 floating-icon"
        ></i>
        <i
          class="fas fa-drum absolute bottom-[30%] right-[40%] text-5xl text-indigo-400 transform rotate-6 floating-icon"
        ></i>
        <i
          class="fas fa-microphone absolute top-[40%] left-[20%] text-5xl text-purple-500 transform -rotate-6 floating-icon"
        ></i>
        <i
          class="fas fa-headphones absolute bottom-[40%] left-[35%] text-5xl text-pink-500 transform rotate-12 floating-icon"
        ></i>

        <!-- 装饰线条 -->
        <div
          class="absolute left-0 right-0 bottom-[20%] h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"
        ></div>
        <div
          class="absolute left-[30%] top-0 h-full w-px bg-gradient-to-b from-transparent via-pink-300 to-transparent transform rotate-45"
        ></div>
        <div
          class="absolute right-[30%] top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-300 to-transparent transform -rotate-45"
        ></div>
      </div>
    </div>

    <!-- 额外的背景装饰 -->
    <div class="fixed inset-0 pointer-events-none">
      <!-- 左上角装饰 -->
      <div
        class="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent opacity-30 rounded-full blur-xl"
      ></div>
      <!-- 右下角装饰 -->
      <div
        class="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-pink-200 to-transparent opacity-30 rounded-full blur-xl"
      ></div>
    </div>

    <!-- 现有的底部导航栏 -->
    <div class="tab-bar">
      <div class="max-w-md mx-auto flex justify-around items-center">
        <div
          v-for="(item, index) in tabItems"
          :key="index"
          class="tab-item"
          :class="active === index ? 'text-purple-600' : 'text-gray-500'"
          @click="handleTabClick(index)"
        >
          <i :class="item.icon" class="text-lg mb-0.5"></i>
          <span class="text-xs font-medium">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, showDialog } from "vant";
import { getWxAuthUrl, wxLogin } from "@/api/wechat";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const isLoggedIn = ref(false);

// 底部导航项
const tabItems = [
  { icon: "fas fa-home", text: "首页", path: "/" },
  { icon: "fas fa-user", text: "我的", path: "/profile" },
];

// 推荐乐队数据
const recommendBands = [
  {
    name: "摇滚新势力",
    style: "摇滚 / 原创",
    tags: ["主唱", "吉他手"],
  },
  {
    name: "爵士时光",
    style: "爵士 / 即兴",
    tags: ["贝斯手", "鼓手"],
  },
  {
    name: "民谣故事",
    style: "民谣 / 原创",
    tags: ["主唱", "吉他手"],
  },
];

// 底部标签栏激活项
const active = ref(0);

// 处理底部导航点击
const handleTabClick = (index) => {
  active.value = index;
  router.push(tabItems[index].path);
};

// 显示隐私政策
const showPrivacyPolicy = () => {
  showDialog({
    title: "用户协议和隐私政策",
    message:
      "欢迎使用 Sound Wave！我们非常重视您的隐私和个人信息保护。在使用我们的服务前，请仔细阅读以下内容...",
    confirmButtonText: "我知道了",
    confirmButtonColor: "#07C160",
  });
};

// 处理微信登录
const handleWxLogin = () => {
  try {
    showLoadingToast({
      message: "正在跳转...",
      forbidClick: true,
    });
    // 将当前路由路径作为登录后的重定向地址
    const redirect = route.fullPath;
    const authUrl = getWxAuthUrl(redirect);
    window.location.href = authUrl;
  } catch (error) {
    console.error("获取微信授权链接失败:", error);
    showToast({
      message: "登录失败，请稍后重试",
      type: "fail",
    });
  }
};

// 检查登录状态
const checkLoginStatus = async () => {
  try {
    if (userStore.token) {
      await userStore.getUserInfoAction();
      isLoggedIn.value = true;
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    userStore.logoutAction();
    isLoggedIn.value = false;
  }
};

// 处理微信回调
const handleWxCallback = async () => {
  const { code } = route.query;
  if (code) {
    try {
      showLoadingToast({
        message: "登录中...",
        forbidClick: true,
      });

      // 使用code获取用户信息和token
      const loginData = await wxLogin(code);
      userStore.setLoginState(loginData);
      isLoggedIn.value = true;

      showToast({
        message: "登录成功",
        type: "success",
      });

      // 清除URL中的code参数，但保持在当前页面
      router.replace({
        path: route.path,
        query: {},
      });
    } catch (error) {
      console.error("微信登录失败:", error);
      showToast({
        message: error.message || "登录失败",
        type: "fail",
      });
      userStore.logoutAction();
      isLoggedIn.value = false;
    }
  }
};

// 在页面加载时检查登录状态和处理回调
onMounted(async () => {
  if (route.query.code) {
    await handleWxCallback();
  }
  await checkLoginStatus();
});

// 创建乐队处理
const handleCreateBand = () => {
  // TODO: 跳转到创建乐队页面
  console.log("创建乐队");
};

// 寻找乐队处理
const handleFindBand = () => {
  // TODO: 跳转到寻找乐队页面
  console.log("寻找乐队");
};
</script>

<style scoped>
.nav-bar-gradient {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
}

.login-btn {
  @apply bg-gradient-to-r from-purple-600 to-pink-600 border-none rounded-[1rem] h-12 shadow-lg hover:shadow-xl transition-all duration-300 text-base font-medium;
}

.action-card {
  @apply rounded-[1.5rem] p-4 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative;
  background: linear-gradient(
    135deg,
    var(--tw-gradient-from) 0%,
    var(--tw-gradient-to) 100%
  );
}

.action-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1));
  z-index: 1;
}

.band-card {
  @apply bg-white rounded-[1.25rem] p-4 border border-gray-100 hover:border-purple-100 transition-all hover:shadow-lg transform hover:-translate-y-0.5;
}

.more-btn {
  @apply rounded-[1rem] text-purple-600 border-purple-600 hover:bg-purple-50 transition-colors text-xs;
}

.join-btn {
  @apply rounded-[1rem] bg-gradient-to-r from-purple-500 to-pink-500 border-none shadow-md hover:shadow-lg transition-all;
}

.tag {
  @apply px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-600 font-medium;
}

.tab-bar {
  @apply fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-4 py-2;
}

.tab-item {
  @apply flex flex-col items-center cursor-pointer transition-all duration-300 hover:text-purple-600;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@font-face {
  font-family: "RockFont";
  src: url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");
}

.font-rock {
  font-family: "RockFont", system-ui, -apple-system, sans-serif;
  background: linear-gradient(
    to bottom,
    currentColor 0%,
    rgba(currentColor, 0.7) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(var(--rotation, 0));
  }
  50% {
    transform: translateY(-15px) rotate(var(--rotation, 0));
  }
}

.floating-icon {
  animation: float 3s ease-in-out infinite;
  animation-delay: calc(var(--delay, 0) * 1s);
}

.fas.fa-music {
  --delay: 0;
  --rotation: 12deg;
}

.fas.fa-guitar {
  --delay: 0.5;
  --rotation: -12deg;
}

.fas.fa-drum {
  --delay: 1;
  --rotation: 6deg;
}

.fas.fa-microphone {
  --delay: 1.5;
  --rotation: -6deg;
}

.fas.fa-headphones {
  --delay: 2;
  --rotation: 12deg;
}

.overflow-hidden {
  overflow: hidden;
}

.login-btn::after,
.join-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.login-btn:hover::after,
.join-btn:hover::after {
  left: 100%;
}
</style>
