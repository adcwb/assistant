# 组合式函数目录

此目录包含Vue 3的组合式函数（Composables），用于封装可复用的逻辑。

## 组合式函数规范

1. **命名规范**：
   - 使用camelCase命名（例如：`useCounter.ts`, `useUserInfo.ts`）
   - 文件名以`use`前缀开头

2. **函数结构**：

   ```typescript
   import { ref, computed } from "vue";

   /**
    * 函数功能描述
    * @param initialValue - 初始值描述
    * @returns 返回值描述
    */
   export function useCounter(initialValue: number = 0) {
     const count = ref(initialValue);

     const increment = () => {
       count.value++;
     };

     const decrement = () => {
       count.value--;
     };

     const double = computed(() => count.value * 2);

     return {
       count,
       increment,
       decrement,
       double,
     };
   }
   ```

3. **类型定义**：
   - 为参数和返回值提供完整的TypeScript类型
   - 使用接口定义复杂的数据结构

4. **文档要求**：
   - 每个函数应有JSDoc注释
   - 说明函数用途、参数和返回值
   - 提供使用示例

## 常见组合式函数

- **状态管理**：`useStore`, `useLocalStorage`
- **网络请求**：`useFetch`, `useApi`
- **UI交互**：`useModal`, `useToast`
- **工具函数**：`useDebounce`, `useThrottle`
