<!--
  忘记密码页面
  
  此页面提供忘记密码找回功能，支持通过手机号或邮箱重置密码。
  包含验证身份、设置新密码等步骤。
  
  @file index.vue
  @author AICode
  @version 1.0.0
-->

<template>
  <view class="forgot-password-container">
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
      <text class="page-title">找回密码</text>
      <text class="page-subtitle">请选择找回密码的方式</text>
    </view>

    <!-- 步骤指示器 -->
    <view class="step-indicator">
      <view
        class="step-item"
        :class="{ active: currentStep >= 1, completed: currentStep > 1 }"
      >
        <view class="step-number">1</view>
        <text class="step-text">验证身份</text>
      </view>
      <view class="step-line" :class="{ active: currentStep > 1 }"></view>
      <view
        class="step-item"
        :class="{ active: currentStep >= 2, completed: currentStep > 2 }"
      >
        <view class="step-number">2</view>
        <text class="step-text">重置密码</text>
      </view>
      <view class="step-line" :class="{ active: currentStep > 2 }"></view>
      <view class="step-item" :class="{ active: currentStep >= 3 }">
        <view class="step-number">3</view>
        <text class="step-text">完成</text>
      </view>
    </view>

    <!-- 步骤1：选择验证方式 -->
    <view class="step-content" v-if="currentStep === 1">
      <view class="verification-methods">
        <view
          class="method-card"
          :class="{ active: verificationMethod === 'phone' }"
          @tap="selectVerificationMethod('phone')"
        >
          <uni-icons type="phone" size="40" color="#007aff"></uni-icons>
          <text class="method-title">手机号验证</text>
          <text class="method-desc">通过手机短信验证码找回</text>
          <view class="method-check" v-if="verificationMethod === 'phone'">
            <uni-icons
              type="checkmarkempty"
              size="20"
              color="#007aff"
            ></uni-icons>
          </view>
        </view>

        <view
          class="method-card"
          :class="{ active: verificationMethod === 'email' }"
          @tap="selectVerificationMethod('email')"
        >
          <uni-icons type="email" size="40" color="#007aff"></uni-icons>
          <text class="method-title">邮箱验证</text>
          <text class="method-desc">通过邮箱验证码找回</text>
          <view class="method-check" v-if="verificationMethod === 'email'">
            <uni-icons
              type="checkmarkempty"
              size="20"
              color="#007aff"
            ></uni-icons>
          </view>
        </view>
      </view>

      <!-- 手机号验证表单 -->
      <view class="verification-form" v-if="verificationMethod === 'phone'">
        <view class="form-group">
          <text class="form-label">手机号</text>
          <view class="input-wrapper">
            <input
              type="number"
              v-model="form.phone"
              placeholder="请输入注册手机号"
              class="form-input"
              placeholder-class="placeholder"
              maxlength="11"
            />
          </view>
        </view>

        <view class="form-group">
          <text class="form-label">验证码</text>
          <view class="input-wrapper">
            <input
              type="number"
              v-model="form.smsCode"
              placeholder="请输入短信验证码"
              class="form-input sms-input"
              placeholder-class="placeholder"
              maxlength="6"
            />
            <button
              class="sms-button"
              :disabled="smsCountdown > 0"
              @tap="sendVerificationCode"
            >
              <text v-if="smsCountdown === 0">获取验证码</text>
              <text v-else>{{ smsCountdown }}秒后重试</text>
            </button>
          </view>
        </view>
      </view>

      <!-- 邮箱验证表单 -->
      <view class="verification-form" v-else>
        <view class="form-group">
          <text class="form-label">邮箱地址</text>
          <view class="input-wrapper">
            <input
              type="text"
              v-model="form.email"
              placeholder="请输入注册邮箱"
              class="form-input"
              placeholder-class="placeholder"
            />
          </view>
        </view>

        <view class="form-group">
          <text class="form-label">验证码</text>
          <view class="input-wrapper">
            <input
              type="number"
              v-model="form.emailCode"
              placeholder="请输入邮箱验证码"
              class="form-input sms-input"
              placeholder-class="placeholder"
              maxlength="6"
            />
            <button
              class="sms-button"
              :disabled="emailCountdown > 0"
              @tap="sendEmailCode"
            >
              <text v-if="emailCountdown === 0">获取验证码</text>
              <text v-else>{{ emailCountdown }}秒后重试</text>
            </button>
          </view>
        </view>
      </view>

      <button
        class="next-button"
        :disabled="!canProceedToNextStep"
        @tap="goToNextStep"
      >
        下一步
      </button>
    </view>

    <!-- 步骤2：设置新密码 -->
    <view class="step-content" v-else-if="currentStep === 2">
      <view class="password-form">
        <view class="form-group">
          <text class="form-label">新密码</text>
          <view class="input-wrapper">
            <uni-icons
              type="locked"
              size="20"
              color="#999"
              class="input-icon"
            ></uni-icons>
            <input
              :type="showNewPassword ? 'text' : 'password'"
              v-model="form.newPassword"
              placeholder="请输入新密码（6-20位字符）"
              class="form-input"
              placeholder-class="placeholder"
            />
            <uni-icons
              :type="showNewPassword ? 'eye-slash' : 'eye'"
              size="20"
              color="#999"
              class="password-toggle"
              @tap="showNewPassword = !showNewPassword"
            ></uni-icons>
          </view>
          <text class="form-hint">密码需包含字母和数字，长度6-20位</text>
        </view>

        <view class="form-group">
          <text class="form-label">确认新密码</text>
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
              placeholder="请再次输入新密码"
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
          <text
            class="form-hint"
            :class="{
              error:
                form.confirmPassword &&
                form.newPassword !== form.confirmPassword,
            }"
          >
            {{ getPasswordMatchStatus() }}
          </text>
        </view>

        <view class="password-strength">
          <text class="strength-label">密码强度：</text>
          <view class="strength-meter">
            <view
              class="strength-segment"
              :class="getPasswordStrengthClass(1)"
            ></view>
            <view
              class="strength-segment"
              :class="getPasswordStrengthClass(2)"
            ></view>
            <view
              class="strength-segment"
              :class="getPasswordStrengthClass(3)"
            ></view>
            <view
              class="strength-segment"
              :class="getPasswordStrengthClass(4)"
            ></view>
          </view>
          <text class="strength-text">{{ getPasswordStrengthText() }}</text>
        </view>
      </view>

      <button
        class="next-button"
        :disabled="!canResetPassword"
        @tap="resetPassword"
      >
        重置密码
      </button>
    </view>

    <!-- 步骤3：完成 -->
    <view class="step-content" v-else>
      <view class="success-container">
        <view class="success-icon">
          <uni-icons
            type="checkmarkempty"
            size="60"
            color="#34c759"
          ></uni-icons>
        </view>
        <text class="success-title">密码重置成功！</text>
        <text class="success-message">您已成功重置密码，请使用新密码登录</text>

        <view class="success-tips">
          <text class="tip-title">安全提示：</text>
          <text class="tip-item">1. 请妥善保管您的密码，不要泄露给他人</text>
          <text class="tip-item">2. 建议定期更换密码以提高安全性</text>
          <text class="tip-item">3. 如发现异常登录，请及时修改密码</text>
        </view>

        <button class="login-button" @tap="goToLogin">立即登录</button>

        <button class="home-button" @tap="goToHome">返回首页</button>
      </view>
    </view>

    <!-- 底部链接 -->
    <view class="bottom-links">
      <text class="link-text">想起密码了？</text>
      <text class="link-button" @tap="goToLogin">返回登录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

