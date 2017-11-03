<template>
  <ul class="normal-list">
    <router-link tag='li' class="item" v-for="(i,index) in listData" :to=" '/details/'+i.id " :key="index">
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
              <div>
                {{ i.uploaduser }}&nbsp;
                <span class="group">{{ i.depart }}</span>
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
        <div class="download">

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

    export default({
      name: 'normallist',
      props:{
        listData:{
          type:Array,
          default:[]
        }
      },
      data(){
        return {}
      },
      filters:{
        timeFilter(val){
          let date = val.split(' ')[0], time = val.split(' ')[1].substring(0,5)

          if( date === date.years+'-'+date.month+'-'+date.days ){
            return '今天  ' + time
          }else{
            return date+' '+time
          }

        },
        filesizeFilter(val){
          let res = 0 , x = 0 , unit = ['B','K','M','G','T']
          while(val>=1024){
            val = res = val/1024
            x++
          }
          return res.toFixed(2) + unit[x]
        }
      },
    })
</script>
<style>

</style>
