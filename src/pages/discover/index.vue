<!--
  发现页面
  
  此页面展示智能助手的发现功能，包括工具推荐、学习资源、社区动态等。
  设计符合iOS发现页风格，内容丰富多样。
  
  @file index.vue
  @author AICode
  @version 1.0.0
-->

<template>
  <view class="discover-container">
    <!-- 顶部状态栏 -->
    <view class="status-bar"></view>

    <!-- 导航栏 -->
    <view class="nav-bar">
      <text class="nav-title">发现</text>
      <view class="nav-actions">
        <uni-icons
          type="search"
          size="24"
          color="#333"
          @tap="handleSearch"
        ></uni-icons>
      </view>
    </view>

    <!-- 发现内容 -->
    <scroll-view class="discover-scroll" scroll-y>
      <!-- 横幅广告 -->
      <view class="banner-section">
        <swiper
          class="banner-swiper"
          :autoplay="true"
          :interval="3000"
          :circular="true"
        >
          <swiper-item v-for="banner in banners" :key="banner.id">
            <view class="banner-item" @tap="handleBannerClick(banner)">
              <image
                :src="banner.image"
                mode="aspectFill"
                class="banner-image"
              />
              <view class="banner-overlay">
                <text class="banner-title">{{ banner.title }}</text>
                <text class="banner-desc">{{ banner.desc }}</text>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>

      <!-- 快捷工具 -->
      <view class="quick-tools">
        <text class="section-title">快捷工具</text>
        <view class="tools-grid">
          <view
            class="tool-item"
            v-for="tool in quickTools"
            :key="tool.id"
            @tap="handleToolClick(tool)"
          >
            <view class="tool-icon" :style="{ backgroundColor: tool.color }">
              <uni-icons :type="tool.icon" size="28" color="#fff"></uni-icons>
            </view>
            <text class="tool-text">{{ tool.name }}</text>
          </view>
        </view>
      </view>

      <!-- 推荐学习 -->
      <view class="recommended-learning">
        <view class="section-header">
          <text class="section-title">推荐学习</text>
          <text class="section-more" @tap="viewAllLearning">查看更多</text>
        </view>

        <scroll-view class="learning-scroll" scroll-x>
          <view class="learning-list">
            <view
              class="learning-card"
              v-for="course in learningCourses"
              :key="course.id"
              @tap="openCourse(course)"
            >
              <image
                :src="course.image"
                mode="aspectFill"
                class="course-image"
              />
              <view class="course-info">
                <text class="course-title">{{ course.title }}</text>
                <text class="course-desc">{{ course.desc }}</text>
                <view class="course-meta">
                  <text class="course-level">{{ course.level }}</text>
                  <text class="course-duration">{{ course.duration }}</text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 热门话题 -->
      <view class="hot-topics">
        <view class="section-header">
          <text class="section-title">热门话题</text>
        </view>

        <view class="topics-list">
          <view
            class="topic-item"
            v-for="topic in hotTopics"
            :key="topic.id"
            @tap="openTopic(topic)"
          >
            <view class="topic-header">
              <text class="topic-title">{{ topic.title }}</text>
              <text class="topic-hot" v-if="topic.hot">
                <uni-icons type="fire" size="20" color="#FF9500"></uni-icons>
                热门
              </text>
            </view>
            <text class="topic-desc">{{ topic.desc }}</text>
            <view class="topic-footer">
              <view class="topic-stats">
                <text class="stat-item">
                  <uni-icons type="eye" size="20" color="#999"></uni-icons>
                  {{ topic.views }}
                </text>
                <text class="stat-item">
                  <uni-icons type="chat" size="20" color="#999"></uni-icons>
                  {{ topic.comments }}
                </text>
                <text class="stat-item">
                  <uni-icons type="heart" size="20" color="#999"></uni-icons>
                  {{ topic.likes }}
                </text>
              </view>
              <text class="topic-time">{{ topic.time }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 实用工具 -->
      <view class="practical-tools">
        <view class="section-header">
          <text class="section-title">实用工具</text>
        </view>

        <view class="tools-list">
          <view
            class="tool-card"
            v-for="tool in practicalTools"
            :key="tool.id"
            @tap="openTool(tool)"
          >
            <view class="tool-card-header">
              <view
                class="tool-card-icon"
                :style="{ backgroundColor: tool.color }"
              >
                <uni-icons :type="tool.icon" size="24" color="#fff"></uni-icons>
              </view>
              <text class="tool-card-title">{{ tool.name }}</text>
            </view>
            <text class="tool-card-desc">{{ tool.desc }}</text>
            <view class="tool-card-footer">
              <text class="tool-card-tag">{{ tool.tag }}</text>
              <text class="tool-card-free" v-if="tool.free">免费</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 社区动态 -->
      <view class="community-news">
        <view class="section-header">
          <text class="section-title">社区动态</text>
          <text class="section-more" @tap="viewAllCommunity">查看更多</text>
        </view>

        <view class="news-list">
          <view
            class="news-item"
            v-for="news in communityNews"
            :key="news.id"
            @tap="openNews(news)"
          >
            <image :src="news.avatar" mode="aspectFit" class="news-avatar" />
            <view class="news-content">
              <view class="news-header">
                <text class="news-author">{{ news.author }}</text>
                <text class="news-time">{{ news.time }}</text>
              </view>
              <text class="news-text">{{ news.text }}</text>
              <view
                class="news-images"
                v-if="news.images && news.images.length"
              >
                <image
                  v-for="(img, index) in news.images"
                  :key="index"
                  :src="img"
                  mode="aspectFill"
                  class="news-image"
                />
              </view>
              <view class="news-actions">
                <text class="news-action">
                  <uni-icons type="heart" size="20" color="#999"></uni-icons>
                  {{ news.likes }}
                </text>
                <text class="news-action">
                  <uni-icons type="chat" size="20" color="#999"></uni-icons>
                  {{ news.comments }}
                </text>
                <text class="news-action">
                  <uni-icons type="share" size="20" color="#999"></uni-icons>
                  分享
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 响应式数据
const banners = ref([
  {
    id: 1,
    image: "/static/logo.png",
    title: "AI智能助手全新升级",
    desc: "更强大的功能，更智能的体验",
    link: "#",
  },
  {
    id: 2,
    image: "/static/logo.png",
    title: "学习计划免费领取",
    desc: "提升技能，成就更好的自己",
    link: "#",
  },
  {
    id: 3,
    image: "/static/logo.png",
    title: "社区活动火热进行中",
    desc: "参与互动赢取精美礼品",
    link: "#",
  },
]);

const quickTools = ref([
  { id: 1, name: "计算器", icon: "calculator", color: "#34C759" },
  { id: 2, name: "翻译", icon: "language", color: "#007AFF" },
  { id: 3, name: "单位换算", icon: "refresh", color: "#5856D6" },
  { id: 4, name: "二维码", icon: "scan", color: "#FF9500" },
  { id: 5, name: "天气", icon: "cloudy", color: "#5AC8FA" },
  { id: 6, name: "日历", icon: "calendar", color: "#FF3B30" },
  { id: 7, name: "备忘录", icon: "note", color: "#AF52DE" },
  { id: 8, name: "更多", icon: "more", color: "#8E8E93" },
]);

const learningCourses = ref([
  {
    id: 1,
    image: "/static/logo.png",
    title: "AI入门指南",
    desc: "从零开始学习人工智能",
    level: "初级",
    duration: "2小时",
  },
  {
    id: 2,
    image: "/static/logo.png",
    title: "Python编程",
    desc: "掌握Python基础语法",
    level: "初级",
    duration: "5小时",
  },
  {
    id: 3,
    image: "/static/logo.png",
    title: "数据分析实战",
    desc: "使用Python进行数据分析",
    level: "中级",
    duration: "8小时",
  },
  {
    id: 4,
    image: "/static/logo.png",
    title: "机器学习基础",
    desc: "理解机器学习核心概念",
    level: "中级",
    duration: "10小时",
  },
]);

const hotTopics = ref([
  {
    id: 1,
    title: "如何提高工作效率？",
    desc: "分享你的高效工作方法和工具",
    views: "1.2万",
    comments: "356",
    likes: "890",
    time: "2小时前",
    hot: true,
  },
  {
    id: 2,
    title: "AI工具推荐",
    desc: "大家都在用的AI工具有哪些？",
    views: "8.6千",
    comments: "234",
    likes: "567",
    time: "5小时前",
    hot: true,
  },
  {
    id: 3,
    title: "学习计划分享",
    desc: "如何制定有效的学习计划？",
    views: "5.4千",
    comments: "189",
    likes: "432",
    time: "1天前",
    hot: false,
  },
]);

const practicalTools = ref([
  {
    id: 1,
    name: "PDF转换器",
    desc: "支持多种格式转换",
    icon: "document",
    color: "#FF9500",
    tag: "文档处理",
    free: true,
  },
  {
    id: 2,
    name: "图片编辑器",
    desc: "在线图片编辑工具",
    icon: "image",
    color: "#34C759",
    tag: "图片处理",
    free: true,
  },
  {
    id: 3,
    name: "代码编辑器",
    desc: "在线编写和运行代码",
    icon: "code",
    color: "#007AFF",
    tag: "开发工具",
    free: true,
  },
  {
    id: 4,
    name: "思维导图",
    desc: "可视化思维整理工具",
    icon: "map",
    color: "#5856D6",
    tag: "效率工具",
    free: true,
  },
]);

const communityNews = ref([
  {
    id: 1,
    avatar: "/static/logo.png",
    author: "智能助手官方",
    time: "刚刚",
    text: "新版本v2.0已发布，新增多项实用功能，快来体验吧！",
    likes: 128,
    comments: 45,
    images: ["/static/logo.png"],
  },
  {
    id: 2,
    avatar: "/static/logo.png",
    author: "技术达人",
    time: "30分钟前",
    text: "分享一个提高编程效率的小技巧，使用快捷键可以大幅提升开发速度...",
    likes: 89,
    comments: 23,
    images: [],
  },
  {
    id: 3,
    avatar: "/static/logo.png",
    author: "学习爱好者",
    time: "2小时前",
    text: "完成了Python入门课程，收获满满！感谢智能助手的优质内容。",
    likes: 156,
    comments: 67,
    images: ["/static/logo.png", "/static/logo.png"],
  },
]);

// 操作方法
const handleSearch = () => {
  uni.showToast({
    title: "搜索功能开发中",
    icon: "none",
  });
};

const handleBannerClick = (banner: any) => {
  uni.showToast({
    title: `打开：${banner.title}`,
    icon: "none",
  });
};

const handleToolClick = (tool: any) => {
  uni.showToast({
    title: `打开${tool.name}`,
    icon: "none",
  });
};

const viewAllLearning = () => {
  uni.showToast({
    title: "查看全部学习内容",
    icon: "none",
  });
};

const openCourse = (course: any) => {
  uni.showToast({
    title: `开始学习：${course.title}`,
    icon: "none",
  });
};

const openTopic = (topic: any) => {
  uni.showToast({
    title: `查看话题：${topic.title}`,
    icon: "none",
  });
};

const openTool = (tool: any) => {
  uni.showToast({
    title: `使用工具：${tool.name}`,
    icon: "none",
  });
};

const viewAllCommunity = () => {
  uni.showToast({
    title: "查看全部社区动态",
    icon: "none",
  });
};

const openNews = (news: any) => {
  uni.showToast({
    title: `查看动态：${news.author}的分享`,
    icon: "none",
  });
};
</script>

<style lang="scss" scoped>
.discover-container {
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

.discover-scroll {
  height: calc(100vh - var(--status-bar-height) - 88rpx);
}

.banner-section {
  padding: 32rpx;
}

.banner-swiper {
  height: 300rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.banner-item {
  position: relative;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32rpx;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #ffffff;
}

.banner-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.banner-desc {
  display: block;
  font-size: 24rpx;
  opacity: 0.9;
}

.quick-tools {
  padding: 0 32rpx 32rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 30rpx;
  padding-top: 32rpx;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tool-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.tool-text {
  font-size: 24rpx;
  color: #333333;
}

.recommended-learning {
  padding: 32rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
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

.learning-scroll {
  white-space: nowrap;
}

.learning-list {
  display: inline-flex;
  gap: 24rpx;
}

.learning-card {
  width: 300rpx;
  background-color: #f8f9fa;
  border-radius: 16rpx;
  overflow: hidden;
  display: inline-block;
}

.course-image {
  width: 100%;
  height: 180rpx;
}

.course-info {
  padding: 24rpx;
}

.course-title {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8rpx;
}

.course-desc {
  display: block;
  font-size: 24rpx;
  color: #666666;
  margin-bottom: 16rpx;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-level {
  font-size: 20rpx;
  color: #007aff;
  background-color: rgba(0, 122, 255, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.course-duration {
  font-size: 20rpx;
  color: #999999;
}

.hot-topics {
  padding: 32rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.topic-item {
  padding: 24rpx;
  background-color: #f8f9fa;
  border-radius: 16rpx;
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.topic-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
}

.topic-hot {
  font-size: 20rpx;
  color: #ff9500;
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.topic-desc {
  display: block;
  font-size: 24rpx;
  color: #666666;
  margin-bottom: 16rpx;
}

.topic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topic-stats {
  display: flex;
  gap: 20rpx;
}

.stat-item {
  font-size: 20rpx;
  color: #999999;
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.topic-time {
  font-size: 20rpx;
  color: #999999;
}

.practical-tools {
  padding: 32rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.tools-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.tool-card {
  padding: 24rpx;
  background-color: #f8f9fa;
  border-radius: 16rpx;
}

.tool-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.tool-card-icon {
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12rpx;
}

.tool-card-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
}

.tool-card-desc {
  display: block;
  font-size: 22rpx;
  color: #666666;
  margin-bottom: 16rpx;
}

.tool-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-card-tag {
  font-size: 20rpx;
  color: #007aff;
  background-color: rgba(0, 122, 255, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.tool-card-free {
  font-size: 20rpx;
  color: #34c759;
  background-color: rgba(52, 199, 89, 0.1);
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.community-news {
  padding: 32rpx;
  background-color: #ffffff;
  margin-bottom: 40rpx;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.news-item {
  display: flex;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.news-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  margin-right: 24rpx;
}

.news-content {
  flex: 1;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.news-author {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
}

.news-time {
  font-size: 22rpx;
  color: #999999;
}

.news-text {
  display: block;
  font-size: 26rpx;
  color: #333333;
  margin-bottom: 16rpx;
  line-height: 1.4;
}

.news-images {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.news-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
}

.news-actions {
  display: flex;
  gap: 24rpx;
}

.news-action {
  font-size: 22rpx;
  color: #999999;
  display: flex;
  align-items: center;
  gap: 6rpx;
}
</style>
