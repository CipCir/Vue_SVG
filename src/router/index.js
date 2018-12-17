import Vue from 'vue'
import Router from 'vue-router'

import Cip from '@/components/cip'
import Ramo from '@/components/ramo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ramo',
      component: Ramo
    },
    {
      path: '/cip',
      name: 'Cip',
      component: Cip
    }
  ]
})
