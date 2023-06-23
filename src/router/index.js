import Vue from 'vue'
import Router from 'vue-router'
import Search from '../components/Search.vue'
import addPhone from '../components/addPhone.vue'
import productItem from '../components/Product_item.vue'
import login from '../components/login.vue'
import basicManage from '../components/basic_manage.vue'
import changePassword from '../components/manage_detail/manage_account_change_password.vue'
import changeParameter from '../components/manage_detail/manage_setting_change_parameter.vue'
import applyPhone from '../components/manage_detail/manage_user_apply_phone.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Search',
      component: Search
    },
    {
      path: '/search/(.*)*',
      name: 'product_item',
      component: productItem
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/manage',
      name: 'basic_manage',
      component: basicManage,
      children: [
        {
          path: '/manage/account/changePassword',
          name: 'change_password',
          component: changePassword
        },
        {
          path: '/manage/setting/changeParameter',
          name: 'change_parameter',
          component: changeParameter
        },
        {
          path: '/manage/user/applyPhone',
          name: 'apply_phone',
          component: applyPhone
        }
      ]
    }
  ]
})
