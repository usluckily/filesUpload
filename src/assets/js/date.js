/**
 * Created by Administrator on 2017/11/3.
 */
export default{
  years : new Date().getFullYear(),
  month : (new Date().getMonth()+1) < 10 ? '0'+(new Date().getMonth()+1) : (new Date().getMonth()+1),
  days : new Date().getDate() <10 ? '0'+new Date().getDate() : new Date().getDate()
}
