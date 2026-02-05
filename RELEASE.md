# 发布管理指南

## 自动发布流程

本项目使用GitHub Actions实现自动化发布流程。当满足以下条件时，系统会自动创建Release：

### 触发条件

1. **推送标签到仓库**：推送 `v*` 格式的标签（如 `v1.0.0`）
2. **合并到master分支**：包含版本更新提交的PR合并

### 发布流程

1. **构建阶段**：安装依赖并构建项目
2. **版本检测**：从package.json读取版本号
3. **生成更新日志**：基于提交历史自动生成CHANGELOG
4. **创建Release**：在GitHub上创建Release并上传构建产物
5. **归档构建产物**：将构建结果保存为GitHub Actions Artifact

## 手动发布步骤

### 1. 更新版本号

```bash
# 使用npm version命令更新版本
npm version patch    # 修复版本 (1.0.0 → 1.0.1)
npm version minor    # 小版本 (1.0.0 → 1.1.0)
npm version major    # 大版本 (1.0.0 → 2.0.0)

# 或直接编辑package.json中的version字段
```

### 2. 提交并推送标签

```bash
# 提交版本更新
git add package.json
git commit -m "chore(release): v1.0.1"

# 创建并推送标签
git tag v1.0.1
git push origin v1.0.1
```

### 3. 触发自动发布

推送标签后，GitHub Actions会自动：

- 构建项目
- 生成更新日志
- 创建GitHub Release
- 上传构建产物

## 版本管理规范

### 语义化版本 (SemVer)

- **主版本号 (MAJOR)**：不兼容的API修改
- **次版本号 (MINOR)**：向下兼容的功能性新增
- **修订号 (PATCH)**：向下兼容的问题修正

### 提交信息规范

使用约定式提交规范，格式：`<类型>[可选作用域]: <描述>`

**类型包括：**

- `feat`: 新功能
- `fix`: 问题修复
- `docs`: 文档更新
- `style`: 代码样式
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统
- `ci`: 持续集成
- `chore`: 其他更新

**示例：**

```
feat: 添加用户登录功能
fix(auth): 修复登录验证问题
docs: 更新API文档
```

## Release内容

每个Release包含：

1. **版本信息**：版本号、构建时间、提交哈希
2. **更新日志**：基于提交历史自动生成
3. **构建产物**：H5版本构建结果
4. **相关文件**：package.json、README.md、LICENSE

## 故障排除

### 常见问题

1. **Release未自动创建**
   - 检查标签格式是否正确（必须以`v`开头）
   - 检查GitHub Actions是否正常运行
   - 查看Actions日志获取详细信息

2. **构建失败**
   - 检查Node.js版本兼容性
   - 确认所有依赖已正确安装
   - 查看构建日志中的错误信息

3. **更新日志为空**
   - 确认提交信息符合规范
   - 检查.versionrc.json配置
   - 查看changelog生成步骤的日志

### 手动干预

如需手动创建Release：

1. 前往GitHub仓库的Releases页面
2. 点击"Draft a new release"
3. 选择对应标签
4. 填写Release信息
5. 手动上传构建产物

## 相关配置

### GitHub Actions工作流

- 位置：`.github/workflows/release.yml`
- 触发：推送标签到仓库
- 任务：构建、生成日志、创建Release

### 版本配置

- 位置：`.versionrc.json`
- 功能：定义提交类型和更新日志格式

### 项目配置

- `package.json`: 版本号管理
- `CHANGELOG.md`: 自动生成的更新日志
- `dist/`: 构建产物目录
