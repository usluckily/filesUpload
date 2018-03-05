<template>

  <transition name="page">
    <div class="all">

      <rBox :show=" rboxShow "></rBox>

      <readbox :readlist="readlist"></readbox>

      <div class="content">

        <div class="con-box">

          <div class="page-tit">
            {{ details.title }}
          </div>

          <br/>

          <ul class="normal-list">
            <li class="item" style="margin:0;">
              <div class="item-bar ">
                <div class="clearfix">
                  <div class="head-icon">
                    <img :src="details.pic" v-if="details.pic && details.pic != ''"/>
                    <img src="../assets/img/logo.png" v-else/>
                  </div>
                  <div class="head-con">
                    <h4 class="normal-flex">
                      <div>
                        {{ details.tname }}&nbsp;
                        <span class="group">{{ details.dname | dnameFilter }}</span>
                      </div>
                      <div class="status" style="display:flex;align-items:center;">
                        <!--<span style="display:block;width:0.5rem;height:0.5rem;border-radius:50%;background:red"></span>-->
                        &nbsp;
                        <span>{{ details.state | stateToCnFilter }}</span>
                      </div>
                    </h4>
                    <!--<p><span class="">{{ details.dname | dnameFilter }}</span></p>-->
                    <p class="item-time">
                      <span>{{ details.uptime | timeFilter }}</span>
                      <span :class=" details.deal == '已完成' ? 'c_gray' : 'c_yellow' ">{{ details.deal }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="item-bar">
                <p class="item-info" v-html="details.description"></p>
              </div>
              <div class="item-bar">
                <div class="download">

                  <div class="img-box">
                    <img src="../assets/img/link.png"/>
                  </div>

                  <div class="info-box">
                    <p>{{ details.filename }}</p>
                    <span>{{ details.filesize | filesizeFilter }}</span>
                  </div>

                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="con-box clearfix">
          <div style="width:4rem;float:left;line-height: 2rem;color:#999;">处理人：</div>
          <div class="handler-list">
            <div v-for=" i in details.dealuser " class="handler" @click="getReadUser">
              <div class="img-box">
                <img :src="i.tpic" v-if=" i.tpic && i.tpic != '' "/>
                <img src="../assets/img/logo.png" v-else/>
              </div>
              <span>{{ i.tname }}</span>
            </div>
          </div>
        </div>

        <div class="con-box">
          <div class="status-list">
            <h4>流程信息:</h4>

            <div class="item" v-for="i in reverseProcess" :style="{ color:i.state == 0 ? '#777' : '#999' }" @click="selectProcessor(i,$event)">
              <div class="icon-box">
                <img src="../assets/img/clock.png" class="icon" v-if="i.state == 0"/>
                <img src="../assets/img/change.png" class="icon" v-else-if="i.select"/>
                <img src="../assets/img/hook.png" class="icon" v-else/>
              </div>

              <div class="con">
                <p>{{ i.pro | processFilter(i.state) }}  <span>{{ i.time | timeFilter }}</span></p>
                <div class="msg" v-show="i.reply || i.answer">
                  <div class="arrow-up"></div>
                  {{ i.answer ? '驳回理由：'+i.answer : i.reply }}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      <div class="fbtn-box" v-if="type != 0">
        <div class="fbtn" v-if=" type == '2' " @click=" changeFileDetail(2) ">回复</div>
        <!--处理人-->

        <div class="fbtn-box2"  v-if=" type == '1' " >
          <div class="fbtn" style="color:#1D97FF;border-right: 1px solid #ddd;" @click=" changeFileState(3) ">
            <span><img src="../assets/img/agree_icon.png"/></span>
            <span>同意</span>
          </div>
          <div class="fbtn" style="color:#FF5858;" @click=" changeFileState(2) ">
            <span><img src="../assets/img/reject_icon.png"/></span>
            <span>驳回</span>
          </div>
        </div>
        <!--审批人审核-->

        <div class="fbtn-box2" v-if=" type == '3' ">
          <div class="fbtn" style="color:#1D97FF;border-right: 1px solid #ddd;" @click=" changeFileDetail(3) ">
            <span><img src="../assets/img/agree_icon.png"/></span>
            <span>满意</span>
          </div>
          <div class="fbtn" style="color:#FF5858;" @click=" changeFileDetail(1) ">
            <span><img src="../assets/img/reject_icon.png"/></span>
            <span>不满意</span>
          </div>
        </div>
        <!--审批人审核处理情况-->

      </div>

    </div>
  </transition>

</template>
<script>
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'
  import date from '@/assets/js/date'
  import filters from '@/assets/js/filters'

  import rBox from '@/components/common/replybox'
  import readbox from '@/components/common/readbox'

    export default({
      name: 'details',
      data(){
        return {
          id:this.$route.params.id,
          BP:this.BP(),
          details:{
            uptime:'',
            state:'',
            process:[]
          },
          rboxShow:false,
          type:'',
          readlist:[],
          processorObj:{}
        }
      },
      methods:{
        updateList(){
          let vm = this , vState = vm.$store.state
          vState.unProcessed.list.forEach(function(i,index){
            if(i.id == vm.id){
              vState.isProcessed.list.push(i)
              vState.unProcessed.list.splice(index,1)
            }
          })
        },
        changeFileState(state){
          //上传人上传->审批人审核上传 阶段

          let vm = this
          vm.rboxShow = true

          vm.$root.eventHub.$on('rbox-ok',function(d){

            ajax.post(IF.changeFileState,{ id:vm.id,stuid:vm.BP.stuTid,state:state,reply:d.reply },function(d){

              vm.getDetails()

              vm.$root.eventHub.$emit('promptOpen',{ content:'操作成功!' })

//              vm.updateList()//本地更新list

              vm.$root.eventHub.$emit('updateList')

            })

            vm.rboxShow = false

          })

        },
        changeFileDetail(state){
          //处理人处理此文件任务->审批人审核处理情况 阶段

          let vm = this , fduid
          vm.rboxShow = true

//          alert(JSON.stringify(vm.processorId))

          if(vm.processorId.length > 0){
            fduid = vm.processorId
          }

          vm.$root.eventHub.$on('rbox-ok',function(d){

            ajax.post(IF.changeFileDetail,{ id:vm.id,stuid:vm.BP.stuTid,state:state,reply:d.reply,fduid:fduid },function(d){

              vm.getDetails()

              vm.$root.eventHub.$emit('promptOpen',{ content:'操作成功!' })

//              vm.updateList()//本地更新list

              vm.$root.eventHub.$emit('updateList')

            })

            vm.rboxShow = false

          })

        },
        getDetails(){
          let vm = this
          ajax.post(IF.getFileDetails,{ id:vm.id,stuid:vm.BP.stuTid },function(d){
            vm.details = d
            vm.type = d.type
            vm.processorObj = {}
          },['title','description'])
        },
        getReadUser(){
          let vm = this

          if(vm.type == '2' || vm.type == '0' ){//处理人，非审批人
            return
          }

          vm.$root.eventHub.$emit('readbox-open')
          ajax.post(IF.getReadUser,{ id:vm.$route.params.id },function(d){
              vm.readlist = d.data
          })
        },
        selectProcessor(i,e){
          if(!i.id || this.type != '3' || i.state != '1')return //state1就是可以选，2就是不能选

          let vm = this , node = e.target , pNode

          function findP(node){
            if(node.tagName != 'DIV' || node.className != 'item'){
              node = node.parentNode
              findP(node)
            }else{
              pNode = node
            }
          }
          findP(node)

          if(JSON.stringify(vm.processorObj).indexOf(i.id) != -1){
            delete pNode.dataset.select
            delete vm.processorObj[i.id]
            vm.$set(i,'select',false)
          }else{
            pNode.dataset.select = 'select'
            vm.processorObj[i.id] = i.id
            vm.$set(i,'select',true) //在 i 中添加select属性用以判断是否选中
          }

          console.log(vm.processorObj)
        },
      },
      filters:{
        ...filters
      },
      computed:{
        reverseProcess(){
          let vm = this , arr = [] ,
            len = vm.details.process.length
          for( var i = len - 1;i >= 0;i-- ){
            arr.push(vm.details.process[i])
          }
          return arr
        },
        processorId(){
          let vm = this , res = ''

          for(var i in  vm.processorObj){
            res += '['+vm.processorObj[i]+'],'
          }

          console.log('res:'+res)
          return res
        }
      },
      created(){
        let vm = this
        vm.getDetails()

        vm.$root.eventHub.$on('rbox-close',function(){
          vm.rboxShow = false
        })

      },
      beforeDestroy(){
        this.$root.eventHub.$off('rbox-close')
      },
      watch:{
        rboxShow(val){
          let vm = this
          if(val == false){
            vm.$root.eventHub.$off('rbox-ok')
          }else{
            return
          }
        }
      },
      components:{
        rBox:rBox,
        readbox:readbox
      }
    })
</script>
<style scoped>
  .normal-list .item{
    padding:0;
  }
</style>
