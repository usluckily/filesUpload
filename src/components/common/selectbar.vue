<template>

  <div class="search-layout">
    <ul class="selectbar">
      <li v-for="i in list" @click="emitSearch(i.id)">{{ i.state }}</li>
    </ul>
  </div>

</template>
<script>
    export default({
      name: 'selectbar',
      data(){
        return {
          list:[
            { state:'一般',id:0 },
            { state:'普通',id:1 },
            { state:'重要',id:2 },
            { state:'紧急',id:3 }
          ]
        }
      },
      methods:{
        emitSearch(id){
          this.$root.eventHub.$emit('search',{ id:id })
        }
      }
    })
</script>
<style>
</style>
