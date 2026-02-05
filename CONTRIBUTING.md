# 贡献指南

感谢您有兴趣为Assistant项目做出贡献！在提交贡献之前，请花时间阅读以下指南。

## 🎯 贡献方式

您可以通过以下方式为项目做出贡献：

1. **报告Bug** - 使用GitHub Issues报告发现的Bug
2. **提出新功能** - 在Issues中提出功能建议
3. **改进文档** - 帮助改进项目文档
4. **提交代码** - 修复Bug或实现新功能
5. **代码审查** - 帮助审查Pull Request

## 🚀 开发环境设置

### 1. Fork并克隆仓库

```bash
# Fork本仓库到您的GitHub账户
# 克隆您的fork到本地
git clone https://github.com/您的用户名/assistant.git
cd assistant

# 添加上游仓库
git remote add upstream https://github.com/adcwb/assistant.git
```

### 2. 安装依赖

```bash
npm install
```

### 3. 创建功能分支

```bash
# 从main分支创建新分支
git checkout -b feature/您的功能名称
# 或修复Bug的分支
git checkout -b fix/问题描述
```

## 📝 代码规范

### 代码风格

项目使用以下工具确保代码质量：

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查

运行以下命令检查代码：

```bash
# 代码格式检查
npm run lint

# 自动修复代码格式问题
npm run lint:fix

# 类型检查
npm run type-check
```

### 提交信息规范

项目使用约定式提交规范，提交信息格式如下：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

**类型说明**：

- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码逻辑）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例**：

```
feat(components): 添加用户卡片组件

- 添加UserCard.vue组件
- 添加相关TypeScript类型定义
- 添加组件使用示例

Closes #123
```

### 代码审查标准

提交的代码需要满足以下要求：

1. **功能完整** - 实现的功能符合需求描述
2. **代码质量** - 代码清晰、可读性好
3. **测试覆盖** - 重要的功能有相应的测试
4. **文档更新** - 相关的文档已更新
5. **向后兼容** - 不影响现有功能

## 🔄 开发流程

### 1. 同步上游代码

在开始新工作前，确保您的分支是最新的：

```bash
git fetch upstream
git rebase upstream/main
```

### 2. 开发与测试

```bash
# 启动开发服务器
npm run dev:h5

# 运行测试（如果有）
npm test

# 确保代码质量
npm run lint
npm run type-check
```

### 3. 提交更改

```bash
# 添加更改
git add .

# 提交更改（使用规范的提交信息）
git commit -m "feat: 添加新功能"

# 推送到您的fork
git push origin feature/您的功能名称
```

### 4. 创建Pull Request

1. 访问您的GitHub仓库
2. 点击"Compare & pull request"
3. 填写PR描述，说明更改内容和相关Issue
4. 等待代码审查

## 🐛 报告Bug

报告Bug时，请提供以下信息：

1. **Bug描述** - 清晰描述Bug的现象
2. **重现步骤** - 如何重现这个Bug
3. **期望行为** - 期望的正确行为是什么
4. **实际行为** - 实际发生的错误行为
5. **环境信息** - 操作系统、浏览器、Node.js版本等
6. **截图/日志** - 相关的截图或错误日志

## 💡 提出新功能

提出新功能时，请说明：

1. **功能描述** - 详细描述您想要的功能
2. **使用场景** - 这个功能解决什么问题
3. **实现建议** - 如果有，提供实现思路
4. **相关参考** - 类似功能的参考链接

## 📖 文档贡献

文档是项目的重要组成部分，欢迎帮助改进：

1. **修复错别字和语法错误**
2. **补充缺失的文档**
3. **改进文档结构**
4. **添加代码示例**
5. **翻译文档**

## 🏷️ 分支管理

- `main` - 主分支，稳定版本
- `develop` - 开发分支，新功能集成
- `feature/*` - 功能开发分支
- `fix/*` - Bug修复分支
- `docs/*` - 文档更新分支

## 📞 联系方式

如有问题，可以通过以下方式联系：

- GitHub Issues: 报告Bug或提出功能建议
- GitHub Discussions: 参与项目讨论
- Pull Request: 提交代码贡献

## 🙏 致谢

感谢所有为项目做出贡献的开发者！您的每一份贡献都让项目变得更好。

---

_本贡献指南参考了多个开源项目的优秀实践，感谢开源社区的分享精神。_
