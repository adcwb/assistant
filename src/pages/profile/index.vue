<!--
  个人信息页面
  
  此页面显示用户个人信息，支持编辑个人资料、修改密码、设置等功能。
  界面设计美观大气，符合现代移动应用设计规范。
  
  @file index.vue
  @author AICode
  @version 1.0.0
-->

<template>
  <view class="profile-container">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-avatar-section">
        <view class="avatar-wrapper" @tap="changeAvatar">
          <image
            :src="userInfo.avatar || '/static/logo.png'"
            class="avatar"
            mode="aspectFill"
          />
          <view class="avatar-edit">
            <uni-icons type="camera" size="20" color="#ffffff"></uni-icons>
          </view>
        </view>
        <view class="user-info">
          <text class="user-name">{{ userInfo.nickname || "未设置昵称" }}</text>
          <text class="user-id">ID: {{ userInfo.userId || "--" }}</text>
          <view class="user-level" v-if="userInfo.level">
            <text class="level-text">{{ userInfo.level }}</text>
          </view>
        </view>
      </view>

      <view class="user-stats">
        <view class="stat-item">
          <text class="stat-value">{{ userStats.following || 0 }}</text>
          <text class="stat-label">关注</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ userStats.followers || 0 }}</text>
          <text class="stat-label">粉丝</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ userStats.likes || 0 }}</text>
          <text class="stat-label">获赞</text>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-section">
      <text class="section-title">账户设置</text>
      <view class="menu-list">
        <view class="menu-item" @tap="navigateToEditProfile">
          <uni-icons type="person" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">编辑资料</text>
          <uni-icons type="right" size="20" color="#999"></uni-icons>
        </view>

        <view class="menu-item" @tap="navigateToSecurity">
          <uni-icons type="locked" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">账号安全</text>
          <uni-icons type="right" size="20" color="#999"></uni-icons>
        </view>

        <view class="menu-item" @tap="navigateToPrivacy">
          <uni-icons type="eye" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">隐私设置</text>
          <uni-icons type="right" size="20" color="#999"></uni-icons>
        </view>

        <view class="menu-item" @tap="navigateToNotification">
          <uni-icons type="notification" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">消息通知</text>
          <uni-icons type="right" size="20" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <view class="menu-section">
      <text class="section-title">通用设置</text>
      <view class="menu-list">
        <view class="menu-item" @tap="navigateToTheme">
          <uni-icons type="palette" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">主题设置</text>
          <view class="menu-right">
            <text
              class="theme-preview"
              :style="{ backgroundColor: themeColor }"
            ></text>
            <uni-icons type="right" size="20" color="#999"></uni-icons>
          </view>
        </view>

        <view class="menu-item" @tap="toggleDarkMode">
          <uni-icons type="moon" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">深色模式</text>
          <switch
            :checked="darkMode"
            @change="toggleDarkMode"
            color="#007aff"
          />
        </view>

        <view class="menu-item" @tap="navigateToLanguage">
          <uni-icons type="language" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">语言设置</text>
          <view class="menu-right">
            <text class="language-text">{{ currentLanguage }}</text>
            <uni-icons type="right" size="20" color="#999"></uni-icons>
          </view>
        </view>

        <view class="menu-item" @tap="navigateToAbout">
          <uni-icons type="info" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">关于我们</text>
          <uni-icons type="right" size="20" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <view class="menu-section">
      <text class="section-title">支持与反馈</text>
      <view class="menu-list">
        <view class="menu-item" @tap="navigateToHelp">
          <uni-icons type="help" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">帮助中心</text>
          <uni-icons type="right" size="20" color="#999"></uni-icons>
        </view>

        <view class="menu-item" @tap="navigateToFeedback">
          <uni-icons type="chat" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">意见反馈</text>
          <uni-icons type="right" size="20" color="#999"></uni-icons>
        </view>

        <view class="menu-item" @tap="checkUpdate">
          <uni-icons type="reload" size="24" color="#007aff"></uni-icons>
          <text class="menu-text">检查更新</text>
          <view class="menu-right">
            <text class="version-text">v{{ appVersion }}</text>
            <uni-icons type="right" size="20" color="#999"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-section">
      <button class="logout-button" @tap="handleLogout">退出登录</button>
    </view>

    <!-- 底部安全提示 -->
    <view class="security-tips">
      <text class="tip-text">账号安全提示：请勿泄露个人信息，定期修改密码</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import { onMounted, reactive, ref } from "vue";

// 用户信息
const userInfo = reactive({
  avatar: "",
  nickname: "智能助手用户",
  userId: "20240001",
  level: "VIP会员",
  phone: "138****8888",
  email: "user@example.com",
  gender: "保密",
  birthday: "1990-01-01",
  bio: "这个人很懒，什么都没有留下~",
});

// 用户统计
const userStats = reactive({
  following: 128,
  followers: 256,
  likes: 1024,
});

// 应用设置
const darkMode = ref(false);
const themeColor = ref("#007aff");
const currentLanguage = ref("简体中文");
const appVersion = ref("1.0.0");

