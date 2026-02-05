/**
 * Vite配置文件
 *
 * 此文件配置Vite构建工具，用于UniApp项目的开发和构建。
 * 包含UniApp插件配置、开发服务器设置等。
 *
 * @file vite.config.ts
 * @author AICode
 * @version 1.0.0
 * @see https://vitejs.dev/config/
 * @see https://uniapp.dcloud.io/quickstart-cli.html#vite
 */

import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

/**
 * Vite配置
 *
 * 定义Vite构建工具的配置项，包括插件、服务器设置、构建选项等。
 *
 * @returns {import('vite').UserConfig} Vite配置对象
 *
 * @example
 * // 基本配置示例
 * export default defineConfig({
 *   plugins: [uni()],
 *   server: {
 *     port: 3000,
 *     host: true
 *   }
 * });
 */
export default defineConfig({
  /**
   * 插件配置
   *
   * 配置Vite插件，uni()插件是UniApp的核心插件，
   * 负责处理Vue组件、多平台编译等。
   */
  plugins: [uni()],

  /**
   * 开发服务器配置
   *
   * 配置开发服务器的行为，如端口、主机、代理等。
   * 注释掉的配置项为常用配置示例。
   */
  // server: {
  //   port: 5173, // 开发服务器端口
  //   host: true, // 允许外部访问
  //   open: true, // 自动打开浏览器
  //   proxy: {
  //     // API代理配置示例
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // },

  /**
   * 构建配置
   *
   * 配置生产环境构建选项，如输出目录、资源处理等。
   */
  // build: {
  //   outDir: 'dist', // 输出目录
  //   assetsDir: 'assets', // 静态资源目录
  //   sourcemap: false, // 是否生成sourcemap
  //   minify: 'terser', // 代码压缩工具
  //   terserOptions: {
  //     compress: {
  //       drop_console: true, // 移除console.log
  //       drop_debugger: true // 移除debugger
  //     }
  //   }
  // },

  /**
   * 解析配置
   *
   * 配置模块解析规则，如别名、扩展名等。
   */
  // resolve: {
  //   alias: {
  //     '@': '/src', // 路径别名
  //   },
  //   extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'] // 文件扩展名
  // }
});
