/**
 * Pinia Store 配置
 *
 * 此文件配置Pinia状态管理，包括持久化插件。
 *
 * @file index.ts
 * @author AICode
 * @version 1.0.0
 */

import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

/**
 * 创建并配置Pinia store
 */
export const setupStore = () => {
  const store = createPinia();

  // 使用持久化插件
  store.use(
    createPersistedState({
      // 全局持久化配置
      storage: {
        getItem(key: string): string | null {
          return uni.getStorageSync(key);
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value);
        },
      },
      // 序列化配置
      serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      },
    }),
  );

  return store;
};

// 导出Pinia实例
export const pinia = setupStore();
