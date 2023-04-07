<template>
  <div class="card">
    <el-input
      placeholder="请输入关键字"
      v-model="keyword"
      class="input-with-select"
      @keyup.enter.native="selectquestion"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option
          v-for="(item, index) in sidebar_list"
          :key="index"
          :label="item.name"
          :value="item.path"
        ></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="selectquestion"
      ></el-button>
    </el-input>
    <!-- input__end -->

    <template v-if="isquestion_bank">
      <el-card
        class="box-card"
        v-for="(item, index) in getlistData"
        :key="index"
      >
        <div slot="header" class="clearfix">
          <h1 class="title">
            <i class="icon">{{ item.id }}</i>
            <span>{{ item.title }}</span>
          </h1>

          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="OnDeleteQuestion(item.id)"
            >删除此条</el-button
          >
        </div>
        <div class="text item">
          <div class="description">
            创建时间:{{ TimeFormat(item.create_time) }}
          </div>
          <div class="title">
            <div class="title-l">
              <h2><i class="icon"></i><span>题目</span></h2>
              <p>{{ item.problem }}?</p>
            </div>
            <el-button
              v-if="!item.isShow"
              type="text"
              @click="item.isShow = !item.isShow"
              >查看答案</el-button
            >
            <el-button
              v-if="item.isShow"
              type="text"
              @click="item.isShow = !item.isShow"
              >关闭答案</el-button
            >
          </div>
          <div class="answer" v-show="item.isShow" style="padding-top: 10px">
            <h2>
              <i class="icon"></i><span style="margin-left: 8px">参考答案</span>
            </h2>
            <p>{{ item.answer }}</p>
            <div class="other_answer">
              <h2>
                <i class="icon"></i
                ><span style="margin-left: 8px">其他用户作答:</span>
              </h2>
              <template v-if="item.other_answers.length">
                <div
                  class="other_user"
                  v-for="(other, index) in item.other_answers"
                  :key="index"
                >
                  <span
                    >来源:{{ other.nickname }}&ensp;&ensp;时间:{{
                      other.create_time
                    }}</span
                  >
                  <p>作答:{{ other.answer }}</p>
                </div>
              </template>
              <p v-else style="color: #cab4ab; font-size: 12px">
                温馨提示:暂时没有大神作答,你来试试吧
              </p>
              <div class="nickname">
                <span><strong>阁下姓名:</strong></span>
                <el-input v-model="nickname" placeholder="尊姓大名"></el-input>
              </div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="阁下请作答"
                v-model="foranswer"
              >
              </el-input>
              <div class="btn">
                <el-button type="info" plain @click="Submitforanswer(item)"
                  >提交作答</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </template>
    <el-alert
      v-else
      style="margin-top: 10px"
      title="题库暂未找到相关题型"
      type="info"
      description="点击创建可以创建该类型体型噢！"
      show-icon
    >
    </el-alert>
    <!-- card__end -->
  </div>
</template>

