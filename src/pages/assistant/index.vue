<!--
  助手页面
  
  此页面展示智能助手的主要功能，包括语音助手、任务管理、日程安排等。
  设计简洁现代，符合iOS设计规范。
  
  @file index.vue
  @author AICode
  @version 1.0.0
-->

<template>
  <view class="assistant-container">
    <!-- 顶部状态栏 -->
    <view class="status-bar"></view>

    <!-- 导航栏 -->
    <view class="nav-bar">
      <text class="nav-title">智能助手</text>
      <view class="nav-actions">
        <uni-icons
          type="search"
          size="24"
          color="#333"
          @tap="handleSearch"
        ></uni-icons>
        <uni-icons
          type="plus"
          size="24"
          color="#333"
          @tap="handleAdd"
          style="margin-left: 20rpx"
        ></uni-icons>
      </view>
    </view>

    <!-- 主要内容 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 欢迎区域 -->
      <view class="welcome-section">
        <view class="welcome-header">
          <text class="welcome-title">你好，{{ userName }}</text>
          <text class="welcome-subtitle">今天有什么需要帮助的吗？</text>
        </view>
        <view class="welcome-time">
          <text class="time-text">{{ currentTime }}</text>
        </view>
      </view>

      <!-- 快速操作 -->
      <view class="quick-actions">
        <text class="section-title">快速操作</text>
        <view class="actions-grid">
          <view class="action-item" @tap="handleVoiceAssistant">
            <view class="action-icon voice">
              <uni-icons type="mic" size="32" color="#fff"></uni-icons>
            </view>
            <text class="action-text">语音助手</text>
          </view>

          <view class="action-item" @tap="handleTask">
            <view class="action-icon task">
              <uni-icons
                type="checkbox-filled"
                size="32"
                color="#fff"
              ></uni-icons>
            </view>
            <text class="action-text">任务管理</text>
          </view>

          <view class="action-item" @tap="handleCalendar">
            <view class="action-icon calendar">
              <uni-icons type="calendar" size="32" color="#fff"></uni-icons>
            </view>
            <text class="action-text">日程安排</text>
          </view>

          <view class="action-item" @tap="handleNotes">
            <view class="action-icon notes">
              <uni-icons type="compose" size="32" color="#fff"></uni-icons>
            </view>
            <text class="action-text">笔记记录</text>
          </view>
        </view>
      </view>

      <!-- 今日任务 -->
      <view class="today-tasks">
        <view class="section-header">
          <text class="section-title">今日任务</text>
          <text class="section-more" @tap="viewAllTasks">查看全部</text>
        </view>

        <view class="tasks-list">
          <view class="task-item" v-for="task in tasks" :key="task.id">
            <checkbox :checked="task.completed" @tap="toggleTask(task.id)" />
            <view class="task-content">
              <text class="task-title" :class="{ completed: task.completed }">{{
                task.title
              }}</text>
              <text class="task-time">{{ task.time }}</text>
            </view>
            <uni-icons
              type="more"
              size="20"
              color="#999"
              @tap="showTaskMenu(task)"
            ></uni-icons>
          </view>
        </view>

        <view class="add-task" @tap="addNewTask">
          <uni-icons type="plus" size="20" color="#007aff"></uni-icons>
          <text class="add-task-text">添加新任务</text>
        </view>
      </view>

      <!-- 智能推荐 -->
      <view class="recommendations">
        <view class="section-header">
          <text class="section-title">智能推荐</text>
        </view>

        <view class="recommendation-cards">
          <view class="recommendation-card weather" @tap="viewWeather">
            <view class="card-header">
              <uni-icons type="cloudy" size="24" color="#fff"></uni-icons>
              <text class="card-title">天气</text>
            </view>
            <text class="card-value">24°C 晴朗</text>
            <text class="card-desc">适合户外活动</text>
          </view>

          <view class="recommendation-card reminder" @tap="viewReminders">
            <view class="card-header">
              <uni-icons type="bell" size="24" color="#fff"></uni-icons>
              <text class="card-title">提醒</text>
            </view>
            <text class="card-value">3个待办</text>
            <text class="card-desc">记得完成</text>
          </view>
        </view>
      </view>

      <!-- 最近使用 -->
      <view class="recent-usage">
        <view class="section-header">
          <text class="section-title">最近使用</text>
        </view>

        <view class="usage-list">
          <view
            class="usage-item"
            v-for="item in recentItems"
            :key="item.id"
            @tap="handleRecentItem(item)"
          >
            <view class="usage-icon" :style="{ backgroundColor: item.color }">
              <uni-icons :type="item.icon" size="20" color="#fff"></uni-icons>
            </view>
            <text class="usage-text">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { computed, onMounted, onUnmounted, ref } from "vue";

// 用户store
const userStore = useUserStore();

// 响应式数据
const currentTime = ref("");
const tasks = ref([
  { id: 1, title: "完成项目报告", time: "10:00 AM", completed: false },
  { id: 2, title: "团队会议", time: "14:30 PM", completed: true },
  { id: 3, title: "健身锻炼", time: "18:00 PM", completed: false },
  { id: 4, title: "阅读书籍", time: "20:00 PM", completed: false },
]);

