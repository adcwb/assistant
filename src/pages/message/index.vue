<!--
  消息页面
  
  此页面展示用户的消息通知、聊天记录和系统通知。
  设计符合iOS消息应用风格，简洁清晰。
  
  @file index.vue
  @author AICode
  @version 1.0.0
-->

<template>
  <view class="message-container">
    <!-- 顶部状态栏 -->
    <view class="status-bar"></view>

    <!-- 导航栏 -->
    <view class="nav-bar">
      <text class="nav-title">消息</text>
      <view class="nav-actions">
        <uni-icons
          type="plus"
          size="24"
          color="#333"
          @tap="handleNewMessage"
        ></uni-icons>
      </view>
    </view>

    <!-- 消息类型切换 -->
    <view class="message-tabs">
      <view
        class="tab-item"
        :class="{ active: activeTab === 'all' }"
        @tap="switchTab('all')"
      >
        <text class="tab-text">全部</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 'unread' }"
        @tap="switchTab('unread')"
      >
        <text class="tab-text">未读</text>
        <view class="badge" v-if="unreadCount > 0">{{ unreadCount }}</view>
      </view>
      <view
        class="tab-item"
        :class="{ active: activeTab === 'system' }"
        @tap="switchTab('system')"
      >
        <text class="tab-text">系统</text>
      </view>
    </view>

    <!-- 消息列表 -->
    <scroll-view class="message-list" scroll-y>
      <!-- 搜索框 -->
      <view class="search-box">
        <view class="search-input-wrapper">
          <uni-icons
            type="search"
            size="20"
            color="#999"
            class="search-icon"
          ></uni-icons>
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="搜索消息"
            class="search-input"
            placeholder-class="placeholder"
          />
          <uni-icons
            v-if="searchKeyword"
            type="clear"
            size="20"
            color="#999"
            class="clear-icon"
            @tap="clearSearch"
          ></uni-icons>
        </view>
      </view>

      <!-- 消息项 -->
      <view
        class="message-item"
        v-for="message in filteredMessages"
        :key="message.id"
        @tap="openMessage(message)"
      >
        <view class="avatar-wrapper">
          <image :src="message.avatar" mode="aspectFit" class="avatar" />
          <view class="online-dot" v-if="message.online"></view>
        </view>

        <view class="message-content">
          <view class="message-header">
            <text class="sender-name">{{ message.sender }}</text>
            <text class="message-time">{{ message.time }}</text>
          </view>

          <view class="message-preview">
            <text class="preview-text">{{ message.preview }}</text>
            <view class="message-indicators">
              <view class="unread-dot" v-if="!message.read"></view>
              <view class="attachment-icon" v-if="message.hasAttachment">
                <uni-icons type="paperclip" size="16" color="#999"></uni-icons>
              </view>
            </view>
          </view>

          <view class="message-tags" v-if="message.tags && message.tags.length">
            <text class="tag" v-for="tag in message.tags" :key="tag">{{
              tag
            }}</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredMessages.length === 0">
        <uni-icons type="chat" size="80" color="#e0e0e0"></uni-icons>
        <text class="empty-title">暂无消息</text>
        <text class="empty-desc">开始与智能助手对话吧</text>
        <button class="empty-button" @tap="startNewChat">开始对话</button>
      </view>

      <!-- 加载更多 -->
      <view class="load-more" v-if="hasMore && filteredMessages.length > 0">
        <text class="load-more-text" @tap="loadMoreMessages">加载更多</text>
      </view>
    </scroll-view>

    <!-- 新建消息按钮 -->
    <view class="new-message-button" @tap="handleNewMessage">
      <uni-icons type="compose" size="24" color="#fff"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

// 响应式数据
const activeTab = ref("all");
const searchKeyword = ref("");
const unreadCount = ref(3);
const hasMore = ref(true);

// 模拟消息数据
const messages = ref([
  {
    id: 1,
    sender: "智能助手",
    avatar: "/static/logo.png",
    preview: "您好！我是您的智能助手，有什么可以帮助您的吗？",
    time: "刚刚",
    read: false,
    online: true,
    hasAttachment: false,
    tags: ["系统", "助手"],
  },
  {
    id: 2,
    sender: "系统通知",
    avatar: "/static/logo.png",
    preview: "您的账户安全等级已提升，请及时查看详情",
    time: "10分钟前",
    read: true,
    online: false,
    hasAttachment: true,
    tags: ["安全"],
  },
  {
    id: 3,
    sender: "任务提醒",
    avatar: "/static/logo.png",
    preview: "您有3个待办任务需要处理",
    time: "1小时前",
    read: false,
    online: false,
    hasAttachment: false,
    tags: ["任务"],
  },
  {
    id: 4,
    sender: "天气提醒",
    avatar: "/static/logo.png",
    preview: "今天天气晴朗，适合户外活动",
    time: "2小时前",
    read: true,
    online: false,
    hasAttachment: false,
    tags: ["天气"],
  },
  {
    id: 5,
    sender: "日程提醒",
    avatar: "/static/logo.png",
    preview: "下午2点有团队会议，请准时参加",
    time: "3小时前",
    read: true,
    online: false,
    hasAttachment: false,
    tags: ["日程"],
  },
  {
    id: 6,
    sender: "更新通知",
    avatar: "/static/logo.png",
    preview: "新版本已发布，点击查看更新内容",
    time: "昨天",
    read: false,
    online: false,
    hasAttachment: true,
    tags: ["更新"],
  },
]);

