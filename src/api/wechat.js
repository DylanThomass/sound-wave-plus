import wx from "weixin-js-sdk";
import request from "@/utils/request";

const BASE_URL = "http://hejiawen.online:8888/base";

// 获取微信 JS SDK 配置
export const getWxConfig = async () => {
  try {
    const url = window.location.href.split("#")[0]; // 获取当前页面 URL，去除 hash
    return await request.post("/wx/config", {
      url,
    });
  } catch (error) {
    console.error("获取微信配置失败:", error);
    throw error;
  }
};

// 初始化微信 JS SDK
export const initWxConfig = async () => {
  try {
    const config = await getWxConfig();
    wx.config({
      debug: process.env.NODE_ENV !== "production", // 开发环境开启调试模式
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: [
        "updateAppMessageShareData", // 分享到朋友圈
        "updateTimelineShareData", // 分享给朋友
        "onMenuShareTimeline", // 老版分享到朋友圈
        "onMenuShareAppMessage", // 老版分享给朋友
        "chooseImage", // 选择图片
        "previewImage", // 预览图片
        "uploadImage", // 上传图片
        "downloadImage", // 下载图片
        "startRecord", // 开始录音
        "stopRecord", // 停止录音
        "playVoice", // 播放语音
        "pauseVoice", // 暂停语音
        "stopVoice", // 停止语音
        "uploadVoice", // 上传语音
        "downloadVoice", // 下载语音
      ],
    });

    wx.ready(() => {
      console.log("微信 JS SDK 初始化成功");
      // 设置默认分享内容
      const shareData = {
        title: "Sound Wave Plus - 发现你的音乐伙伴",
        desc: "加入我们，开启你的音乐之旅",
        link: window.location.href,
        imgUrl: `${window.location.origin}/logo.png`, // 使用当前域名下的 logo
        success: function () {
          console.log("分享成功");
        },
        cancel: function () {
          console.log("取消分享");
        },
      };

      wx.updateAppMessageShareData(shareData);
      wx.updateTimelineShareData(shareData);
    });

    wx.error((res) => {
      console.error("微信 JS SDK 初始化失败:", res);
    });
  } catch (error) {
    console.error("初始化微信配置失败:", error);
    throw error;
  }
};

// 获取微信授权URL
export const getWxAuthUrl = async () => {
  try {
    const currentUrl = window.location.href.split("#")[0];
    return await request.get("/wx/auth/url", {
      params: { redirect_uri: currentUrl },
    });
  } catch (error) {
    console.error("获取微信授权URL失败:", error);
    throw error;
  }
};

// 使用code获取用户信息
export const wxLogin = async (code) => {
  try {
    return await request.post("/wx/login", { code });
  } catch (error) {
    console.error("微信登录失败:", error);
    throw error;
  }
};

// 导出 wx 实例，以便在其他组件中使用
export { wx };
