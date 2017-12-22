<template >

  <div class="blackBg-layout" style="z-index:106;" v-if="show">
    <div class="reply-box" >
      <div class="rbox-head">{{ title }}</div>
      <div class="rbox-con">
        {{ content }}
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

      },
      data(){
        return {
          title:'提示',
          replyMsg:'',
          show:false,
          content:'',
          leftBtn:{
            text:'取消'
          },
          rightBtn:{
            text:'确定'
          }
        }
      },
      computed:{

      },
      methods:{
        close(){
          this.$root.eventHub.$emit('modal-close')
        },
        ok(){
          let vm = this
          vm.$root.eventHub.$emit('modal-ok')
        }
      },
      created(){
        let vm = this
        vm.$root.eventHub.$on('modal-open',function(d){
          vm.content = d.content
          vm.show = true
        })
        vm.$root.eventHub.$on('modal-close',function(){
          vm.show = false
        })
      },
      beforeDestroy(){
        this.$root.eventHub.$off('modal-open')
        this.$root.eventHub.$off('modal-close')
      },
      watch:{

      }
    })
</script>
<style scoped>
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
    border:none;
    height:7rem;
    padding:1rem;
    font-size:0.9rem;
    color:#777;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
    text-align:center;
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
