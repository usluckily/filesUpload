<template>
  <div id="app">
    <m_prompt></m_prompt>
    <router-view/>
  </div>
</template>

<script>
  import base from '@/assets/js/base'

  import prompt from '@/components/common/prompt'

  export default {
    name: 'app',
    created(){
      base.rootFontSize()
    },
    components:{
      m_prompt:prompt
    }
  }
</script>
<style src="./assets/css/base.css"></style>
<style src="./assets/css/ani.css"></style>
<style src="./assets/css/loader.css"></style>
<style src="./assets/css/mobiscroll.css"></style>
<style src="./assets/css/swiper-3.3.1.min.css"></style>
