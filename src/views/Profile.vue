<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="个人中心"
      fixed
      placeholder
      safe-area-inset-top
      class="nav-bar-gradient"
    />

    <!-- 用户信息卡片 -->
    <div class="p-4">
      <div
        class="bg-white rounded-[1.5rem] p-6 shadow-lg relative overflow-hidden"
      >
        <!-- 背景装饰 -->
        <div
          class="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent opacity-30 rounded-full blur-xl"
        ></div>

        <!-- 用户基本信息 -->
        <div class="flex items-start space-x-4 mb-6 relative">
          <div class="relative">
            <img
              :src="userInfo.headimgurl"
              class="w-20 h-20 rounded-[1rem] object-cover shadow-lg border-2 border-white"
              alt="头像"
            />
            <div
              class="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <i class="fas fa-music text-white text-xs"></i>
            </div>
          </div>

          <div class="flex-1">
            <h2 class="text-xl font-semibold text-gray-900 title-kksjt mb-1">
              {{ userInfo.nickname }}
            </h2>
            <p class="text-sm text-gray-500 text-kksjt mb-2">
              <template v-if="userInfo.province || userInfo.city">
                {{ userInfo.province }} {{ userInfo.city }}
              </template>
              <template v-else>暂未设置地区</template>
            </p>
            <div class="flex items-center space-x-2">
              <span
                class="px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-600"
              >
                <i class="fab fa-weixin mr-1"></i>微信用户
              </span>
              <span
                v-if="userInfo.sex"
                class="px-2 py-1 text-xs rounded-full"
                :class="
                  userInfo.sex === 1
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-pink-50 text-pink-600'
                "
              >
                <i
                  :class="userInfo.sex === 1 ? 'fas fa-mars' : 'fas fa-venus'"
                  class="mr-1"
                ></i>
                {{ userInfo.sex === 1 ? "男" : "女" }}
              </span>
            </div>
          </div>
        </div>

        <!-- 用户数据统计 -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900">--</div>
            <div class="text-xs text-gray-500">我的乐队</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900">--</div>
            <div class="text-xs text-gray-500">关注</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900">--</div>
            <div class="text-xs text-gray-500">粉丝</div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex space-x-3">
          <van-button
            type="primary"
            block
            class="edit-btn flex-1"
            @click="handleEditProfile"
          >
            <i class="fas fa-edit mr-1"></i>
            编辑资料
          </van-button>
          <van-button
            type="default"
            block
            class="share-btn flex-1"
            @click="handleShare"
          >
            <i class="fas fa-share-alt mr-1"></i>
            分享主页
          </van-button>
        </div>
      </div>

      <!-- 功能列表 -->
      <div class="mt-4 bg-white rounded-[1.5rem] overflow-hidden">
        <van-cell-group inset>
          <van-cell title="我的乐队" is-link center class="function-cell">
            <template #icon>
              <i class="fas fa-users text-purple-500 mr-3 text-lg"></i>
            </template>
          </van-cell>
          <van-cell title="我的收藏" is-link center class="function-cell">
            <template #icon>
              <i class="fas fa-star text-yellow-500 mr-3 text-lg"></i>
            </template>
          </van-cell>
          <van-cell title="历史记录" is-link center class="function-cell">
            <template #icon>
              <i class="fas fa-history text-blue-500 mr-3 text-lg"></i>
            </template>
          </van-cell>
          <van-cell title="设置" is-link center class="function-cell">
            <template #icon>
              <i class="fas fa-cog text-gray-500 mr-3 text-lg"></i>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 退出登录按钮 -->
      <div class="mt-4 px-4 mb-20">
        <van-button block class="logout-btn" @click="handleLogout">
          退出登录
        </van-button>
      </div>
    </div>

    <!-- 底部导航栏 -->
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
import { useRouter } from "vue-router";
import { showToast, showDialog } from "vant";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
const userInfo = ref({});

// 获取用户信息
const getUserInfo = async () => {
  try {
    // 从 store 中获取用户信息
    const storeUserInfo = userStore.userInfo;
    if (storeUserInfo) {
      userInfo.value = storeUserInfo;
    } else {
      showToast({
        message: "用户信息不完整",
        type: "warning",
      });
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    showToast({
      message: "获取用户信息失败",
      type: "fail",
    });
  }
};

// 编辑资料
const handleEditProfile = () => {
  // TODO: 跳转到编辑资料页面
  showToast("即将开放，敬请期待");
};

// 分享主页
const handleShare = () => {
  // TODO: 调用分享接口
  showToast("即将开放，敬请期待");
};

// 退出登录
const handleLogout = () => {
  showDialog({
    title: "确认退出",
    message: "是否确认退出登录？",
    showCancelButton: true,
  }).then((action) => {
    if (action === "confirm") {
      userStore.logoutAction();
      router.replace("/");
      showToast({
        message: "已退出登录",
        type: "success",
      });
    }
  });
};

// 底部导航项
const tabItems = [
  { icon: "fas fa-home", text: "首页", path: "/" },
  { icon: "fas fa-user", text: "我的", path: "/profile" },
];

// 底部标签栏激活项
const active = ref(1); // 默认激活"我的"标签

// 处理底部导航点击
const handleTabClick = (index) => {
  active.value = index;
  router.push(tabItems[index].path);
};

onMounted(() => {
  getUserInfo();
});
</script>

<style scoped>
.nav-bar-gradient {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
}

.edit-btn {
  @apply bg-gradient-to-r from-purple-600 to-pink-600 border-none rounded-[1rem] h-11 shadow-md hover:shadow-lg transition-all duration-300;
}

.share-btn {
  @apply bg-white border border-gray-200 rounded-[1rem] h-11 text-gray-700 hover:border-purple-200 hover:text-purple-600 transition-all duration-300;
}

.logout-btn {
  @apply bg-white border border-gray-200 rounded-[1rem] h-11 text-gray-700 hover:border-red-200 hover:text-red-600 transition-all duration-300;
}

.function-cell {
  @apply py-4;
}

:deep(.van-cell) {
  align-items: center;
  padding: 16px !important;
}

:deep(.van-cell__title) {
  @apply text-gray-900 text-base;
}

.tab-bar {
  @apply fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-4 py-2;
}

.tab-item {
  @apply flex flex-col items-center cursor-pointer transition-all duration-300 hover:text-purple-600;
}
</style>
