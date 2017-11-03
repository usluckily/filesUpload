import Vue from 'vue'
import Router from 'vue-router'

// import index from '@/components/index'
// import details from '@/components/details'

const index = function(resolve){
  require([ '@/components/index' ],resolve)
}

const details = function(resolve){
  require([ '@/components/details' ],resolve)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/0'
    },
    {
      path: '/:id',
      name: 'index',
      component: index
    },
    {
      path:'/details/:id',
      name:'details',
      component:details
    }
  ]
})
