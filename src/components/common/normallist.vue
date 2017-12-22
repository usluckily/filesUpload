<template>
  <ul class="normal-list">
    <router-link tag='li' class="item" v-for="(i,index) in listData" :to=" '/details/'+i.id " :key="index" >
      <div class="item-bar ">
        <div class="clearfix">
          <div class="head-icon">
            <img src="../../assets/img/yiban.png" v-if="i.state == '0'"/>
            <img src="../../assets/img/putong.png" v-else-if="i.state == '1'"/>
            <img src="../../assets/img/zhongyao.png" v-else-if="i.state == '2'"/>
            <img src="../../assets/img/jinji.png" v-else-if="i.state == '3'"/>
          </div>
          <div class="head-con">
            <h4 class="normal-flex">
              <div class="normal-flex">
                {{ i.uploaduser }}&nbsp;
                <span class="group">{{ i.depart | dnameFilter }}</span>
              </div>
              <div :class=" i.deal == '已完成' ? 'status c_gray' : 'status c_yellow' ">{{ i.deal }}</div>
            </h4>
            <p class="item-time">{{ i.time | timeFilter }}</p>
          </div>
        </div>
      </div>
      <div class="item-bar">
        <p class="item-info">{{ i.title }}</p>
      </div>
      <div class="item-bar">
        <!--<div class="download-layout"></div>-->

        <!--长按下载-->
        <!--<div class="download"-->
             <!--@touchstart.stop="hold(i.fileurl,i.filename,$event)"-->
             <!--@touchend.stop="up($event)"-->
             <!--@click="prompt('长按以下载') ; $event.stopPropagation()">-->

          <!--<div class="img-box">-->
            <!--<img src="../../assets/img/link.png"/>-->
          <!--</div>-->

          <!--<div class="info-box">-->
            <!--<p>{{ i.filename }}</p>-->
            <!--<span>{{ i.filesize | filesizeFilter }}</span>-->
          <!--</div>-->

        <!--</div>-->

        <!--点击下载-->
        <div class="download" @click="modalShow($event,i.fileurl,i.filename)">

          <div class="img-box">
            <img src="../../assets/img/link.png"/>
          </div>

          <div class="info-box">
            <p>{{ i.filename }}</p>
            <span>{{ i.filesize | filesizeFilter }}</span>
          </div>

        </div>

      </div>
    </router-link>
  </ul>

</template>
<script>
  import date from '@/assets/js/date'
  import filters from '@/assets/js/filters'

    export default({
      name: 'normallist',
      props:{
        listData:{
          type:Array,
          default:[],
          SI:''
        }
      },
      data(){
        return {}
      },
      methods:{
        modalShow(e,href,name){
          let vm = this
          e.stopPropagation()
          vm.$root.eventHub.$emit('modal-open',{ content:'是否下载"'+name+'"' })
          vm.$root.eventHub.$on('modal-ok',function(){
            if(window.GreenSchool){
              GreenSchool.toDownloadFile(href,name)
            }else if(window.iosParams.isIosApp){
              window.external.downLoadFile(name+','+href)
            }
            vm.$root.eventHub.$off('modal-ok')
            vm.$root.eventHub.$emit('modal-close')
          })
        },
        hold(href,name,e,t){
          let vm = this , count = 0

          if(e.target.className.indexOf('download') != -1){
            e.target.className = 'download cur'
          }

          vm.SI = setInterval(function(){
            count+=100
            if(count>800){
              clearInterval(vm.SI)
              if(navigator.vibrate){
                navigator.vibrate(100)
                if(window.GreenSchool){
                  GreenSchool.toDownloadFile(href,name)
                }
              }else{
                if(window.GreenSchool){
                  GreenSchool.toDownloadFile(href,name)
                }else if(window.iosParams.isIosApp){
                  window.external.downLoadFile(name+','+href)
                }

              }
            }
          },100)
        },
        up(e){
          let vm = this

          if(e.target.className.indexOf('download') != -1){
            e.target.className = 'download'
          }

          clearInterval(vm.SI)
        },
        prompt(d){
          this.$root.eventHub.$emit('promptOpen',{ content:d })
        }
      },
      filters:{
        ...filters
      },
      components:{

      }
    })
</script>
<style>

</style>
