/**
 * 应用入口文件
 *
 * 此文件是UniApp应用的入口点，负责创建Vue应用实例。
 * 使用SSR（服务端渲染）模式创建应用，以支持更好的SEO和首屏加载性能。
 *
 * @file main.ts
 * @author AICode
 * @version 2.0.0
 */

import { createSSRApp } from "vue";
import App from "./App.vue";
import { pinia } from "./stores/index";

/**
 * 创建Vue应用实例
 *
 * 此函数创建并返回Vue应用实例，遵循UniApp的SSR应用创建规范。
 * 返回的对象包含app实例，供UniApp框架使用。
 *
 * @returns {Object} 包含Vue应用实例的对象
 * @property {Object} app - Vue应用实例
 *
 * @example
 * // 在UniApp框架中使用
 * const { app } = createApp();
 */
export function createApp() {
  // 创建SSR应用实例
  const app = createSSRApp(App);

  // 使用Pinia状态管理
  app.use(pinia);

  // 返回应用实例，供UniApp框架挂载和使用
  return {
    app,
  };
}
