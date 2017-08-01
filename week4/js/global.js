// 全局调用
window.onload = function(){
  // 左侧点击
  bar.initDom();
  //显示框图
  new operateMyWorks(myWorksData,classWorksData).operateFunction();
  //作者作品栏
  new createItem().showAlertBox();
}
