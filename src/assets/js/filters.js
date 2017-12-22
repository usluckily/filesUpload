/**
 * Created by Administrator on 2017/12/20.
 */
export default{
  dnameFilter:function(val){
     if(!val){
       return
     }
    if(val.indexOf(',')!=-1){
      return val.split(',')[0]
    }else{
      return val
    }
  },
  stateToCnFilter:function(val){
    let res = ''
    switch(val){
      case '0':
        res = '一般';
        break;
      case '1':
        res = '普通';
        break
      case '2':
        res = '重要';
        break
      case '3':
        res = '紧急';
        break
    }
    return res
  },
  processFilter:function(val , state){
    if(state == 0){
      return '等待审核'
    }else{
      return val
    }
  },
  filesizeFilter:function(val){
    let res = 0 , x = 0 , unit = ['B','K','M','G']
    while(val>=1024){
      val = res = val/1024
      x++
    }
    return res.toFixed(2) + unit[x]
  },
  timeFilter(val){
    if(val == ''){
      return
    }

    let date = val.split(' ')[0], time = val.split(' ')[1].substring(0,5)

    if( date === date.years+'-'+date.month+'-'+date.days ){
      return '今天  ' + time
    }else{
      return date+' '+time
    }
  }
}
