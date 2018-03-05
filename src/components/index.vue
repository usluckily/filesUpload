<template>

  <transition name="page">
    <div class="all">

      <rBox :show=" rboxShow "></rBox>

      <div class="head">

        <div class="grid-2 normal-flex">
          <router-link v-for="(i,index) in nav.list" :class=" index == nav.cur ? 'cur' : '' " tag="div" :to=" '/'+index+'?id='+i.id " :key="index" replace>{{ i.tit }}</router-link>
        </div>

        <div class="grid-3 normal-flex">
          <div id="startdate" @click="stateBoxShow = false , searchBoxShow = false"> <span>{{ selectDate == '' ? '全部日期' : selectDate }}</span> <img class="icon" src="../assets/img/arrow.png"/> </div>
          <div @click="stateBoxShow = !stateBoxShow , searchBoxShow = false"> <span>{{ stateText }}</span> <img class="icon" src="../assets/img/arrow.png"/> </div>
          <div id="textSearch">
            <span @click="searchBoxShow = !searchBoxShow , stateBoxShow = false">{{ searchText == '' ? '搜索' : searchText }}</span>
            <img class="icon" src="../assets/img/search.png" style="width:1.2rem;" @click="isEnter(13)"/>
          </div>
        </div>

      </div>

      <div class="blackBg-layout" v-show="stateBoxShow" @click="">
        <ul class="selectbar">
          <li v-for="i in searchList" @click="setState(i.id,i.state)">{{ i.state }}</li>
        </ul>
      </div>
      <!--selectBox-->

      <div class="blackBg-layout" v-show="searchBoxShow" @click="">
        <div class="searchBar">
          <input type="search" placeholder="关键字搜索"
                 v-model="searchText"
                 @keyup="isEnter($event.keyCode)"
          />
          <img src="../assets/img/search-cancle-icon.png" @click=" searchText = '' "/>
        </div>
      </div>
      <!--searchBox-->

      <div class="content">

        <div class="swiper-container" id="tabs-container" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" id="unProcessed">

              <m_tips tips="暂时没有数据" v-show="unProcessed.list <= 0"></m_tips>

              <m_ballPulse v-if=" unProcessed.loader "></m_ballPulse>

              <normallist :listData="unProcessed.list"></normallist>
            </div>

            <div class="swiper-slide" id="isProcessed">

              <m_tips tips="暂时没有数据" v-show="isProcessed.list <= 0"></m_tips>

              <m_ballPulse v-if=" isProcessed.loader "></m_ballPulse>

              <normallist :listData="isProcessed.list"></normallist>
            </div>

          </div>
        </div>

      </div>

    </div>
  </transition>

