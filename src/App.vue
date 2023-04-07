<template>
  <div id="app">
    <a-config-provider :locale="locale" :class="isMobile ? 'mobile' : ''">
      <div class="app-box">
        <vue-particles
          class="par-box"
          color="#409EFF"
          :particleOpacity="0.7"
          :particlesNumber="80"
          shapeType="circle"
          :particleSize="4"
          linesColor="#409EFF"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        ></vue-particles>
        <a-layout class="layout" ref="layout">
          <router-view class="route_view"></router-view>
        </a-layout>
      </div>
    </a-config-provider>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  computed: {},
  mounted() {},
}
</script>

<style lang="less">
#particles-js {
  width: 100vw !important;
  height: 100%;
  position: absolute;
  pointer-events: none;
}
.particles-js-canvas-el {
  width: 100vw !important;
  height: 100vh !important;
  position: fixed;
  top: 0;
  left: 0;
}
.layout {
  width: 100vw !important;
  height: 100vh !important;
  .route_view {
    width: 100vw !important;
    height: 100vh !important;
  }
}
/* 滚动条容器 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-image: linear-gradient(
    to bottom,
    #faeeef,
    #efccd0,
    #de9aa1,
    #c85662
  );
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

/* 滚动条滑块在悬停状态下 */
::-webkit-scrollbar-thumb:hover {
  background-image: linear-gradient(
    to bottom,
    rgb(0, 177, 242),
    rgb(0, 96, 131),
    rgb(0, 70, 95)
  );
}
#app {
  width: 100%;
  height: 100%;
}

/* 选中文本样式 */
::selection {
  color: #d98991;
}
</style>
