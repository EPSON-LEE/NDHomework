
class createItem{
  constructor(data){
    this.authorList = data;
    // 数据单元
    this.dataUnit = {

    }
    // 新建按钮
    this.createProject = $("#createProject");
    // 增加名单按钮
    this.addUsr = $("#addUser");
    // 姓名列表弹框
    this.nameList = $("#nameList");
    // 名单列表框
    this.nameListLeft = $("#nameListLeft");
    // 添加 按钮
    this.addName2List = $("#addName2List");
    // 删除 按钮
    this.delName2List = $("#delName2List");
    // authorBoxModel
    this.authorBoxModel = $("#authorBoxModel");
    //
  }
  showAlertBox(){
    // 弹窗dom显示
    this.showAlertBoxDomPreparation();
    this.addUsrBox(authorListLeft);
    this.closeMemberWindow();
    this.subProjectMessage();
  }
  // 新建作品dom显示
  showAlertBoxDomPreparation(){
    this.createProject.on("click",function(){
      // shader层 显示
      $("#shader").css("display","block");
      // “新建作品” 弹出
      $("#memberWindow").css("display","block");
      //获取弹窗中的数据
    })
  }
  // 关闭memberWindow
  closeMemberWindow(){
    $("#memberWindowCloseButton").on("click",function(){
      $("#shader").css("display","none");
      $("#memberWindow").css("display","none");
    })
  }
  /**
  * 名单列表弹窗处理
  *
  */
  // 姓名添加窗口 样式准备
  addUsrBoxDomPreparation(){
    var _that = this;
    this.addUsr.on("click",function(){
      //  调整叠放顺序
      $("#nameList").css("display","block");
      $("#shader").css("zIndex",3);
      // 更新左右两个列表的数据读入
      _that.refreshNameList();
      _that.bindSearchEvent();
    })
  }
  // 绑定删除按钮事件
  bindDelEvent(){
    var _that = this;
      $("#delName2List").on("click",function(){
        if($("#nameListRight .active").length >= 1){
          for(let i = 0; i < $("#nameListRight .active").length; i++){
            let j = 0;
            while ($("#nameListRight .active").length > j) {
                var tarEle = $("#nameListRight .active")[j].innerHTML;
                var pos = authorListRight.indexOf(tarEle);
                var toy = authorListRight.splice(pos,1);
                authorListLeft.push(toy[0]);
                j++;
            }
            _that.refreshNameList();
          }
        }
        $("#searchName").val("");
      })
  }
  //  绑定添加按钮事件
  bindAddEvent(){
    var _that = this;
      $("#addName2List").on("click",function(){
        if($("#nameListLeft .active").length >= 1){
          for(let i = 0; i < $("#nameListLeft .active").length; i++){
            let j = 0;
            while ($("#nameListLeft .active").length > j) {
                var tarEle = $("#nameListLeft .active")[j].innerHTML;
                var pos = authorListLeft.indexOf(tarEle);
                var toy = authorListLeft.splice(pos,1);
                authorListRight.push(toy[0]);
                j++;
            }
            _that.refreshNameList();
          }
        }
        // 搜索框清空
        $("#searchName").val("");
      })
  }
  // 将authorListLeft数据读入列表 通用函数
  addUsrBoxDataPreparation(data,modelElem,parent){
    for(var i = 0; i < data.length; i++){
      modelElem.html(data[i])
      var tempDom = modelElem.clone();
      tempDom.removeAttr("id");
      tempDom.css("display","block");
      parent.append(tempDom);
    }
  }
  // 更新左右两个列表的数据读入
  refreshNameList(){
    // 清除左侧dom信息
    $("#nameListLeft span:gt(0)").remove();
    // 读入左侧数据到DOM
    this.addUsrBoxDataPreparation(authorListLeft,$("#nameListModel"),$("#nameListLeft"));
    // 清除右侧dom信息
    $("#nameListRight span:gt(0)").remove();
    // 读入右侧数据到DOM
    this.addUsrBoxDataPreparation(authorListRight,$("#nameListRightModel"),$("#nameListRight"));
    // 加入点击效果
    // this.addSelected();
    this.addSelected($("#nameListRight > span"),$("#nameListLeft > span"),"click");
    this.addSelected($("#nameListLeft > span"),$("#nameListRight > span"),"click");
    // 加入按钮效果
    this.setButtonStyle();
    // 添加按钮
    this.bindAddEvent();
    // 删除按钮
    this.bindDelEvent();
    // 关闭姓名列表增加窗口
    this.closeMemberWindow()
    // 关闭增加成员列表窗口
    this.closeNameListWindow();
  }
  // 为文字添加点击显示效果 通用函数
  addSelected(bindElem,oppsiteElem,eventType){
    var _that = this;
    var binder = bindElem;
    binder.on(eventType,function(){
      oppsiteElem.removeClass();
      this.className == "active" ? this.className = "" : this.className = "active";
      _that.setButtonStyle();
    })

  }

