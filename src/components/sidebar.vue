<template>
  <div class="sidebar">
    <ul class="title_container">
      <li
        v-for="(item, index) in sidebar_list"
        :key="index"
        @click="gotopages(item.path)"
        :class="
          $route.path.indexOf(item.path.substring(1)) != -1 ? 'active' : ''
        "
      >
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import SidebarObj from '@/ults/sidebar.js'
export default {
  name: 'Sidebar',
  data() {
    return {
      sidebar_list: SidebarObj.sidebar_list,
    }
  },
  methods: {
    gotopages(path) {
      this.$router.push({
        path: path,
      })
    },
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
@primary-color: rgb(0, 177, 242);

.sidebar .title_container .active {
  background-color: #b3e8fb !important;
  color: #000 !important;
  //   background-color: #000 !important;
  //   color: #fff !important;
  //   opacity: 0.8;
}
.sidebar {
  width: 150px;
  height: 100%;
  text-align: left;
  background-color: rgb(245, 245, 245);
  .title_container {
    width: 100%;
    height: 100%;
    padding-top: 10px;
    box-sizing: border-box;
    li {
      width: 100%;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      box-sizing: border-box;
      span {
        display: block;
        width: 65px;
        margin: 0 auto;
        height: 100%;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
          sans-serif;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
}
</style>