const recentItems = ref([
  { id: 1, name: "语音翻译", icon: "sound", color: "#FF9500" },
  { id: 2, name: "计算器", icon: "calculator", color: "#34C759" },
  { id: 3, name: "单位换算", icon: "refresh", color: "#5856D6" },
  { id: 4, name: "备忘录", icon: "note", color: "#FF3B30" },
  { id: 5, name: "倒计时", icon: "time", color: "#5AC8FA" },
  { id: 6, name: "二维码", icon: "scan", color: "#AF52DE" },
]);

// 计算属性
const userName = computed(() => {
  return userStore.userInfo?.nickname || userStore.userInfo?.username || "用户";
});

// 更新时间
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  currentTime.value = `${hours}:${minutes}`;
};

// 定时器
let timer: number | null = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 60000); // 每分钟更新一次
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// 操作方法
const handleSearch = () => {
  uni.showToast({
    title: "搜索功能开发中",
    icon: "none",
  });
};

const handleAdd = () => {
  uni.showToast({
    title: "添加功能开发中",
    icon: "none",
  });
};

const handleVoiceAssistant = () => {
  uni.showToast({
    title: "语音助手功能开发中",
    icon: "none",
  });
};

const handleTask = () => {
  uni.showToast({
    title: "任务管理功能开发中",
    icon: "none",
  });
};

const handleCalendar = () => {
  uni.showToast({
    title: "日程安排功能开发中",
    icon: "none",
  });
};

const handleNotes = () => {
  uni.showToast({
    title: "笔记记录功能开发中",
    icon: "none",
  });
};

const toggleTask = (id: number) => {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
};

const showTaskMenu = (task: any) => {
  uni.showActionSheet({
    itemList: ["编辑", "删除", "分享"],
    success: (res) => {
      const actions = ["编辑", "删除", "分享"];
      uni.showToast({
        title: `选择了${actions[res.tapIndex]}`,
        icon: "none",
      });
    },
  });
};

const addNewTask = () => {
  uni.showToast({
    title: "添加任务功能开发中",
    icon: "none",
  });
};

const viewAllTasks = () => {
  uni.showToast({
    title: "查看全部任务功能开发中",
    icon: "none",
  });
};

const viewWeather = () => {
  uni.showToast({
    title: "天气功能开发中",
    icon: "none",
  });
};

const viewReminders = () => {
  uni.showToast({
    title: "提醒功能开发中",
    icon: "none",
  });
};

const handleRecentItem = (item: any) => {
  uni.showToast({
    title: `打开${item.name}`,
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.assistant-container {
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

.content-scroll {
  height: calc(100vh - var(--status-bar-height) - 88rpx);
}

.welcome-section {
  padding: 40rpx 32rpx 30rpx;
  background: linear-gradient(135deg, #007aff 0%, #0056cc 100%);
  color: #ffffff;
}

.welcome-header {
  margin-bottom: 20rpx;
}

.welcome-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.welcome-subtitle {
  display: block;
  font-size: 28rpx;
  opacity: 0.9;
}

.welcome-time {
  text-align: right;
}

.time-text {
  font-size: 32rpx;
  font-weight: 500;
}

.quick-actions {
  padding: 40rpx 32rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 30rpx;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;

  &.voice {
    background-color: #ff9500;
  }

  &.task {
    background-color: #34c759;
  }

  &.calendar {
    background-color: #5856d6;
  }

  &.notes {
    background-color: #ff3b30;
  }
}

.action-text {
  font-size: 24rpx;
  color: #666666;
}

.today-tasks {
  padding: 40rpx 32rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-more {
  font-size: 28rpx;
  color: #007aff;
}

.tasks-list {
  margin-bottom: 30rpx;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.task-content {
  flex: 1;
  margin-left: 20rpx;
}

.task-title {
  display: block;
  font-size: 32rpx;
  color: #333333;
  margin-bottom: 8rpx;

  &.completed {
    text-decoration: line-through;
    color: #999999;
  }
}

.task-time {
  display: block;
  font-size: 24rpx;
  color: #999999;
}

.add-task {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx;
  border: 2rpx dashed #e0e0e0;
  border-radius: 16rpx;
  margin-top: 20rpx;
}

.add-task-text {
  font-size: 28rpx;
  color: #007aff;
  margin-left: 12rpx;
}

.recommendations {
  padding: 40rpx 32rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
}

.recommendation-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.recommendation-card {
  padding: 32rpx;
  border-radius: 20rpx;
  color: #ffffff;

  &.weather {
    background: linear-gradient(135deg, #5ac8fa 0%, #007aff 100%);
  }

  &.reminder {
    background: linear-gradient(135deg, #ff9500 0%, #ff3b30 100%);
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 28rpx;
  font-weight: 600;
  margin-left: 12rpx;
}

.card-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.card-desc {
  display: block;
  font-size: 24rpx;
  opacity: 0.9;
}

.recent-usage {
  padding: 40rpx 32rpx;
  background-color: #ffffff;
  margin-top: 20rpx;
  margin-bottom: 40rpx;
}

.usage-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40rpx;
}

.usage-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.usage-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.usage-text {
  font-size: 24rpx;
  color: #333333;
  text-align: center;
}
</style>