  // 增加删除按钮根据点击不同侧按钮效果
  setButtonStyle(){
    if($("#nameListLeft .active").length >= 1){
      $("#delName2List").removeClass("button-selected");
      $("#addName2List").addClass("button-selected");
    }else{
      $("#addName2List").removeClass("button-selected");
    }
    if($("#nameListRight .active").length >= 1){
      $("#addName2List").removeClass("button-selected");
      $("#delName2List").addClass("button-selected");
    }else{
        $("#delName2List").removeClass("button-selected");
    }
  }

  // 点击confirm后的Dom变化
  nameListDomChange(){
    // Dom层级变化
    $("#nameList").css("display","none");
    $("#shader").css("zIndex",2);
    // 清除authorBox
    $("#authorBox span:gt(0)").remove();
  }
  processAuthorBoxData(){

  }
  // confirm绑定事件 更新姓名列表右侧到authorBox
  bindNameListSubmit(){
    var _that = this;
    $("#confirm").on("click",function(){
      // 加载authorListLeft信息进
      _that.nameListDomChange();
      for(var i = 0; i < authorListRight.length; i++){
        // 填入姓名
        $("#authorBoxModel > a").html(authorListRight[i]);
        // 克隆模板
        var temp = $("#authorBoxModel").clone();
        temp.css("display","inline-block");
        temp.removeAttr("id");
        $("#authorBox").append(temp);
        _that.bindCloseNamelistItem();
    }
  })

}
  // 关闭nameList
  closeNameListWindow(){
    $("#nameListWindowCloseButton").on("click",function(){
      $("#nameList").css("display","none");
      $("#shader").css("zIndex",2);
    })
  }
  // 姓名添加窗口弹窗
  addUsrBox(){
    this.addUsrBoxDomPreparation();
    this.bindNameListSubmit();

  }
  // 小黄叉事件绑定
  /**
  *给每个小黄叉绑定事件，更新左右两个数组
  *清除authorBox中的内容，然后再讲数组中的内容重新读入到nameListLeft中
  **/
  bindCloseNamelistItem(){
    var _that = this;
    $("#authorBox i").on("click",function(){
      var tarMessage = this.parentNode.firstElementChild.innerHTML;
      // 判断被点击的姓名是否存在
      if(authorListRight.indexOf(tarMessage) != -1){
        // 分别对authorListLeft 和 authorListRight进行处理
        authorListLeft.push(authorListRight.splice(authorListRight.indexOf(tarMessage),1)[0]);
        // 清空authorBox之前留下的Dom信息
          _that.nameListDomChange();
          // 将authorListLeft中的信息重新读入到authorBox中
          for(var i = 0; i < authorListRight.length; i++){
            // 填入姓名
            $("#authorBoxModel > a").html(authorListRight[i]);
            // 克隆模板
            var temp = $("#authorBoxModel").clone();
            temp.css("display","inline-block");
            temp.removeAttr("id");
            $("#authorBox").append(temp);
            _that.bindCloseNamelistItem()
        }
      }
    })
  }
  /**
  *获取 searchInputBox中的内容，遍历nameListLeft将符合的姓名填入一个新的局部数组，
  *清楚nameListLeft中的信息填入新数组信息
  **/
  searchNameList(){
    var tarValue = $("#searchName").val();
    var tarArray = [];
    for(var i = 0; i < authorListLeft.length; i++){
      if(authorListLeft[i].indexOf(tarValue) != -1){
        tarArray.push(authorListLeft[i]);
      }
    }
    $("#nameListLeft span:gt(0)").remove();
    this.addUsrBoxDataPreparation(tarArray,$("#nameListModel"),$("#nameListLeft"));
    this.addSelected($("#nameListLeft > span"),$("#nameListRight > span"),"click");
  }
  // 搜索按钮绑定
  bindSearchEvent(){
    var _that = this;
    $("#searchName").on("keyup",function(){
      _that.searchNameList();
    })
  }
  // 提交新建作品
  subProjectMessage(){
    $("#submitNewProject").on("click",function(){
      $("#memberWindow").css("display","none");
      $("#shader").css("display","none");
      var data = {};
      var content = $("#content").val();
      var title = $("#sourceGet").val();
      var author = authorListRight;
      if(classWorksData.length == 0){
        data.id  = 1;
      }else{
        data.id = classWorksData[classWorksData.length - 1].id + 1;
      }
      data.title = title;
      data.date = Date.parse(new Date());
      data.authorList = author;
      data.content = content;
      data.src = "";
      classWorksData.push(data);
    })
  }
}
