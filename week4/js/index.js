// 建立数据控制器
class listDataController{
  constructor(data){
    this.data = data;
    // this.myWorksData = myWorksData;
  }
  addData(){
    alert("1");
  }
  getData(){
    return this.data;
  }
}
// 建立DOM控制器
class Works{
  constructor(data){
    this.data = data;
    // this.myWorksData = myWorksData;
    /* 取得dom元素控制 */
    this.myClassProject = $("#myProject");
    //  获取content页面控制
    this.content = $("#content");
    /* 模拟模板*/
    this.itemModel = $("#itemModel");
    this.itemModelContainer = $(".shader");
    this.itemModelAuthor = $(".name-des");
    this.itemModelDate = $(".dateTime");
    this.itemModelEdit = $(".edit");
    this.itemModelDel  = $(".del");
    this.itemModelTitle = $(".tap-des");
    // 搜索按钮
    this.searchButton = $("#searchButton");
    this.searchInputBox = $("#searchInputBox");
    // 删除按钮
    this.delItemButton = $(".del");
    this.item = $("#content .item");
    // 搜索按钮
    this.searchSource = $("#searchButton");
  }
  // 搜索元素
  searchItem(){
    console.log("enter function");
    var _that = this;
    $("#searhInputBox").on("keyup",function(){
      console.log("enter event");
      $("#itemModel").nextAll().remove();
      var value = $("#searhInputBox").val();
      var id = this.id;
      var tempArr = [];
      if($("#myProject").hasClass("project-selected")){
        for(let i = 0; i < myWorksData.length; i++){
          if(myWorksData[i].title.indexOf(value) != -1){
            tempArr.push(myWorksData[i]);
          }
        }
      }
      if($("#classProject").hasClass("project-selected")){
        for(let i = 0; i < classWorksData.length; i++){
          if(classWorksData[i].title.indexOf(value) != -1){
            tempArr.push(classWorksData[i]);
          }
        }
      }

      _that.showItem(tempArr)
    })

  }
  // 删除元素绑定
  bindDel2Item(data){
    var _that = this;
    $(".del").on("click",function(){
      console.log("enter event");
      var id = this.parentNode.parentNode.id;
      for(let i = 0; i < data.length; i++){
        if(data[i].id == id){
          data.splice(i,1);
          console.log("eventing");
          _that.itemModel.nextAll().remove();
          _that.showItem(data);
          console.log("event end");
        }
      }
    });
  }
  // 显示元素(通用模块)
  showItem(data){
      if(data.length == 0){
        // 没有资源切换背景图片
          this.content.addClass("null-resource");
          return false;
      }else{
        this.content.removeClass("null-resource");
        for(var i = 0; i < data.length;i++){
          // JSX
          this.itemModelContainer.attr("data-msg",data[i].authorList.join("、").toString());
          this.itemModelAuthor.html(data[i].authorList.join("、").toString());
          this.itemModelDate.html(new Date(parseInt(data[i].date)).toLocaleString().replace(/:\d{1,2}$/,' '));
          this.itemModelTitle.html(data[i].title);
          var temp = this.itemModel.clone();
          temp.css("display","block");
          temp.attr("id",data[i].id);
          this.content.append(temp);
        }
      }
      this.bindDel2Item(data);
  }
  // 新建作品提交按钮绑定
  /***
  *新建作品提交按钮被触发时重新加载classWorksData中的元素
  *
  ****/
  reloadClassWorkDom(data){
    var _that = this;
    $("#submitNewProject").on("click",function(){
      _that.itemModel.nextAll().remove();
      _that.showItem(data);
    })
  }
  // 切换Tap状态函数
  /**
  *切换原理
  *
  *检测label是否有 project-selected 装饰类。
  *
  */
  changeLabelStatus(tarDom,oriDom){
    tarDom.bind("click",function(){
    // 安全检查
      if(oriDom.hasClass("project-selected")){
        oriDom.removeClass("project-selected");
        // 删除content内容
        this.itemModel.nextAll().remove();
        this.showItem(this.data);
        this.reloadClassWorkDom(this.data);
        // this.searchItem();
      }
      tarDom.addClass("project-selected");
    }.bind(this));
  }


  // 初始化DOM节点
  initDom(tarDom,oriDom){
    this.changeLabelStatus(tarDom,oriDom);
            this.searchItem();
  }
}


// 将数据类和控制类调用
class operateMyWorks{
  constructor(myWorksData,classWorksData){
    this.myWorksData = myWorksData;
    this.classWorksData = classWorksData;
    // 获取班级作品控制
    this.classProject = $("#classProject");
    // 获取我的作品控制
    this.myClassProject = $("#myProject");
  }
  // 执行函数
  operateFunction(){
      // 第一次进入显示页面
     new Works().showItem(this.myWorksData);
     //我的作品事件
     new Works(this.myWorksData).initDom(this.myClassProject,this.classProject);
    //班级切换事件
     new Works(this.classWorksData).initDom(this.classProject,this.myClassProject);
  }
}
