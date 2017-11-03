<template >

  <div class="blackBg-layout" style="z-index:106;" v-show="locShow">
    <div class="reply-box">
      <div class="rbox-head">{{ title }}</div>
      <div class="rbox-con">
      <textarea placeholder="请输入回复内容(必填)" v-model="replyMsg">

      </textarea>
      </div>
      <div class="rbox-ft">
        <div class="fbtn" @click="close">{{ leftBtn.text }}</div>
        <div class="fbtn" style="color:#1D97FF;" @click="ok">{{ rightBtn.text }}</div>
      </div>
    </div>
  </div>

</template>
<script>
    export default({
      name: 'replybox',
      props:{
        show:{
          type:Boolean,
          default:false
        }
      },
      data(){
        return {
          title:'回复',
          replyMsg:'',
          leftBtn:{
            text:'取消'
          },
          rightBtn:{
            text:'确定'
          }
        }
      },
      computed:{
        locShow(){
          return this.show
        }
      },
      methods:{
        close(){
          this.$root.eventHub.$emit('rbox-close')
        },
        ok(){
          let vm = this
          if( vm.replyMsg == '' ){
            vm.$root.eventHub.$emit('promptOpen',{ content:'请输入留言' })
            return
          }
          vm.$root.eventHub.$emit('rbox-ok',{ reply:vm.replyMsg })
        }
      },
      watch:{

      }
    })
</script>
<style>
  .reply-box{
    width:90%;
    max-width:20rem;
    border-radius:0.7rem;
    margin:0 auto;
    background:#fff;
    position:relative;
    top:20%;
    font-size:0.85rem;
  }
  .rbox-head{
    padding:0.5rem;
    text-align:center;
  }
  .rbox-con{
    width:100%;
  }
  .rbox-con textarea{
    width:100%;
    border:none;
    background:#EFEFF3;
    height:7rem;
    padding:0.5rem;
    font-size:0.85rem;
    color:#777;
  }
  .rbox-ft{
    width:100%;
    display:flex;
    padding:0.8rem 0;
  }
  .rbox-ft .fbtn{
    width:50%;
    text-align:center;
  }
  .rbox-ft .fbtn:first-child{
    border-right:1px solid #CECED1;
  }
</style>
