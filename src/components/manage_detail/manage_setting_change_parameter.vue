<template>
  <div>
    <el-select v-model="selectedParm" style="margin-top: 10%" placeholder="请选择爬取定期更新周期">
      <el-option label="周" value="week"></el-option>
      <el-option label="月" value="month"></el-option>
      <el-option label="半年" value="half_year"></el-option>
      <el-option label="年" value="year"></el-option>
    </el-select>
    <br>
    <el-button style="margin-top: 5%; width: 20%" type="primary" @click="concern">确 定</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button, Select, Option} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)

export default {
  data () {
    return {
      selectedParm: ''
    }
  },
  components: {},
  methods: {
    concern () {
      if (this.selectedParm === '') {
        alert('请先选择更新周期')
      } else {
        this.$axios({
          method: 'get',
          url: '/api/update_spider_timer',
          params: {
            period: this.selectedParm
          }
        })
          .then(response => {
            alert('设置成功')
          })
      }
    }
  },
  mounted () {
    this.selectedParm = ''
  }
}

</script>

<style scoped>

</style>
