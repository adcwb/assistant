/**
 * 用户状态管理
 *
 * 此文件管理用户相关的全局状态，包括登录状态、用户信息等。
 * 使用Vue的响应式系统进行状态管理，确保状态的一致性和响应式。
 *
 * @file user.ts
 * @author AICode
 * @version 1.0.0
 */

import { computed, ref } from "vue";

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

// 全局状态
const token = ref<string>("");
const userInfo = ref<UserInfo | null>(null);
const loginLoading = ref(false);
const loginError = ref<string | null>(null);

/**
 * 用户状态管理
 */
export const useUserStore = () => {
  // 计算属性
  const isLoggedIn = computed(() => !!token.value);

  /**
   * 用户登录
   * @param credentials - 登录凭证
   */
  const login = async (credentials: { username: string; password: string }) => {
    loginLoading.value = true;
    loginError.value = null;

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
      token.value = mockToken;
      userInfo.value = mockUserInfo;

      // 保存到本地存储
      uni.setStorageSync("token", mockToken);
      uni.setStorageSync("userInfo", mockUserInfo);

      return { success: true, userInfo: mockUserInfo };
    } catch (error) {
      loginError.value = error instanceof Error ? error.message : "登录失败";
      return { success: false, error: loginError.value };
    } finally {
      loginLoading.value = false;
    }
  };

  /**
   * 手机号登录
   * @param credentials - 手机号登录凭证
   */
  const loginByPhone = async (credentials: {
    phone: string;
    smsCode: string;
  }) => {
    loginLoading.value = true;
    loginError.value = null;

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
      token.value = mockToken;
      userInfo.value = mockUserInfo;

      // 保存到本地存储
      uni.setStorageSync("token", mockToken);
      uni.setStorageSync("userInfo", mockUserInfo);

      return { success: true, userInfo: mockUserInfo };
    } catch (error) {
      loginError.value =
        error instanceof Error ? error.message : "手机号登录失败";
      return { success: false, error: loginError.value };
    } finally {
      loginLoading.value = false;
    }
  };

  /**
   * 退出登录
   */
  const logout = () => {
    // 清除状态
    token.value = "";
    userInfo.value = null;

    // 清除本地存储
    uni.removeStorageSync("token");
    uni.removeStorageSync("userInfo");
    uni.removeStorageSync("rememberMe");
    uni.removeStorageSync("username");

    // 跳转到登录页
    uni.reLaunch({
      url: "/pages/login/index",
    });
  };

  /**
   * 更新用户信息
   * @param info - 新的用户信息
   */
  const updateUserInfo = (info: Partial<UserInfo>) => {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...info };
      uni.setStorageSync("userInfo", userInfo.value);
    }
  };

  /**
   * 检查登录状态
   */
  const checkLoginStatus = () => {
    const savedToken = uni.getStorageSync("token");
    const savedUserInfo = uni.getStorageSync("userInfo");

    if (savedToken && savedUserInfo) {
      token.value = savedToken;
      userInfo.value = savedUserInfo;
      return true;
    }

    return false;
  };

  /**
   * 初始化用户状态
   */
  const initUserState = () => {
    checkLoginStatus();
  };

  return {
    // 状态
    token,
    userInfo,
    isLoggedIn,
    loginLoading,
    loginError,

    // 方法
    login,
    loginByPhone,
    logout,
    updateUserInfo,
    checkLoginStatus,
    initUserState,
  };
};

// 导出单例
export const userStore = useUserStore();