</template>
<script>
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'
  import $ from 'jquery'
  import Swiper from 'swiper'
  import sl from '@/assets/js/scrollload'

  import { mapState } from 'vuex'

  require('@/assets/js/mobiscroll.js')

  import tips from '@/components/common/nodatatips'
  import normallist from '@/components/common/normallist'
  import ballPulse from '@/components/loader/ballpulse'
  import rBox from '@/components/common/replybox'

    export default({
      name: 'index',
      data(){
        return {
          page:1,
          nav:{
            cur:this.$route.params.id || 0,
            list:[
              { tit:'待处理',id:0 },
              { tit:'已处理',id:1 }
            ]
          },
          searchList:[
            { state:'全部状态',id:'' },
            { state:'一般',id:0 },
            { state:'普通',id:1 },
            { state:'重要',id:2 },
            { state:'紧急',id:3 }
          ],
          mySwiper:'',
          selectDate:'',
          selectState:'',
          stateText:'全部状态',
          searchText:'',
          stateBoxShow:false,
          searchBoxShow:false,
          rboxShow:false
        }
      },
      methods:{
        getList(data,cb){
          let vm = this
          ajax.post(IF.getFileList,data,function(d){
            if(cb){
              cb(d)
            }
          },['title','description'])
        },

        search(){
          let vm = this ,vState = vm.$store.state , BP = vState.basic ,
            id = vm.$route.query.id,//state
            page = 1

          if(id == '1'){
            page = vm.isProcessed.page
            vm.isProcessed.page = 1 //搜索page归1
            vm.isProcessed.list = []
            vState.isProcessed.loader = true
          }else{
            page = vm.unProcessed.page
            vm.unProcessed.page = 1 //搜索page归1
            vm.unProcessed.list = []//清空
            vState.unProcessed.loader = true
          }//根据state 改变page


          vm.getList({ isOver:id,stuid:BP.stuTid,time:vm.selectDate,state:vm.selectState,title:vm.searchText },function(d){

            if(id == '1'){
              vState.isProcessed.list = d.data
              vState.isProcessed.loader = false
            }else{
              vState.unProcessed.list = d.data
              vState.unProcessed.loader = false
            }

          })

        },

        isEnter(k){
          let vm = this
          if(k == 13 && vm.searchBoxShow){
            vm.search()
            vm.searchBoxShow = false
          }
        },

        setState(id,state){
          this.selectState = id
          this.stateText = state
          this.search()
          this.stateBoxShow = false
        },

        slider:function(){
          let vm = this
          vm.mySwiper = new Swiper('.swiper-container',{
//              initialSlide:1,
            loop: false,
            freeMode:false,
            speed:300,
            noSwiping : true,
            onSlideChangeStart: function(){

            },
            onSlideChangeEnd: function(){

            },
            onSlidePrevEnd: function(){
              let index = vm.mySwiper.activeIndex
              vm.$router.replace({ path:'/'+index+'?id='+vm.nav.list[index].id })
            },
            onSlideNextEnd: function(){
              let index = vm.mySwiper.activeIndex
              vm.$router.replace({ path:'/'+index+'?id='+vm.nav.list[index].id })
            }
          });
        },
      },
      computed:{
        ...mapState([
          'unProcessed',
          'isProcessed'
        ])
      },
      created(){
        let vm = this , vState = vm.$store.state , BP = vState.basic

        if( !vState.unProcessed.list.length ){
          vm.getList({ isOver:0,stuid:BP.stuTid,page:vm.unProcessed.page },function(d){

            vState.unProcessed.list =  d.data
            d.data.length ? vState.unProcessed.zpage = d.data[0].zpage : ''
            vState.unProcessed.loader = false
          })
        }

        if( !vState.isProcessed.list.length ){
          vm.getList({ isOver:1,stuid:BP.stuTid,page:vm.isProcessed.page },function(d){

            vState.isProcessed.list =  d.data
            d.data.length ? vState.isProcessed.zpage = d.data[0].zpage : ''
            vState.isProcessed.loader = false
          })
        }

        //off upDateList
        vm.$root.eventHub.$off('updateList')

      },
      mounted(){
        let currYear = (new Date()).getFullYear() , vm = this , vState = vm.$store.state , BP = vState.basic
        $("#startdate").mobiscroll().date({
          theme: "android-ics light",
          lang: "zh",
          cancelText: null,
          clear: '所有',
          startYear: currYear-5,
          dateFormat: 'yy-mm-dd', //返回结果格式化为年月格式
          buttons:[
            'set',
            {
              text:'所有日期',
              icon: 'checkmark',
              cssClass: 'my-btn',
              handler: function (event, inst) {
                $('#startdate').mobiscroll('clear');
              }
            },
            'clear'
          ],
          onSelect: function(inst){
            vm.selectDate = inst

            vm.search()
          },
          onClear: function(inst){
            vm.selectDate = ''

            vm.search()
          }
        });

        vm.slider()

        let allH = $('.all').height(),navH = $('.head').height()

        //swiper-slide height init
        $('.swiper-wrapper .swiper-slide').css({ height:allH - navH })


        vm.mySwiper.slideTo(vm.$route.params.id,300)

        //sl init
        sl.init('#unProcessed',function(){

          if( vState.unProcessed.page < vState.unProcessed.zpage ){

            vState.unProcessed.loader = true

            vm.getList({ isOver:0,stuid:BP.stuTid,time:vm.selectDate,state:vm.selectState,page:++vState.unProcessed.page },function(d){
              vState.unProcessed.list = vState.unProcessed.list.concat(d.data)
              vState.unProcessed.loader = false
            })
          }

        })

        sl.init('#isProcessed',function(){

          if( vState.isProcessed.page < vState.isProcessed.zpage ){

            vState.isProcessed.loader = true

            vm.getList({ isOver:1,stuid:BP.stuTid,time:vm.selectDate,state:vm.selectState,page:++vState.isProcessed.page },function(d){
              vState.isProcessed.list = vState.isProcessed.list.concat(d.data)
              vState.isProcessed.loader = false
            })
          }

        })

        //设置scrollTop
        $('#unProcessed').scrollTop( vState.unProcessed.sTop )
        $('#isProcessed').scrollTop( vState.isProcessed.sTop )
        //

      },
      beforeRouteLeave(to,from,next){

        let vm = this , vState = vm.$store.state , BP = vState.basic

        //路由离开前保存两个list的scrollTop值
        vState.unProcessed.sTop = $('#unProcessed').scrollTop()
        vState.isProcessed.sTop = $('#isProcessed').scrollTop()


        //updateList
        vm.$root.eventHub.$on('updateList',function(d){

          vm.getList({ isOver:0,stuid:BP.stuTid,page:vm.unProcessed.page },function(d){

            vState.unProcessed.list =  d.data
            vState.unProcessed.zpage = d.data[0].zpage
            vState.unProcessed.loader = false
          })

          vm.getList({ isOver:1,stuid:BP.stuTid,page:vm.isProcessed.page },function(d){

            vState.isProcessed.list =  d.data
            vState.isProcessed.zpage = d.data[0].zpage
            vState.isProcessed.loader = false
          })

        })

        next()
      },
      components:{
        normallist:normallist,
        m_ballPulse:ballPulse,
        m_tips:tips,
        rBox:rBox
      },
      watch:{
        '$route'(to,from){
          this.nav.cur = to.query.id

          this.mySwiper.slideTo(to.params.id,300)


        }
      }
    })
</script>
<style>
  .swiper-slide{
    overflow-y:auto;
  }
</style>
