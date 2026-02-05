<!--
  登录页面
  
  此页面提供账号密码登录和手机号验证码登录两种方式，
  支持切换登录方式，界面设计美观大气。
  
  @file index.vue
  @author AICode
  @version 1.0.0
-->

<template>
  <view class="login-container">
    <!-- 背景装饰 -->
    <view class="background-decorations">
      <view class="circle circle-1"></view>
      <view class="circle circle-2"></view>
      <view class="circle circle-3"></view>
    </view>

    <!-- 顶部区域 -->
    <view class="header">
      <view class="app-logo">
        <image src="/static/logo.png" mode="aspectFit" class="logo-image" />
      </view>
      <text class="app-title">智能助手</text>
      <text class="app-subtitle">让生活更智能，让工作更高效</text>
    </view>

    <!-- 登录卡片 -->
    <view class="login-card">
      <!-- 登录方式切换 -->
      <view class="login-type-tabs">
        <view
          class="tab-item"
          :class="{ active: loginType === 'password' }"
          @tap="switchLoginType('password')"
        >
          <text class="tab-text">账号密码登录</text>
          <view class="tab-indicator" v-if="loginType === 'password'"></view>
        </view>
        <view
          class="tab-item"
          :class="{ active: loginType === 'sms' }"
          @tap="switchLoginType('sms')"
        >
          <text class="tab-text">手机号登录</text>
          <view class="tab-indicator" v-if="loginType === 'sms'"></view>
        </view>
      </view>

      <!-- 账号密码登录表单 -->
      <view class="login-form" v-if="loginType === 'password'">
        <view class="form-group">
          <view class="input-wrapper">
            <uni-icons
              type="person"
              size="20"
              color="#999"
              class="input-icon"
            ></uni-icons>
            <input
              type="text"
              v-model="form.username"
              placeholder="请输入用户名/手机号/邮箱"
              class="form-input"
              placeholder-class="placeholder"
            />
          </view>
        </view>

        <view class="form-group">
          <view class="input-wrapper">
            <uni-icons
              type="locked"
              size="20"
              color="#999"
              class="input-icon"
            ></uni-icons>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              placeholder="请输入密码"
              class="form-input"
              placeholder-class="placeholder"
            />
            <uni-icons
              :type="showPassword ? 'eye-slash' : 'eye'"
              size="20"
              color="#999"
              class="password-toggle"
              @tap="togglePasswordVisibility"
            ></uni-icons>
          </view>
        </view>

        <view class="form-options">
          <label class="remember-me">
            <checkbox :checked="rememberMe" @tap="rememberMe = !rememberMe" />
            <text class="option-text">记住我</text>
          </label>
          <text class="forgot-password" @tap="navigateToForgotPassword"
            >忘记密码？</text
          >
        </view>

        <button
          class="login-button"
          :class="{ loading: isLoading }"
          :disabled="isLoading"
          @tap="handlePasswordLogin"
        >
          <text v-if="!isLoading">登录</text>
          <view v-else class="loading-spinner"></view>
        </button>

        <view class="divider">
          <view class="divider-line"></view>
          <text class="divider-text">或</text>
          <view class="divider-line"></view>
        </view>

        <view class="quick-login">
          <text class="quick-login-text">快速登录</text>
          <view class="social-buttons">
            <button class="social-button wechat" @tap="handleWechatLogin">
              <uni-icons type="weixin" size="24" color="#fff"></uni-icons>
            </button>
            <button class="social-button qq" @tap="handleQQLogin">
              <uni-icons type="qq" size="24" color="#fff"></uni-icons>
            </button>
            <button class="social-button apple" @tap="handleAppleLogin">
              <uni-icons type="apple" size="24" color="#fff"></uni-icons>
            </button>
          </view>
        </view>
      </view>

      <!-- 手机号登录表单 -->
      <view class="login-form" v-else>
        <view class="form-group">
          <view class="input-wrapper">
            <uni-icons
              type="phone"
              size="20"
              color="#999"
              class="input-icon"
            ></uni-icons>
            <input
              type="number"
              v-model="form.phone"
              placeholder="请输入手机号"
              class="form-input"
              placeholder-class="placeholder"
              maxlength="11"
            />
          </view>
        </view>

        <view class="form-group">
          <view class="input-wrapper">
            <uni-icons
              type="chat"
              size="20"
              color="#999"
              class="input-icon"
            ></uni-icons>
            <input
              type="number"
              v-model="form.smsCode"
              placeholder="请输入验证码"
              class="form-input sms-input"
              placeholder-class="placeholder"
              maxlength="6"
            />
            <button
              class="sms-button"
              :disabled="smsCountdown > 0"
              @tap="sendSmsCode"
            >
              <text v-if="smsCountdown === 0">获取验证码</text>
              <text v-else>{{ smsCountdown }}秒后重试</text>
            </button>
          </view>
        </view>

        <button
          class="login-button"
          :class="{ loading: isLoading }"
          :disabled="isLoading"
          @tap="handleSmsLogin"
        >
          <text v-if="!isLoading">登录</text>
          <view v-else class="loading-spinner"></view>
        </button>
      </view>

      <!-- 注册链接 -->
      <view class="register-link">
        <text class="register-text">还没有账号？</text>
        <text class="register-button" @tap="navigateToRegister">立即注册</text>
      </view>
    </view>

    <!-- 底部协议 -->
    <view class="agreement">
      <text class="agreement-text">登录即代表您已同意</text>
      <text class="agreement-link" @tap="navigateToAgreement"
        >《用户协议》</text
      >
      <text class="agreement-text">和</text>
      <text class="agreement-link" @tap="navigateToPrivacy">《隐私政策》</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";

