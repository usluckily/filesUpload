// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import utils from './assets/js/utils'
// import state from './state'

Vue.config.productionTip = false

let basic = {userid:'63202660',sid:'40',perm:['XKBM'],roleid:'2460,2481',stuTid:'999555435',role:'SPR',roleFlag:''};

Vue.use(Vuex)
Vue.use(utils)

const store = new Vuex.Store({
  state:{
    basic:basic,
    unProcessed:{
      loader:true,
      sTop:0,
      list:[],
      page:1,
      zpage:''
    },
    isProcessed:{
      loader:true,
      sTop:0,
      list:[],
      page:1,
      zpage:''
    }
  },
  mutations:{

  }
})

const mainVueObj = {
  el: '#app',
  router,
  store,
  data:{
    eventHub:new Vue(),
  },
  template: '<App/>',
  components: { App }
}

if(window.GreenSchool){
  GreenSchool.showLeftBtn(false)

  basic.stuTid = GreenSchool.getStudentId()
  basic.userid = GreenSchool.getUserID()
  basic.sid = GreenSchool.getSchoolId()
  basic.roleFlag = GreenSchool.getRoleFlag()

  basic.roleid = GreenSchool.getRoleId()

  new Vue(mainVueObj)

  // alert(JSON.stringify(basic))

}else if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  let SI = setInterval(function(){
    if(window.iosParams.userid != ''){
      basic.userid = window.iosParams.userid
      basic.stuTid = window.iosParams.stuTid
      basic.sid = window.iosParams.sid
      basic.roleid = window.iosParams.roleid
      basic.roleFlag = window.iosParams.roleFlag

      // alert(JSON.stringify(basic))

      new Vue(mainVueObj)

      clearInterval(SI)
    }
  },100)
}else{

  new Vue(mainVueObj)

}
