<template>

  <div class="search-layout">
    <div class="searchBar">
      <input type="search" placeholder="关键字搜索"
             @input="search('deptOrClass',$event)"
             @compositionstart="compositionstart"
             @compositionend="compositionend"
      />
      <img src="../../assets/img/search-cancle-icon.png"/>
    </div>
  </div>


</template>
<script>
    export default({
      name: 'searchbar',
      data(){
        return {}
      },
      methods:{
        compositionstart(){
          this.inputLock = true
          this.inputCn = true
        },
        compositionend(){
          this.inputLock = false
          this.inputCn = false
        },
      }
    })
</script>
<style>

</style>
