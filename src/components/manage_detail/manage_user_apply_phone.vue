<template>
  <div class="app-container">
    <el-button type="primary" style="float: right" @click="seleniumStart">爬取补充</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        prop="phone_name"
        label="申请添加的手机型号"
        align="center"
        min-width="60%"
        :filters="headerSelect"
        :filter-method="filterHandler"
        :filter-multiple="false"
      ></el-table-column>
      <el-table-column label="操作" min-width="25%" align="center">
        <template slot-scope="scope">
      <el-button type="primary" @click.native.prevent="deleteApply (scope.row)">删 除</el-button>
          <el-button type="primary" @click.native.prevent="scrapyStart (scope.row)">Scrapy爬取</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button, Table, TableColumn} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {filter} from 'nightwatch/lib/runner/filematcher'
import {data} from 'autoprefixer'

Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Button.name, Button)

export default {
  data () {
    return {
      tableData: [],
      headerSelect: [
        {
          text: '按时间最新排序',
          value: 'time'
        },
        {
          text: '按申请次数最多排序',
          value: 'num'
        }
      ],
      filterType: 'total',
      result_strapy: {},
      result_selenium: {},
      scrapy_phone_name: ''
    }
  },
  methods: {
    async filterHandler (value, row, column) {
      if (this.filterType === value) {
        return row
      }
      if (value === 'num') {
        this.filterType = 'num'
        this.$axios({
          method: 'get',
          url: '/api/apply/list'
        })
          .then(response => {
            let allList = response.data.data
            allList.sort(function (a, b) {
              return b.num - a.num
            })
            this.tableData = allList
          })
      } else {
        this.filterType = 'time'
        this.$axios({
          method: 'get',
          url: '/api/apply/list'
        })
          .then(response => {
            let allList = response.data.data
            allList.reverse()
            this.tableData = allList
          })
      }
      return row
    },
    async deleteApply (row) {
      this.$axios({
        method: 'get',
        url: '/api/apply/delete',
        params: {
          name: row.phone_name
        }
      })
      this.$router.go(0)
    },
    async getScrapyStatus (row) {
      let temp = {}
      if (this.scrapy_phone_name === '') {
        this.scrapy_phone_name = row.phone_name
      }
      let response = await this.$axios({
        method: 'get',
        url: '/api/scrapy/status',
        params: {
          phoneName: this.scrapy_phone_name
        }
      })
      if (response.data.data.msg !== '爬虫已经结束' && response.data.data.msg !== '爬虫尚未开始') {
        temp = {tag: true, msg: response.data.data.msg}
      } else {
        temp = {tag: false, msg: response.data.data.msg}
      }
      return temp
    },
    async getSeleniumStatus () {
      let temp = {}
      await this.$axios({
        method: 'get',
        url: '/api/selenium/status'
      })
        .then(response => {
          if (response.data.data.msg !== '爬虫已经结束' && response.data.data.msg !== '爬虫尚未开始') {
            temp = {tag: true, msg: response.data.data.msg}
          } else {
            temp = {tag: false, msg: response.data.data.msg}
          }
        })
      return temp
    },
    async getStatus (row) {
      this.result_strapy = await this.getScrapyStatus(row)
      this.result_selenium = await this.getSeleniumStatus()
      return 0
    },
    async scrapyStartHelp (row, a) {
      var scrapyStatus = this.result_strapy.tag
      var seleniumStatus = this.result_selenium.tag
      if (scrapyStatus === true) {
        alert('scrapy: ' + this.scrapy_phone_name + ' ' + this.result_strapy.msg)
      } else if (seleniumStatus === true) {
        alert('selenium: ' + this.result_selenium.msg)
      } else if (scrapyStatus === false && seleniumStatus === false) {
        this.$axios({
          method: 'get',
          url: '/api/scrapy/start',
          params: {
            phoneName: row.phone_name
          }
        })
          .then((response) => {
            this.scrapy_phone_name = row.phone_name
            alert(row.phone_name + ' scrapy 开始爬取')
          })
      }
      return 0
    },
    async scrapyStart (row) {
      const a = await this.getStatus(row)
      const b = await this.scrapyStartHelp(row, a)
      return b
    },
    async seleniumStartHelp (a) {
      var scrapyStatus = this.result_strapy.tag
      var seleniumStatus = this.result_selenium.tag
      if (scrapyStatus === true) {
        alert('scrapy: ' + this.scrapy_phone_name + ' ' + this.result_strapy.msg)
      } else if (seleniumStatus === true) {
        alert('selenium: ' + this.result_selenium.msg)
      } else if (scrapyStatus === false && seleniumStatus === false) {
        this.$axios({
          method: 'get',
          url: '/api/selenium/start'
        })
          .then(
            alert('selenium 开始爬取')
          )
      }
    },
    async seleniumStart () {
      const a = await this.getStatus()
      const b = await this.seleniumStartHelp(a)
      return b
    }
  },
  mounted () {
    this.filterType = 'total'
    this.$axios({
      method: 'get',
      url: '/api/apply/list'
    })
      .then(response => {
        let allList = response.data.data
        this.tableData = allList
      })
  }
}
</script>

<style scoped>

</style>