// 响应式数据
const currentStep = ref(1);
const verificationMethod = ref<"phone" | "email">("phone");
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const smsCountdown = ref(0);
const emailCountdown = ref(0);

// 表单数据
const form = reactive({
  phone: "",
  smsCode: "",
  email: "",
  emailCode: "",
  newPassword: "",
  confirmPassword: "",
});

/**
 * 选择验证方式
 */
const selectVerificationMethod = (method: "phone" | "email") => {
  verificationMethod.value = method;
};

/**
 * 发送验证码
 */
const sendVerificationCode = () => {
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

const sendEmailCode = () => {
  if (!form.email) {
    uni.showToast({
      title: "请输入邮箱地址",
      icon: "none",
    });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    uni.showToast({
      title: "邮箱格式不正确",
      icon: "none",
    });
    return;
  }

  // 开始倒计时
  emailCountdown.value = 60;
  const timer = setInterval(() => {
    emailCountdown.value--;
    if (emailCountdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);

  uni.showToast({
    title: "验证码已发送",
    icon: "success",
  });
};

/**
 * 检查是否可以进入下一步
 */
const canProceedToNextStep = computed(() => {
  if (verificationMethod.value === "phone") {
    return (
      form.phone &&
      form.smsCode &&
      /^1[3-9]\d{9}$/.test(form.phone) &&
      /^\d{6}$/.test(form.smsCode)
    );
  } else {
    return (
      form.email &&
      form.emailCode &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      /^\d{6}$/.test(form.emailCode)
    );
  }
});

/**
 * 检查是否可以重置密码
 */
const canResetPassword = computed(() => {
  const hasPassword = form.newPassword && form.confirmPassword;
  const passwordsMatch = form.newPassword === form.confirmPassword;
  const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/.test(
    form.newPassword,
  );

  return hasPassword && passwordsMatch && passwordValid;
});

/**
 * 获取密码匹配状态
 */
const getPasswordMatchStatus = () => {
  if (!form.confirmPassword) return "请再次输入密码";
  if (form.newPassword !== form.confirmPassword) return "两次输入的密码不一致";
  return "密码匹配";
};

/**
 * 获取密码强度
 */
const getPasswordStrength = () => {
  if (!form.newPassword) return 0;

  let strength = 0;
  if (form.newPassword.length >= 6) strength++;
  if (form.newPassword.length >= 8) strength++;
  if (/[A-Za-z]/.test(form.newPassword) && /\d/.test(form.newPassword))
    strength++;
  if (/[@$!%*#?&]/.test(form.newPassword)) strength++;

  return Math.min(strength, 4);
};

/**
 * 获取密码强度类名
 */
const getPasswordStrengthClass = (segment: number) => {
  const strength = getPasswordStrength();
  if (segment <= strength) {
    if (strength <= 2) return "weak";
    if (strength === 3) return "medium";
    return "strong";
  }
  return "";
};

/**
 * 获取密码强度文本
 */
const getPasswordStrengthText = () => {
  const strength = getPasswordStrength();
  switch (strength) {
    case 0:
      return "无";
    case 1:
      return "弱";
    case 2:
      return "中";
    case 3:
      return "强";
    case 4:
      return "非常强";
    default:
      return "无";
  }
};

/**
 * 步骤导航
 */
const goToNextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

/**
 * 重置密码
 */
const resetPassword = async () => {
  if (!canResetPassword.value) return;

  uni.showLoading({
    title: "正在重置密码...",
  });

  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1500));

    uni.hideLoading();
    goToNextStep();
  } catch (error) {
    uni.hideLoading();
    uni.showToast({
      title: "重置密码失败",
      icon: "none",
    });
  }
};

/**
 * 页面跳转
 */
const goBack = () => {
  if (currentStep.value > 1) {
    goToPreviousStep();
  } else {
    uni.navigateBack();
  }
};

const goToLogin = () => {
  uni.redirectTo({
    url: "/pages/login/index",
  });
};

const goToHome = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>
.forgot-password-container {
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

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60rpx;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &.active {
    .step-number {
      background: #007aff;
      color: #ffffff;
    }

    .step-text {
      color: #007aff;
      font-weight: 600;
    }
  }

  &.completed {
    .step-number {
      background: #34c759;
      color: #ffffff;
    }
  }
}

.step-number {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background: #e0e0e0;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
  transition: all 0.3s;
}

.step-text {
  font-size: 24rpx;
  color: #999999;
  transition: color 0.3s;
}

.step-line {
  width: 80rpx;
  height: 4rpx;
  background: #e0e0e0;
  margin: 0 20rpx;
  transition: background 0.3s;

  &.active {
    background: #007aff;
  }
}

.step-content {
  background: #ffffff;
  border-radius: 32rpx;
  padding: 50rpx 40rpx;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 40rpx;
}

.verification-methods {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  margin-bottom: 50rpx;
}

.method-card {
  border: 2rpx solid #e0e0e0;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  position: relative;
  transition: all 0.3s;

  &.active {
    border-color: #007aff;
    background: rgba(0, 122, 255, 0.05);
  }
}

.method-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-top: 20rpx;
}

.method-desc {
  display: block;
  font-size: 26rpx;
  color: #666666;
  margin-top: 8rpx;
}

.method-check {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
}

.verification-form {
  margin-bottom: 50rpx;
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

.form-hint {
  display: block;
  font-size: 24rpx;
  color: #666666;
  margin-top: 12rpx;

  &.error {
    color: #ff3b30;
  }
}

.password-form {
  margin-bottom: 50rpx;
}

.input-icon {
  margin-right: 20rpx;
}

.password-toggle {
  margin-left: 20rpx;
}

.password-strength {
  display: flex;
  align-items: center;
  margin-top: 30rpx;
  padding: 30rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
}

.strength-label {
  font-size: 28rpx;
  color: #333333;
  margin-right: 20rpx;
  white-space: nowrap;
}

.strength-meter {
  display: flex;
  gap: 8rpx;
  flex: 1;
}

.strength-segment {
  flex: 1;
  height: 12rpx;
  background: #e0e0e0;
  border-radius: 6rpx;

  &.weak {
    background: #ff3b30;
  }

  &.medium {
    background: #ff9500;
  }

  &.strong {
    background: #34c759;
  }
}

.strength-text {
  font-size: 28rpx;
  color: #333333;
  margin-left: 20rpx;
  min-width: 100rpx;
}

.next-button {
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

.success-container {
  text-align: center;
  padding: 40rpx 0;
}

.success-icon {
  width: 120rpx;
  height: 120rpx;
  background: rgba(52, 199, 89, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 40rpx;
}

.success-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20rpx;
}

.success-message {
  display: block;
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 50rpx;
}

.success-tips {
  text-align: left;
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 50rpx;
}

.tip-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 20rpx;
}

.tip-item {
  display: block;
  font-size: 26rpx;
  color: #666666;
  margin-bottom: 12rpx;
  line-height: 1.5;
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
  margin-bottom: 30rpx;
  transition: all 0.3s;

  &:active {
    opacity: 0.9;
    transform: translateY(2rpx);
  }
}

.home-button {
  background: #ffffff;
  color: #007aff;
  font-size: 36rpx;
  font-weight: 600;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 16rpx;
  border: 2rpx solid #007aff;
  width: 100%;
  transition: all 0.3s;

  &:active {
    opacity: 0.9;
    transform: translateY(2rpx);
  }
}

.bottom-links {
  text-align: center;
  font-size: 28rpx;
  color: #666666;
}

.link-text {
  margin-right: 12rpx;
}

.link-button {
  color: #007aff;
  font-weight: 600;
}
</style>
