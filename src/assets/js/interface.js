/**
 * Created by Administrator on 2017/7/24.
 */
let host = '' //192.168.0.34   ,  http://112.74.136.96
export default{
  getFileList : host+'/school/listFileTrans.do?method=getFileList',//isOver( 0 or 1 ),stuid, 可选:time,state,title
  getFileDetails : host+'/school/listFileTrans.do?method=getFileDetailById',//id , stuid
  changeFileState : host+'/school/listFileTrans.do?method=changeFileStateMobile',
  changeFileDetail : host+'/school/listFileTrans.do?method=changeFileDetailMobile' // id , stuid , state || reply
}