/**
 * 更换头像
 */
const changeAvatar = () => {
  uni.showActionSheet({
    itemList: ["拍照", "从相册选择", "取消"],
    success: (res) => {
      if (res.tapIndex === 0) {
        uni.showToast({ title: "拍照功能开发中", icon: "none" });
      } else if (res.tapIndex === 1) {
        uni.showToast({ title: "相册功能开发中", icon: "none" });
      }
    },
  });
};

/**
 * 切换深色模式
 */
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  uni.showToast({
    title: darkMode.value ? "已开启深色模式" : "已关闭深色模式",
    icon: "none",
  });
};

/**
 * 检查更新
 */
const checkUpdate = () => {
  uni.showLoading({ title: "检查更新中..." });

  setTimeout(() => {
    uni.hideLoading();
    uni.showModal({
      title: "更新提示",
      content: "当前已是最新版本",
      showCancel: false,
    });
  }, 1500);
};

/**
 * 退出登录
 */
const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({ title: "退出中..." });

        setTimeout(() => {
          uni.hideLoading();
          // 清除登录状态
          uni.removeStorageSync("token");
          uni.removeStorageSync("userInfo");

          // 跳转到登录页
          uni.reLaunch({
            url: "/pages/login/index",
          });
        }, 1000);
      }
    },
  });
};

/**
 * 页面跳转
 */
const navigateToEditProfile = () => {
  uni.navigateTo({
    url: "/pages/edit-profile/index",
  });
};

const navigateToSecurity = () => {
  uni.navigateTo({
    url: "/pages/security/index",
  });
};

const navigateToPrivacy = () => {
  uni.navigateTo({
    url: "/pages/privacy/index",
  });
};

const navigateToNotification = () => {
  uni.navigateTo({
    url: "/pages/notification/index",
  });
};

const navigateToTheme = () => {
  uni.navigateTo({
    url: "/pages/theme/index",
  });
};

const navigateToLanguage = () => {
  uni.navigateTo({
    url: "/pages/language/index",
  });
};

const navigateToAbout = () => {
  uni.navigateTo({
    url: "/pages/about/index",
  });
};

const navigateToHelp = () => {
  uni.navigateTo({
    url: "/pages/help/index",
  });
};

const navigateToFeedback = () => {
  uni.navigateTo({
    url: "/pages/feedback/index",
  });
};

// 页面显示时加载用户信息
onShow(() => {
  // 模拟加载用户信息
  const savedUserInfo = uni.getStorageSync("userInfo");
  if (savedUserInfo) {
    Object.assign(userInfo, savedUserInfo);
  }

  // 模拟加载设置
  const savedSettings = uni.getStorageSync("appSettings");
  if (savedSettings) {
    darkMode.value = savedSettings.darkMode || false;
    themeColor.value = savedSettings.themeColor || "#007aff";
    currentLanguage.value = savedSettings.language || "简体中文";
  }
});

// 页面加载
onMounted(() => {
  // 可以在这里添加更多的初始化逻辑
});
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 40rpx;
}

.user-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 40rpx 40rpx;
  padding: 60rpx 40rpx 40rpx;
  color: #ffffff;
  margin-bottom: 30rpx;
}

.user-avatar-section {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.avatar-wrapper {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  margin-right: 30rpx;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40rpx;
  height: 40rpx;
  background: #007aff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #ffffff;
}

.user-info {
  flex: 1;
}

.user-name {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.user-id {
  display: block;
  font-size: 24rpx;
  opacity: 0.8;
  margin-bottom: 12rpx;
}

.user-level {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.level-text {
  font-size: 22rpx;
  font-weight: 500;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 30rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  opacity: 0.8;
}

.stat-divider {
  width: 1rpx;
  height: 40rpx;
  background: rgba(255, 255, 255, 0.2);
}

.menu-section {
  background: #ffffff;
  border-radius: 20rpx;
  margin: 0 30rpx 30rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 30rpx;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.menu-text {
  flex: 1;
  font-size: 30rpx;
  color: #333333;
  margin-left: 20rpx;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.theme-preview {
  width: 30rpx;
  height: 30rpx;
  border-radius: 6rpx;
  border: 1rpx solid #e0e0e0;
}

.language-text {
  font-size: 26rpx;
  color: #666666;
}

.version-text {
  font-size: 26rpx;
  color: #666666;
}

.logout-section {
  margin: 40rpx 30rpx 0;
}

.logout-button {
  background: #ffffff;
  color: #ff3b30;
  font-size: 32rpx;
  font-weight: 600;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 16rpx;
  border: 2rpx solid #ff3b30;
  width: 100%;

  &:active {
    opacity: 0.9;
    background: rgba(255, 59, 48, 0.05);
  }
}

.security-tips {
  text-align: center;
  margin-top: 40rpx;
  padding: 0 30rpx;
}

.tip-text {
  font-size: 24rpx;
  color: #999999;
  line-height: 1.5;
}
</style>