/**
 * 登录类型
 * password - 账号密码登录
 * sms - 手机号验证码登录
 */
type LoginType = "password" | "sms";

// 响应式数据
const loginType = ref<LoginType>("password");
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);
const smsCountdown = ref(0);

// 表单数据
const form = reactive({
  username: "",
  password: "",
  phone: "",
  smsCode: "",
});

/**
 * 切换登录方式
 * @param type - 登录类型
 */
const switchLoginType = (type: LoginType) => {
  loginType.value = type;
  // 清空表单
  Object.keys(form).forEach((key) => {
    form[key as keyof typeof form] = "";
  });
};

/**
 * 切换密码可见性
 */
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

/**
 * 发送短信验证码
 */
const sendSmsCode = () => {
  if (!form.phone) {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
    });
    return;
  }

  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    uni.showToast({
      title: "手机号格式不正确",
      icon: "none",
    });
    return;
  }

  // 开始倒计时
  smsCountdown.value = 60;
  const timer = setInterval(() => {
    smsCountdown.value--;
    if (smsCountdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);

  // 模拟发送验证码
  uni.showToast({
    title: "验证码已发送",
    icon: "success",
  });

  // 这里应该调用API发送验证码
  // sendSmsApi({ phone: form.phone })
};

/**
 * 处理账号密码登录
 */
const handlePasswordLogin = async () => {
  if (!form.username || !form.password) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }

  isLoading.value = true;

  try {
    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 登录成功
    uni.showToast({
      title: "登录成功",
      icon: "success",
    });

    // 保存登录状态
    if (rememberMe.value) {
      uni.setStorageSync("rememberMe", true);
      uni.setStorageSync("username", form.username);
    }

    // 跳转到首页
    setTimeout(() => {
      uni.switchTab({
        url: "/pages/index/index",
      });
    }, 1000);
  } catch (error) {
    uni.showToast({
      title: "登录失败，请检查账号密码",
      icon: "none",
    });
  } finally {
    isLoading.value = false;
  }
};

/**
 * 处理手机号登录
 */
const handleSmsLogin = async () => {
  if (!form.phone || !form.smsCode) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }

  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    uni.showToast({
      title: "手机号格式不正确",
      icon: "none",
    });
    return;
  }

  if (!/^\d{6}$/.test(form.smsCode)) {
    uni.showToast({
      title: "验证码格式不正确",
      icon: "none",
    });
    return;
  }

  isLoading.value = true;

  try {
    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 登录成功
    uni.showToast({
      title: "登录成功",
      icon: "success",
    });

    // 跳转到首页
    setTimeout(() => {
      uni.switchTab({
        url: "/pages/index/index",
      });
    }, 1000);
  } catch (error) {
    uni.showToast({
      title: "登录失败，请检查验证码",
      icon: "none",
    });
  } finally {
    isLoading.value = false;
  }
};

/**
 * 第三方登录处理
 */
const handleWechatLogin = () => {
  uni.showToast({
    title: "微信登录功能开发中",
    icon: "none",
  });
};

const handleQQLogin = () => {
  uni.showToast({
    title: "QQ登录功能开发中",
    icon: "none",
  });
};

const handleAppleLogin = () => {
  uni.showToast({
    title: "Apple登录功能开发中",
    icon: "none",
  });
};

/**
 * 页面跳转
 */
const navigateToRegister = () => {
  uni.navigateTo({
    url: "/pages/register/index",
  });
};

const navigateToForgotPassword = () => {
  uni.navigateTo({
    url: "/pages/forgot-password/index",
  });
};

const navigateToAgreement = () => {
  uni.navigateTo({
    url: "/pages/webview/index?url=https://example.com/agreement&title=用户协议",
  });
};

