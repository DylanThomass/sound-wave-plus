import wx from "weixin-js-sdk";
import request from "@/utils/request";

// 获取微信授权URL
export const getWxAuthUrl = (redirect = "/") => {
  const appId = process.env.VUE_APP_WX_APP_ID;
  // 使用配置的回调域名 + /wx-auth 作为固定的回调地址
  const redirectUri = encodeURIComponent(
    `${process.env.VUE_APP_WX_REDIRECT_URI}/wx-auth`
  );
  const scope = "snsapi_userinfo";
  // 将实际要跳转的页面路径编码到 state 参数中
  const state = encodeURIComponent(redirect);

  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
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

// 获取微信 JS SDK 配置
export const getWxConfig = async () => {
  try {
    const url = window.location.href.split("#")[0];
    return await request.post("/wx/config", { url });
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
      debug: process.env.NODE_ENV === "development",
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
    });

    wx.ready(() => {
      console.log("微信 JS SDK 初始化成功");
    });

    wx.error((res) => {
      console.error("微信 JS SDK 初始化失败:", res);
    });
  } catch (error) {
    console.error("初始化微信配置失败:", error);
    throw error;
  }
};

export { wx };
