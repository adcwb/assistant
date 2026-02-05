/**
 * 用户状态管理 (Pinia版本)
 *
 * 此文件管理用户相关的全局状态，包括登录状态、用户信息等。
 * 使用Pinia进行状态管理，支持持久化存储。
 *
 * @file user.ts
 * @author AICode
 * @version 2.0.0
 */

import { defineStore } from "pinia";

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  phone: string;
  email: string;
  gender: "male" | "female" | "unknown";
  birthday: string;
  bio: string;
  level: string;
  vipLevel: number;
  createTime: string;
  lastLoginTime: string;
}

/**
 * 登录凭证接口
 */
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * 用户状态管理Store
 */
export const useUserStore = defineStore("user", {
  // 持久化配置
  persist: {
    key: "user-store",
    storage: {
      getItem(key: string): string | null {
        return uni.getStorageSync(key);
      },
      setItem(key: string, value: string) {
        uni.setStorageSync(key, value);
      },
    },
  },

  // 状态定义
  state: () => ({
    token: "" as string,
    userInfo: null as UserInfo | null,
    loginLoading: false,
    loginError: null as string | null,
    rememberMe: false,
    username: "",
  }),

  // 计算属性
  getters: {
    isLoggedIn: (state) => !!state.token,
    fullName: (state) =>
      state.userInfo?.nickname || state.userInfo?.username || "",
    userLevel: (state) => state.userInfo?.level || "普通会员",
  },

  // 操作方法
  actions: {
    /**
     * 用户登录
     * @param credentials - 登录凭证
     */
    async login(credentials: { username: string; password: string }) {
      this.loginLoading = true;
      this.loginError = null;

      try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 模拟登录成功
        const mockUserInfo: UserInfo = {
          id: "20240001",
          username: credentials.username,
          nickname: "智能助手用户",
          avatar: "/static/logo.png",
          phone: "138****8888",
          email: `${credentials.username}@example.com`,
          gender: "unknown",
          birthday: "1990-01-01",
          bio: "这个人很懒，什么都没有留下~",
          level: "VIP会员",
          vipLevel: 1,
          createTime: "2024-01-01 00:00:00",
          lastLoginTime: new Date().toISOString(),
        };

        const mockToken = "mock_access_token_" + Date.now();

        // 更新状态
        this.token = mockToken;
        this.userInfo = mockUserInfo;

        // 如果记住我，保存用户名
        if (this.rememberMe) {
          this.username = credentials.username;
        }

        return { success: true, userInfo: mockUserInfo };
      } catch (error) {
        this.loginError = error instanceof Error ? error.message : "登录失败";
        return { success: false, error: this.loginError };
      } finally {
        this.loginLoading = false;
      }
    },

    /**
     * 手机号登录
     * @param credentials - 手机号登录凭证
     */
    async loginByPhone(credentials: { phone: string; smsCode: string }) {
      this.loginLoading = true;
      this.loginError = null;

      try {
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 模拟登录成功
        const mockUserInfo: UserInfo = {
          id: "20240002",
          username: credentials.phone,
          nickname: "手机用户",
          avatar: "/static/logo.png",
          phone: credentials.phone,
          email: `${credentials.phone}@example.com`,
          gender: "unknown",
          birthday: "1990-01-01",
          bio: "通过手机号注册的用户",
          level: "普通会员",
          vipLevel: 0,
          createTime: "2024-01-01 00:00:00",
          lastLoginTime: new Date().toISOString(),
        };

        const mockToken = "mock_phone_token_" + Date.now();

        // 更新状态
        this.token = mockToken;
        this.userInfo = mockUserInfo;

        return { success: true, userInfo: mockUserInfo };
      } catch (error) {
        this.loginError =
          error instanceof Error ? error.message : "手机号登录失败";
        return { success: false, error: this.loginError };
      } finally {
        this.loginLoading = false;
      }
    },

    /**
     * 退出登录
     */
    logout() {
      // 清除状态
      this.token = "";
      this.userInfo = null;
      this.loginError = null;

      // 清除本地存储（除了记住我选项）
      if (!this.rememberMe) {
        this.username = "";
      }

      // 跳转到登录页
      uni.reLaunch({
        url: "/pages/login/index",
      });
    },

    /**
     * 更新用户信息
     * @param info - 新的用户信息
     */
    updateUserInfo(info: Partial<UserInfo>) {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...info };
      }
    },

    /**
     * 检查登录状态
     */
    checkLoginStatus() {
      // Pinia持久化会自动恢复状态
      return !!this.token;
    },

    /**
     * 初始化用户状态
     */
    initUserState() {
      this.checkLoginStatus();
    },

    /**
     * 设置记住我状态
     * @param remember - 是否记住我
     */
    setRememberMe(remember: boolean) {
      this.rememberMe = remember;
    },

    /**
     * 设置用户名（用于记住我功能）
     * @param username - 用户名
     */
    setUsername(username: string) {
      this.username = username;
    },
  },
});
