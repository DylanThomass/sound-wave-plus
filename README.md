# Sound Wave Plus

Sound Wave Plus 是一个基于 Vue 3 + Vant 4 开发的音乐社交应用，旨在帮助音乐爱好者找到志同道合的伙伴，组建乐队，分享音乐。

## 技术栈

- Vue 3 (Composition API)
- Vant 4
- TailwindCSS
- WeChat JSSDK
- Axios
- Node.js v18.20.4
- pnpm

## 功能特性

- 📱 微信登录授权
- 🎵 乐队组建和管理
- 🔍 乐队搜索和发现
- 👥 社区互动
- 🎸 音乐分享
- 📊 个人中心

## 快速开始

### 环境要求

- Node.js >= 18.20.4
- pnpm >= 8.0.0

### 安装 pnpm

```bash
npm install -g pnpm
```

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

### 生产环境构建

```bash
pnpm build
```

## 项目结构

```
src/
  ├── api/          # API 接口
  ├── assets/       # 静态资源
  ├── components/   # 公共组件
  ├── composables/  # 组合式函数
  ├── router/       # 路由配置
  ├── store/        # 状态管理
  ├── styles/       # 全局样式
  ├── utils/        # 工具函数
  └── views/        # 页面组件
```

## 环境变量配置

在项目根目录创建以下环境文件：

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

示例配置：

```env
VITE_APP_BASE_URL=http://api.example.com
VITE_APP_WX_APP_ID=your_wx_app_id
```

## 微信配置

1. 配置微信公众号

   - 设置安全域名
   - 配置 JS 接口安全域名
   - 设置授权回调域名

2. 初始化 JSSDK

   ```javascript
   import { initWxConfig } from "@/api/wechat";

   // 在应用启动时初始化
   await initWxConfig();
   ```

## 设计规范

### 色彩系统

- 主色：#7C3AED (深紫色)
- 次要色：#EC4899 (粉色)
- 背景色：#1E1B4B (深蓝)
- 文字颜色：
  - 主要文字：#F9FAFB
  - 次要文字：#D1D5DB
  - 禁用文字：#6B7280

### 间距系统

- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- base: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

## API 文档

### 微信相关接口

```javascript
// 获取微信授权URL
GET / wx / auth / url;

// 微信登录
POST / wx / login;

// 获取 JSSDK 配置
POST / wx / config;
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 开发规范

1. 使用 Composition API 进行开发
2. 遵循 Vue 3 风格指南
3. 使用 TailwindCSS 进行样式开发
4. 保持代码整洁，添加必要的注释
5. 组件和函数要有完整的类型定义

## 许可证

[MIT](LICENSE)

## 联系方式

- 项目负责人：[Your Name]
- Email：[your.email@example.com]

## 更新日志

### [1.0.0] - 2024-03-XX

- 初始版本发布
- 实现基础功能：微信登录、乐队管理等
