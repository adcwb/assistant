# Assistant - 智能个人助手应用

![UniApp](https://img.shields.io/badge/UniApp-3.0.0-blue)
![Vue](https://img.shields.io/badge/Vue-3.4.21-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.4-blue)
![Vite](https://img.shields.io/badge/Vite-5.2.8-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

一个基于UniApp开发的跨平台智能个人助手应用，支持H5、微信小程序、支付宝小程序等多端发布。

## ✨ 特性

- 🚀 **跨平台支持**：一次开发，多端发布（H5、微信小程序、支付宝小程序等）
- 💪 **现代化技术栈**：Vue 3 + TypeScript + Vite
- 📱 **响应式设计**：完美适配移动端设备
- 🎨 **主题定制**：支持亮色/暗色主题切换
- 🔧 **开发友好**：完整的开发工具链和代码规范
- 📖 **完整文档**：详细的代码注释和开发文档

## 📁 项目结构

```
assistant/
├── .github/              # GitHub工作流配置
├── .vscode/              # VSCode配置
├── src/                  # 源代码目录
│   ├── components/       # 公共组件
│   ├── composables/      # Vue组合式函数
│   ├── pages/           # 页面目录
│   ├── stores/          # 状态管理
│   ├── utils/           # 工具函数
│   ├── types/           # TypeScript类型定义
│   ├── static/          # 静态资源
│   ├── App.vue          # 应用入口组件
│   ├── main.ts          # 应用入口文件
│   ├── manifest.json    # 应用配置文件
│   ├── pages.json       # 页面配置文件
│   └── uni.scss         # 全局样式
├── .eslintrc.js         # ESLint配置
├── .gitignore           # Git忽略配置
├── index.html           # HTML模板
├── package.json         # 项目依赖
├── README.md            # 项目说明
├── tsconfig.json        # TypeScript配置
└── vite.config.ts       # Vite配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/adcwb/assistant.git

# 进入项目目录
cd assistant

# 安装依赖
npm install
# 或使用 yarn
yarn install
```

### 开发模式

```bash
# 开发H5版本
npm run dev:h5

# 开发微信小程序版本
npm run dev:mp-weixin

# 开发支付宝小程序版本
npm run dev:mp-alipay

# 检查开发环境
npm run check-env
```

### 构建项目

```bash
# 构建H5版本
npm run build:h5

# 构建微信小程序版本
npm run build:mp-weixin

# 构建支付宝小程序版本
npm run build:mp-alipay

# 类型检查
npm run type-check
```

## 📖 开发指南

### 代码规范

项目使用ESLint和Prettier进行代码规范检查：

```bash
# 代码格式检查
npm run lint

# 自动修复代码格式问题
npm run lint:fix
```

### 组件开发

组件应放置在 `src/components/` 目录下，遵循以下规范：

1. 使用PascalCase命名组件文件
2. 使用Vue 3的 `<script setup>` 语法
3. 为Props提供完整的TypeScript类型定义
4. 添加详细的JSDoc注释

### 状态管理

项目使用Pinia进行状态管理，store应放置在 `src/stores/` 目录下。

### 多端适配

使用UniApp的条件编译处理平台差异：

```vue
<script setup lang="ts">
// #ifdef H5
console.log("仅在H5平台执行");
// #endif

// #ifdef MP-WEIXIN
console.log("仅在微信小程序平台执行");
// #endif
</script>
```

## 🤝 贡献指南

我们欢迎任何形式的贡献！请参阅[贡献指南](CONTRIBUTING.md)了解如何参与项目开发。

### 开发流程

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个Pull Request

### 代码提交规范

项目使用约定式提交规范，提交信息格式如下：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

类型包括：feat、fix、docs、style、refactor、test、chore等。

## 📄 许可证

本项目基于 [MIT License](LICENSE) 许可证开源。

## 📞 联系方式

- 项目地址：https://github.com/adcwb/assistant
- 问题反馈：请使用GitHub Issues
- 讨论区：GitHub Discussions

## 🙏 致谢

感谢以下开源项目：

- [UniApp](https://uniapp.dcloud.io/) - 跨平台应用开发框架
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript的超集

## 📊 项目状态

![GitHub last commit](https://img.shields.io/github/last-commit/adcwb/assistant)
![GitHub issues](https://img.shields.io/github/issues/adcwb/assistant)
![GitHub pull requests](https://img.shields.io/github/issues-pr/adcwb/assistant)
![GitHub stars](https://img.shields.io/github/stars/adcwb/assistant?style=social)