const navigateToPrivacy = () => {
  uni.navigateTo({
    url: "/pages/webview/index?url=https://example.com/privacy&title=隐私政策",
  });
};

// 页面加载
onLoad(() => {
  // 检查是否有记住的账号
  if (uni.getStorageSync("rememberMe")) {
    form.username = uni.getStorageSync("username") || "";
    rememberMe.value = true;
  }
});
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx;
  position: relative;
  overflow: hidden;
}

.background-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);

  &.circle-1 {
    width: 300rpx;
    height: 300rpx;
    top: -150rpx;
    right: -150rpx;
  }

  &.circle-2 {
    width: 200rpx;
    height: 200rpx;
    bottom: 100rpx;
    left: -100rpx;
  }

  &.circle-3 {
    width: 150rpx;
    height: 150rpx;
    bottom: -75rpx;
    right: 100rpx;
  }
}

.header {
  text-align: center;
  margin-top: 80rpx;
  margin-bottom: 60rpx;
  position: relative;
  z-index: 1;
}

.app-logo {
  width: 120rpx;
  height: 120rpx;
  margin: 0 auto 30rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
}

.logo-image {
  width: 80rpx;
  height: 80rpx;
}

.app-title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 16rpx;
}

.app-subtitle {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.login-card {
  background: #ffffff;
  border-radius: 32rpx;
  padding: 60rpx 50rpx;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  margin-bottom: 40rpx;
}

.login-type-tabs {
  display: flex;
  margin-bottom: 50rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding-bottom: 24rpx;
  position: relative;

  &.active {
    .tab-text {
      color: #007aff;
      font-weight: 600;
    }
  }
}

.tab-text {
  font-size: 32rpx;
  color: #666666;
  transition: color 0.3s;
}

.tab-indicator {
  position: absolute;
  bottom: -2rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 80rpx;
  height: 6rpx;
  background: #007aff;
  border-radius: 3rpx;
}

.form-group {
  margin-bottom: 40rpx;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 2rpx solid #e0e0e0;
  border-radius: 16rpx;
  padding: 0 30rpx;
  height: 100rpx;
  transition: border-color 0.3s;

  &:focus-within {
    border-color: #007aff;
  }
}

.input-icon {
  margin-right: 20rpx;
}

.form-input {
  flex: 1;
  height: 100%;
  font-size: 32rpx;
  color: #333333;

  &.sms-input {
    margin-right: 20rpx;
  }
}

.placeholder {
  color: #999999;
  font-size: 32rpx;
}

.password-toggle {
  margin-left: 20rpx;
}

.sms-button {
  background: #007aff;
  color: #ffffff;
  font-size: 28rpx;
  padding: 16rpx 32rpx;
  border-radius: 12rpx;
  white-space: nowrap;

  &:disabled {
    background: #cccccc;
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50rpx;
}

.remember-me {
  display: flex;
  align-items: center;

  checkbox {
    margin-right: 12rpx;
  }
}

.option-text {
  font-size: 28rpx;
  color: #666666;
}

.forgot-password {
  font-size: 28rpx;
  color: #007aff;
}

.login-button {
  background: linear-gradient(135deg, #007aff 0%, #0056cc 100%);
  color: #ffffff;
  font-size: 36rpx;
  font-weight: 600;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 16rpx;
  border: none;
  width: 100%;
  margin-bottom: 40rpx;
  transition: all 0.3s;

  &:active {
    opacity: 0.9;
    transform: translateY(2rpx);
  }

  &:disabled {
    background: #cccccc;
    opacity: 0.7;
  }

  &.loading {
    opacity: 0.8;
  }
}

.loading-spinner {
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.divider {
  display: flex;
  align-items: center;
  margin: 40rpx 0;
}

.divider-line {
  flex: 1;
  height: 2rpx;
  background: #f0f0f0;
}

.divider-text {
  padding: 0 30rpx;
  font-size: 28rpx;
  color: #999999;
}

.quick-login {
  text-align: center;
}

.quick-login-text {
  display: block;
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 30rpx;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 40rpx;
}

.social-button {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &.wechat {
    background: #07c160;
  }

  &.qq {
    background: #12b7f5;
  }

  &.apple {
    background: #000000;
  }
}

.register-link {
  text-align: center;
  margin-top: 50rpx;
  padding-top: 30rpx;
  border-top: 2rpx solid #f0f0f0;
}

.register-text {
  font-size: 28rpx;
  color: #666666;
  margin-right: 12rpx;
}

.register-button {
  font-size: 28rpx;
  color: #007aff;
  font-weight: 600;
}

.agreement {
  text-align: center;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 1;
}

.agreement-text {
  margin: 0 4rpx;
}

.agreement-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: underline;
}
</style>
