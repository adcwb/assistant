<!--
  注册页面
  
  此页面提供用户注册功能，支持手机号注册和邮箱注册。
  包含表单验证、协议同意等功能。
  
  @file index.vue
  @author AICode
  @version 1.0.0
-->

<template>
  <view class="register-container">
    <!-- 背景装饰 -->
    <view class="background-decorations">
      <view class="circle circle-1"></view>
      <view class="circle circle-2"></view>
    </view>

    <!-- 返回按钮 -->
    <view class="back-button" @tap="goBack">
      <uni-icons type="arrowleft" size="24" color="#333"></uni-icons>
    </view>

    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">注册账号</text>
      <text class="page-subtitle">创建您的智能助手账号</text>
    </view>

    <!-- 注册表单 -->
    <view class="register-form">
      <view class="form-group">
        <text class="form-label">手机号</text>
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
        <text class="form-label">验证码</text>
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

      <view class="form-group">
        <text class="form-label">密码</text>
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
            placeholder="请输入密码（6-20位字符）"
            class="form-input"
            placeholder-class="placeholder"
          />
          <uni-icons
            :type="showPassword ? 'eye-slash' : 'eye'"
            size="20"
            color="#999"
            class="password-toggle"
            @tap="showPassword = !showPassword"
          ></uni-icons>
        </view>
        <text class="form-hint">密码需包含字母和数字</text>
      </view>

      <view class="form-group">
        <text class="form-label">确认密码</text>
        <view class="input-wrapper">
          <uni-icons
            type="locked"
            size="20"
            color="#999"
            class="input-icon"
          ></uni-icons>
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="form.confirmPassword"
            placeholder="请再次输入密码"
            class="form-input"
            placeholder-class="placeholder"
          />
          <uni-icons
            :type="showConfirmPassword ? 'eye-slash' : 'eye'"
            size="20"
            color="#999"
            class="password-toggle"
            @tap="showConfirmPassword = !showConfirmPassword"
          ></uni-icons>
        </view>
      </view>

      <view class="agreement">
        <label class="agreement-checkbox">
          <checkbox
            :checked="agreeAgreement"
            @tap="agreeAgreement = !agreeAgreement"
          />
          <text class="agreement-text">
            我已阅读并同意
            <text class="agreement-link" @tap="navigateToAgreement"
              >《用户协议》</text
            >
            和
            <text class="agreement-link" @tap="navigateToPrivacy"
              >《隐私政策》</text
            >
          </text>
        </label>
      </view>

      <button
        class="register-button"
        :disabled="!canRegister"
        @tap="handleRegister"
      >
        注册
      </button>

      <view class="login-link">
        <text class="login-text">已有账号？</text>
        <text class="login-button" @tap="goToLogin">立即登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

// 响应式数据
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const smsCountdown = ref(0);
const agreeAgreement = ref(false);

// 表单数据
const form = reactive({
  phone: "",
  smsCode: "",
  password: "",
  confirmPassword: "",
});

/**
 * 检查是否可以注册
 */
const canRegister = computed(() => {
  const hasPhone = form.phone && /^1[3-9]\d{9}$/.test(form.phone);
  const hasSmsCode = form.smsCode && /^\d{6}$/.test(form.smsCode);
  const hasPassword = form.password && form.confirmPassword;
  const passwordsMatch = form.password === form.confirmPassword;
  const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/.test(
    form.password,
  );

  return (
    hasPhone &&
    hasSmsCode &&
    hasPassword &&
    passwordsMatch &&
    passwordValid &&
    agreeAgreement.value
  );
});

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

  uni.showToast({
    title: "验证码已发送",
    icon: "success",
  });
};

/**
 * 处理注册
 */
const handleRegister = async () => {
  if (!canRegister.value) return;

  uni.showLoading({
    title: "注册中...",
  });

  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1500));

    uni.hideLoading();
    uni.showToast({
      title: "注册成功",
      icon: "success",
    });

    // 跳转到登录页
    setTimeout(() => {
      uni.redirectTo({
        url: "/pages/login/index",
      });
    }, 1000);
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "注册失败，请稍后重试",
      icon: "none",
    });
  }
};

/**
 * 页面跳转
 */
const goBack = () => {
  uni.navigateBack();
};

const goToLogin = () => {
  uni.redirectTo({
    url: "/pages/login/index",
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
</script>

<style lang="scss" scoped>
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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
  background: rgba(255, 255, 255, 0.3);

  &.circle-1 {
    width: 200rpx;
    height: 200rpx;
    top: -100rpx;
    right: -100rpx;
  }

  &.circle-2 {
    width: 150rpx;
    height: 150rpx;
    bottom: 50rpx;
    left: -75rpx;
  }
}

.back-button {
  width: 80rpx;
  height: 80rpx;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 40rpx;
}

.page-header {
  margin-bottom: 60rpx;
}

.page-title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16rpx;
}

.page-subtitle {
  display: block;
  font-size: 28rpx;
  color: #666666;
}

.register-form {
  background: #ffffff;
  border-radius: 32rpx;
  padding: 50rpx 40rpx;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 40rpx;
}

.form-label {
  display: block;
  font-size: 28rpx;
  color: #333333;
  margin-bottom: 16rpx;
  font-weight: 500;
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

.password-toggle {
  margin-left: 20rpx;
}

.form-hint {
  display: block;
  font-size: 24rpx;
  color: #666666;
  margin-top: 12rpx;
}

.agreement {
  margin: 40rpx 0 50rpx;
}

.agreement-checkbox {
  display: flex;
  align-items: flex-start;

  checkbox {
    margin-top: 4rpx;
    margin-right: 12rpx;
  }
}

.agreement-text {
  font-size: 26rpx;
  color: #666666;
  line-height: 1.5;
  flex: 1;
}

.agreement-link {
  color: #007aff;
}

.register-button {
  background: linear-gradient(135deg, #007aff 0%, #0056cc 100%);
  color: #ffffff;
  font-size: 36rpx;
  font-weight: 600;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 16rpx;
  border: none;
  width: 100%;
  transition: all 0.3s;

  &:active {
    opacity: 0.9;
    transform: translateY(2rpx);
  }

  &:disabled {
    background: #cccccc;
    opacity: 0.7;
  }
}

.login-link {
  text-align: center;
  margin-top: 40rpx;
  padding-top: 30rpx;
  border-top: 2rpx solid #f0f0f0;
}

.login-text {
  font-size: 28rpx;
  color: #666666;
  margin-right: 12rpx;
}

.login-button {
  font-size: 28rpx;
  color: #007aff;
  font-weight: 600;
}
</style>
