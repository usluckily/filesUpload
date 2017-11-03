/**
 * Created by Administrator on 2017/6/6.
 */
import $ from 'jquery'

var scroll = true;
var pageNum = '',allH = 0,scH = 0,gH = 0,scrollTop = 0 , len = 0,ch = 0;

export default{
  init(node,cb){
    $(node).on('scroll',function(){
      let res = 0;
      // for(var i in all){
      //   res += parseInt($(all[i]).height())
      // }
      allH = $(this).find('.normal-list').height()
      if($('.normal-nav').length){
        allH += $('.normal-nav').height()
      }
      scH = $(window).height()
      scrollTop = $(this).scrollTop()

      // console.log(allH+','+scH+','+scrollTop)

      if(allH - scH <= scrollTop && scroll == true){
        scroll = false

        cb(scroll)

        setTimeout(function(){
          scroll = true
        },1000)
      }
    })
  }
}
