<template>
  <div>
    <el-container>
      <el-header style="background: dodgerblue">
        <h2 style="position: absolute; left: 5%; color: aliceblue">后台管理系统</h2>
        <el-button style="position: absolute; top: 2.5%; right: 5%"  @click="back">退出</el-button>
      </el-header>
      <el-container>
        <el-aside style="height: 85vh; margin-top: 1%; width: 20%; border-style: solid; border-color: slategrey; border-radius: 5px">
          <el-menu>
            <el-submenu index="1">
              <template #title>
                <el-image style="height: 20px; width: 20px" :src="require('../assets/account.png')"/>
                <span>账号信息</span>
              </template>
              <el-menu-item index="1-1" @click="router_changePassword">修改密码</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template #title>
                <el-image style="height: 20px; width: 20px" :src="require('../assets/set_pram.png')"/>
                <span>爬虫设置</span>
              </template>
              <el-menu-item index="2-1" @click="router_changeParameter">修改参数</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template #title>
                <el-image style="height: 20px; width: 20px" :src="require('../assets/user_apply.png')"/>
                <span>用户反馈</span>
              </template>
              <el-menu-item index="3-1" @click="router_applyPhone">申请添加机型</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <RouterView/>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button, Container, Header, Aside, Main, Menu, MenuItem, Submenu, Image} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Container.name, Container)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Submenu.name, Submenu)
Vue.component(Image.name, Image)
export default {
  name: 'basic_manage',
  data () {
    return {}
  },
  components: {},
  methods: {
    back () {
      window.sessionStorage.removeItem('is_load')
      this.$router.push({path: '/login'})
    },
    router_changePassword () {
      if (this.$router.currentRoute['path'] !== '/manage/account/changePassword') {
        this.$router.push({path: '/manage/account/changePassword'})
      }
    },
    router_changeParameter () {
      if (this.$router.currentRoute['path'] !== '/manage/setting/changeParameter') {
        this.$router.push({path: '/manage/setting/changeParameter'})
      }
    },
    router_applyPhone () {
      if (this.$router.currentRoute['path'] !== '/manage/user/applyPhone') {
        this.$router.push({path: '/manage/user/applyPhone'})
      }
    }
  },
  mounted () {
    if (window.sessionStorage.getItem('is_load') !== 'true') {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>

</style>
