<template>
  <div class="home">
    <div class="content">
      <ul class="left-nav-container">
        <li class="log"></li>
        <li
          v-for="(item, index) in [{ title: '刷题' }, { title: '创建' }]"
          :key="index"
          :class="idx == index ? 'active' : ''"
          @click="onnavclick(index)"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="right-img">
        <div class="vx">
          <span>微信群</span>
          <img src="@/assets/imges/code.jpg" alt="" />
        </div>
        <div class="zfb">
          <span>QQ群</span>
          <img src="@/assets/imges/QQ.jpg" alt="" />
        </div>
      </div>
    </div>
    <!-- 顶通栏__end -->

    <div class="question_container" v-if="isrouterview">
      <Sidebar />
      <router-view class="routerview" />
    </div>
    <!-- question__end -->

    <div v-else id="form_container">
      <div class="center">
        <h3 class="title">新增题库</h3>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="问题">
            <el-input
              v-model="form.problem"
              placeholder="请输入问题"
            ></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-input
              type="textarea"
              v-model="form.answer"
              placeholder="请输入答案"
            ></el-input>
          </el-form-item>
          <el-form-item label="题型">
            <el-select
              v-model="form.question_type"
              placeholder="请选择题目类型"
            >
              <el-option
                v-for="(item, index) in sidebarlist"
                :key="index"
                :label="item.name"
                :value="++index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- createform__end -->
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue'
import SidebarList from '@/ults/sidebar'
import { CreateQuestionApi } from '@/api/api'
export default {
  name: 'Home',
  components: {
    Sidebar,
  },
  data() {
    return {
      isrouterview: true,
      idx: 0,
      sidebarlist: SidebarList.sidebar_list,
      form: {
        title: '',
        problem: '',
        answer: '',
        question_type: '',
        other_answers: [],
      },
    }
  },
  methods: {
    onnavclick(index) {
      this.idx = index
      switch (index) {
        case 0:
          this.isrouterview = true
          break
        case 1:
          this.isrouterview = false
          break
      }
    },
    onSubmit() {
      CreateQuestionApi(this.form)
        .then((req) => {
          if (req.errcode === 0) {
            this.$message({
              type: 'success',
              message: '新增成功!',
            })
            for (let key in this.form) {
              if (this.form.hasOwnProperty(key)) {
                this.form[key] = ''
              }
            }
          } else {
            this.$message.error('新增失败了噢！')
            throw new Error(err)
          }
        })
        .catch((err) => {
          throw new Error(`http request createapi error ${err}`)
        })
    },
    onCancel() {
      this.isrouterview = true
      this.idx = 0
    },
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
@primary-color: rgb(0, 177, 242);

.content .left-nav-container .active {
  background: @primary-color;
  color: #fff;
  font-weight: 900;
}

.home {
  width: 100%;
  height: 100%;
}
.content {
  height: 40px;
  text-align: center;
  background-color: rgb(245, 245, 245);
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 3px;
  display: flex;
  justify-content: space-between;
  .left-nav-container {
    width: auto;
    height: 40px;
    line-height: 40px;
    display: flex;
    .log {
      width: 150px !important;
      height: 100%;
      background: url(@/assets/imges/logo.png) left -2px / 100% 100% no-repeat;
    }
    li {
      width: 100px;
      box-sizing: border-box;
      line-height: 37px;
      height: 37px;
      cursor: pointer;
      color: #000;
      font-weight: 900;
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
  }

  .right-img {
    display: flex;
    justify-content: space-around;
    height: 100%;
    width: 200px;
    padding-right: 100px;
    .vx,
    .zfb {
      width: auto;
      height: 100%;
      line-height: 40px;
      color: #000;
      cursor: pointer;
      text-align: center;
      padding: 0 10px;
      font-size: 13px;
      position: relative;
      img {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 50px;
        top: 40px;
        z-index: 99999;
        transform: translateX(-70%);
        visibility: hidden;
      }
      &:hover {
        color: #fff;
        background-color: @primary-color;
        img {
          visibility: visible;
        }
      }
    }
  }
}
.question_container {
  height: calc(100% - 40px);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  .routerview {
    flex: 1;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
// form表单
:deep(.el-textarea__inner) {
  min-height: 200px !important;
}
#form_container {
  width: 100%;
  height: calc(100% - 40px);
  position: fixed;
  left: 0;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right #ffffff, #e6e7e8);
  .center {
    width: 600px;
    height: auto;
    .title {
      height: 40px;
      margin-bottom: 22px;
      width: 100%;
      text-align: center;
      font-size: 15px;
      font-weight: 900;
      font-family: 'Playfair Display', serif;
      color: #000;
    }
    :deep(.el-form-item__label) {
      color: #000;
    }
  }
}
</style>
