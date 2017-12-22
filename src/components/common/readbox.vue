<template>
  <div class="blackBg-layout" v-show="show" @click="close">
    <div :class=" show ? 'readbox on' : 'readbox' " onclick="event.stopPropagation()">

      <div class="r-tit" v-if="state">
        <span style="color:#4E97F2;" @click="sendMsg(read_unread.user)" >一键提醒</span>
      </div>

      <div class="r-con">

        <m_ballPulse v-if="loader"></m_ballPulse>

        <div class="item" v-for="i in list" v-if="i.state > 0 && !state ">
          <div class="item-bar ">
            <div class="clearfix">
              <div class="head-icon">
                <img :src="i.pic" v-if="i.pic && i.pic != ''"/>
                <img src="../../assets/img/logo.png" v-else/>
              </div>
              <div class="head-con">
                <h4 class="normal-flex">
                  <div>
                    {{ i.name }}&nbsp;
                  </div>
                </h4>
                <p class="item-time">
                  <span>{{ i.dname || '未知' }}</span>
                </p>
              </div>
            </div>
          </div>
      </div>

        <div class="item" v-for="i in list" v-if="i.state == 0 && state">
          <div class="item-bar ">
            <div class="clearfix">
              <div class="head-icon">
                <img :src="i.pic" v-if="i.pic && i.pic != ''"/>
                <img src="../../assets/img/logo.png" v-else/>
              </div>
              <div class="head-con">
                <h4 class="normal-flex">
                  <div>
                    {{ i.name }}&nbsp;
                  </div>
                </h4>
                <p class="item-time">
                  <span>{{ i.dname || '未知' }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

     </div>

      <div class="r-ft">
        <div @click="changeRB(0)" :class=" state ? '' : 'c_green' ">已读 ({{ read_unread.read.length }})</div>
        <div @click="changeRB(1)" :class=" state ? 'c_green' : '' ">未读 ({{ read_unread.unread.length }})</div>
      </div>

    </div>
  </div>
</template>
<script>
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'

  import tips from '@/components/common/nodatatips'
  import ballPulse from '@/components/loader/ballpulse'

    export default({
      name: 'readbox',
      props:{
        readlist:{
          type:Array,
          default(){
            return []
          }
        }
      },
      data(){
        return {
          show:false,
          state:false,
          loader:true
        }
      },
      created(){
        let vm = this
        vm.$root.eventHub.$on('readbox-open',function(cb){
          if(cb){
            cb()
          }
          vm.show = true
        })

        vm.$root.eventHub.$on('readbox-close',function(cb){
          if(cb){
            cb()
          }
          vm.show = false
        })
      },
      methods:{
        close(){
          this.show = false
        },
        sendMsg(user){
          let vm = this
          ajax.post(IF.sendMessage,{ user:user },function(d){
            if(d == 'success'){
              vm.$root.eventHub.$emit('promptOpen',{ content:'发送成功!' })
            }else{
              vm.$root.eventHub.$emit('promptOpen',{ content:'发送失败!' })
            }
          })
        },
        changeRB(x){
          x == '0' ? this.state = false : this.state = true
        }
      },
      computed:{
        list(){
          return this.readlist
        },
        read_unread(){
          let vm = this,
            obj = { read:[],unread:[],user:'' }
          this.readlist.forEach(function(i,index){

            if(i.state > 0){
              obj.read.push(i)
            }else{
              obj.unread.push(i)
              obj.user += i.user + ','
//              if(index == vm.readlist.length - 1){
//                obj.user += i.user
//              }else{
//
//              }

            }

          })
          return obj
        }
      },
      beforeDestroy(){
        this.$root.eventHub.$off('readbox-open')
        this.$root.eventHub.$off('readbox-close')
      },
      components:{
        m_tips:tips,
        m_ballPulse:ballPulse
      },
      watch:{
        list(){
          let vm = this
          setTimeout(function(){
            vm.loader = false
          },300)
        }
      }
    })
</script>
<style scoped>
  .readbox{
    position:fixed;
    bottom:-100%;
    width:100%;
    background:#fff;
    transition:bottom 0.8s;
  }
  .r-tit{
    width:100%;
    padding:1rem 0.8rem;
    display:flex;
    justify-content: flex-end;
    border-bottom:1px solid #E6EAEC;
  }
  .readbox .r-con{
    width:100%;
    padding:0 1rem 2rem 1rem;
    min-height: 7rem;
  }
  .readbox .item{
    width:100%;
    padding:1rem 0;
    border-bottom:1px solid #E6EAEC;
  }
  .readbox .item:last-child{
    border:none;
  }
  .readbox.on{
    bottom:0;
    z-index:999;
  }
  .r-ft{
    width:100%;
    padding:1rem 0;
    border-top:1px solid #D4D4DA;
    display:flex;
  }
  .r-ft div{
    width:50%;
    text-align:center;
    line-height:1.5rem;
  }
  .r-ft div:first-child{
    border-right:1px solid #CECED1;
  }


  .item-bar .head-con{
    padding: 0.2rem 0;
  }
  .head-con p{
    padding-top:0.2rem;
  }
</style>