<script>
import sidebar from '@/ults/sidebar'
import { GetQuestionApi, DeleteQuestionApi, UpdateQuestionApi } from '@/api/api'
import Store from '@/store'
import { QuestionType } from '@/ults/enum'
export default {
  name: 'card',
  data() {
    return {
      sidebar_list: sidebar.sidebar_list,
      keyword: '',
      select: '',
      isquestion_bank: true,
      foranswer: '',
      nickname: '',
    }
  },
  created() {
    this.getquestiondata()
  },
  mounted() {},
  computed: {
    getlistData() {
      return Store.getters.get_question_list
    },
    getkeyword() {
      return Store.getters.get_keyword
    },
  },
  methods: {
    // 删除按钮
    OnDeleteQuestion(id) {
      this.$MessageBox
        .confirm('此操作将永久删除该问题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          DeleteQuestionApi(id)
            .then((res) => {
              if (res.errcode == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.getquestiondata()
              }
            })
            .catch((err) => {
              this.$message.error('删除失败了噢！')
              throw new Error(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 输入框事件
    async selectquestion() {
      Store.commit('Update_Keyword', this.keyword)
      if (!this.select) {
        this.getquestiondata()
        return
      }
      this.$router.push({
        path: this.select,
      })
    },
    // 根据当前路由获取题库数据
    getquestiondata() {
      GetQuestionApi({
        question_type: QuestionType[this.$route.name.toUpperCase()],
        title: this.keyword || this.getkeyword,
      })
        .then((req) => {
          if (req.errcode === 0) {
            if (req.data.length) {
              this.isquestion_bank = true
            } else {
              this.isquestion_bank = false
            }
            req.data.forEach((item) => {
              item['isShow'] = false
              if (item['other_answers'].length) {
                item['other_answers'].forEach((value) => {
                  value.create_time = this.TimeFormat(value.create_time)
                })
              }
            })
            Store.commit('Update_Question_List', req.data)
            Store.commit('Update_Keyword', this.keyword)
          }
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
    // 修改时间格式
    TimeFormat(time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formattedDate = `${year}-${month}-${day}`
      return formattedDate
    },
    // 提交答案
    Submitforanswer(PresentObj) {
      let OriginalArr = PresentObj.other_answers || []
      OriginalArr.push({
        nickname: this.nickname,
        answer: this.foranswer,
        create_time: new Date(),
      })
      UpdateQuestionApi(PresentObj.id, {
        other_answers: OriginalArr,
      }).then((req) => {
        console.log(req)
      })
    },
  },
}
</script>

<style lang="less" scoped>
@primary-color: rgb(0, 177, 242);

.card {
  .box-card {
    margin-top: 20px;
    .clearfix {
      height: 20px;
      line-height: 20px;

      .title {
        height: 100%;
        vertical-align: top;
        .icon {
          width: 20px;
          height: 100%;
          background-color: rgb(26, 188, 156);
          display: inline-block;
          text-align: center;
          border-radius: 50%;
          margin-right: 5px;
          color: #fff;
          font-weight: 500;
        }
        span {
          font-weight: 900;
          font-size: 18px;
          font-family: '宋体';
        }
      }
    }
    .text {
      .description {
        font-size: 10px;
        text-align: left;
        margin-bottom: 5px;
        color: #cab4ab;
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(254, 249, 236);
        color: #000000;
        .title-l {
          color: #000000d9;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
            Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
          width: 100%;
          height: auto;
          padding: 5px;
          box-sizing: border-box;
          line-height: 2;
          border-radius: 10px;
        }
      }
      .answer {
        line-height: 2;
        font-size: 13px;
        white-space: pre-wrap;
        color: #000000;
        margin-top: 10px;
        background-color: rgb(232, 248, 245);
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px;
        .other_answer {
          .other_user {
            height: auto;
            background-color: #bddbce;
            margin-bottom: 20px;
            padding: 10px;
            border-radius: 10px;
            span {
              font-size: 12px;
              color: #a1a194;
              font-family: system-ui, -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                'Helvetica Neue', sans-serif;
            }
            p {
              padding-top: 10px;
            }
          }
          .nickname {
            height: 30px;
            display: flex;
            width: 200px;
            justify-content: space-between;
            align-items: center;
            vertical-align: middle;
            margin-bottom: 10px;
            margin-top: 10px;

            span {
              display: inline-block;
              min-width: 60px;
            }
            .el-input {
              flex: 1;
              height: 100% !important;
              :deep(.el-input__inner) {
                height: 100% !important;
              }
            }
          }
        }
      }
    }
  }
}
:is(
    .card .box-card .text .title,
    .card .box-card .text .answer,
    .card .box-card .text .answer,
    .other_answer
  )
  h2 {
  display: flex;
  align-items: center;
  height: 20px;
  justify-content: start;
  margin-bottom: 10px;
  .icon {
    width: 3px;
    background-color: rgb(243, 193, 66);
    height: 100%;
    border-radius: 5px;
  }
  span {
    height: 100%;
    line-height: 20px;
    margin-left: 5px;
    font-weight: 900;
  }
}
.card .box-card .text .answer h2 .icon {
  background-color: #ce6772;
}
.card .box-card .text .answer .other_answer h2 {
  margin-top: 10px;
}
.card .box-card .text .answer .other_answer h2 .icon {
  background-color: red;
}
.card .box-card .text .answer .other_answer .btn {
  width: 100%;
  height: auto;
  text-align: right;
  margin-top: 5px;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input-group__append .el-button,
.el-input-group__append .el-select,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-select {
  width: 120px;
}
</style>