// 计算属性
const filteredMessages = computed(() => {
  let filtered = [...messages.value];

  // 根据标签过滤
  if (activeTab.value === "unread") {
    filtered = filtered.filter((msg) => !msg.read);
  } else if (activeTab.value === "system") {
    filtered = filtered.filter(
      (msg) => msg.tags?.includes("系统") || msg.tags?.includes("助手"),
    );
  }

  // 根据搜索关键词过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    filtered = filtered.filter(
      (msg) =>
        msg.sender.toLowerCase().includes(keyword) ||
        msg.preview.toLowerCase().includes(keyword) ||
        msg.tags?.some((tag) => tag.toLowerCase().includes(keyword)),
    );
  }

  return filtered;
});

// 操作方法
const switchTab = (tab: string) => {
  activeTab.value = tab;
};

const clearSearch = () => {
  searchKeyword.value = "";
};

const openMessage = (message: any) => {
  // 标记为已读
  if (!message.read) {
    message.read = true;
    unreadCount.value = Math.max(0, unreadCount.value - 1);
  }

  uni.showToast({
    title: `打开与${message.sender}的对话`,
    icon: "none",
  });
};

const handleNewMessage = () => {
  uni.showToast({
    title: "新建消息功能开发中",
    icon: "none",
  });
};

const startNewChat = () => {
  uni.showToast({
    title: "开始新对话功能开发中",
    icon: "none",
  });
};

const loadMoreMessages = () => {
  uni.showToast({
    title: "加载更多功能开发中",
    icon: "none",
  });
};

// 页面加载
onMounted(() => {
  // 计算未读消息数量
  unreadCount.value = messages.value.filter((msg) => !msg.read).length;
});
</script>

<style lang="scss" scoped>
.message-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.status-bar {
  height: var(--status-bar-height);
  background-color: #ffffff;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  height: 88rpx;
  background-color: #ffffff;
  border-bottom: 2rpx solid #f0f0f0;
}

.nav-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.message-tabs {
  display: flex;
  background-color: #ffffff;
  border-bottom: 2rpx solid #f0f0f0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  position: relative;

  &.active {
    .tab-text {
      color: #007aff;
      font-weight: 600;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80rpx;
      height: 6rpx;
      background-color: #007aff;
      border-radius: 3rpx;
    }
  }
}

.tab-text {
  font-size: 32rpx;
  color: #666666;
  position: relative;
}

.badge {
  position: absolute;
  top: -10rpx;
  right: -20rpx;
  min-width: 36rpx;
  height: 36rpx;
  background-color: #ff3b30;
  color: #ffffff;
  font-size: 20rpx;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rpx;
}

.message-list {
  height: calc(100vh - var(--status-bar-height) - 88rpx - 90rpx);
}

.search-box {
  padding: 24rpx 32rpx;
  background-color: #ffffff;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20rpx;
  padding: 0 24rpx;
  height: 80rpx;
}

.search-icon {
  margin-right: 16rpx;
}

.search-input {
  flex: 1;
  height: 100%;
  font-size: 28rpx;
  color: #333333;
}

.clear-icon {
  margin-left: 16rpx;
}

.placeholder {
  color: #999999;
  font-size: 28rpx;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;
  background-color: #ffffff;
  border-bottom: 2rpx solid #f0f0f0;

  &:active {
    background-color: #f8f9fa;
  }
}

.avatar-wrapper {
  position: relative;
  margin-right: 24rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
}

.online-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20rpx;
  height: 20rpx;
  background-color: #34c759;
  border: 3rpx solid #ffffff;
  border-radius: 10rpx;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.sender-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
}

.message-time {
  font-size: 24rpx;
  color: #999999;
}

.message-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.preview-text {
  flex: 1;
  font-size: 28rpx;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16rpx;
}

.message-indicators {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.unread-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #007aff;
  border-radius: 8rpx;
}

.attachment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-tags {
  display: flex;
  gap: 12rpx;
}

.tag {
  font-size: 20rpx;
  color: #007aff;
  background-color: rgba(0, 122, 255, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 32rpx;
  text-align: center;
}

.empty-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-top: 24rpx;
  margin-bottom: 12rpx;
}

.empty-desc {
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 40rpx;
}

.empty-button {
  background-color: #007aff;
  color: #ffffff;
  font-size: 28rpx;
  padding: 20rpx 48rpx;
  border-radius: 12rpx;
  border: none;
}

.load-more {
  text-align: center;
  padding: 40rpx 32rpx;
}

.load-more-text {
  font-size: 28rpx;
  color: #007aff;
}

.new-message-button {
  position: fixed;
  bottom: 160rpx;
  right: 40rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #007aff;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10rpx 30rpx rgba(0, 122, 255, 0.3);
  z-index: 100;
}
</style>
