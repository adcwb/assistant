# 组件目录

此目录包含项目的可复用Vue组件。

## 组件规范

1. **命名规范**：
   - 组件文件使用PascalCase命名（例如：`Button.vue`, `UserCard.vue`）
   - 组件目录使用kebab-case命名（例如：`user-card/`）

2. **组件结构**：

   ```vue
   <template>
     <!-- 组件模板 -->
   </template>

   <script setup lang="ts">
   // 组件逻辑
   </script>

   <style scoped>
   /* 组件样式 */
   </style>
   ```

3. **Props定义**：
   - 使用TypeScript接口定义props类型
   - 为props提供默认值和类型检查

4. **文档要求**：
   - 每个组件应有清晰的注释说明
   - 复杂组件应提供使用示例

## 组件分类

- **基础组件**：按钮、输入框、图标等
- **业务组件**：与业务逻辑相关的组件
- **布局组件**：页面布局相关的组件
