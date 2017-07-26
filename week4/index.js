/**
 * ------------------------------------------------------------------
 * 遍历Dom结构给父元素下的子元素绑定selected效果，即选中效果
 * ------------------------------------------------------------------
 */
function setSelected(parentNode,className){
  [].forEach.call(parentNode,function(e,x){
        e.onclick = function(){
            for (let i = 0;i < parentNode.length;i++){
                parentNode[i].className = '';
                parentNode[i].id = '';
            }
        this.className = className;
        this.id = className;
        };
    });
}
/**
 * ------------------------------------------------------------------
 * 遍历Dom结构给父元素下的子元素绑定del效果，即选中效果
 * ------------------------------------------------------------------
 */
function delElement(){
  [].forEach.call(parentNode,function(e,x){
        e.onclick = function(){
            for (let i = 0;i < parentNode.length;i++){
                parentNode[i].id = '';
            }
        this.id = 'delSelected';
        };
    });
}
/**
 * ------------------------------------------------------------------
 * 将全局变量中的localStorage数据到左边列表中
 * ------------------------------------------------------------------
 */
function read2List(){
  List = JSON.parse(localStorage.getItem('List'));
  var nameListNode = document.querySelector(".name-list-left");
  for(var i = 0; i < List.length; i++){
    var CNode = nameListNode.firstElementChild.cloneNode(true);
    CNode.innerHTML = List[i];
    CNode.style.display = "block";
    nameListNode.appendChild(CNode);
  }
  var activeTargetLeft = document.querySelectorAll(".name-list-left span");
      setSelected(activeTargetLeft,"active");
}
/**
 * ------------------------------------------------------------------
 * 将全局变量中的localStorage数据到右边列表中
 * ------------------------------------------------------------------
 */
function read2ListRight(){
  ListRight = JSON.parse(localStorage.getItem('ListRight'));
  var nameListNode = document.getElementById("nameListRight");
  var authorBox = document.getElementById("authorBox");
  for(var i = 0; i < ListRight.length; i++){
    var CNode = nameListNode.firstElementChild.cloneNode(true);
    CNode.innerHTML = ListRight[i];
    CNode.style.display = "block";
    nameListNode.appendChild(CNode);
  }
  var activeTargetRight = document.querySelectorAll(".name-list-right span");
      setSelected(activeTargetRight,"active-right");
}
/**
 * ------------------------------------------------------------------
 * 左侧列表中的数据写入localStorage
 * ------------------------------------------------------------------
 */
function updateLeftNameList(){
  var arr =[];
  activeTargetLeft = document.querySelectorAll(".name-list-left span");
  for(var i = 0; i < activeTargetLeft.length; i++){
    if(activeTargetLeft[i].innerHTML){
      arr.push(activeTargetLeft[i].innerHTML);
    }
  }
  List = arr;
  storage.setItem("List",JSON.stringify(List));
}
/**
 * ------------------------------------------------------------------
 * 右侧列表中的数据写入localStorage
 * ------------------------------------------------------------------
 */
function updateRightNameList(){
  var arr =[];
  activeTargetRight = document.querySelectorAll(".name-list-right span");
  if(document.querySelectorAll(".name-list-right span")){
    for(var i = 0; i < activeTargetRight.length; i++){
      if(activeTargetRight[i].innerHTML){
        arr.push(activeTargetRight[i].innerHTML);
      }
    }
    ListRight = arr;
    storage.setItem("ListRight",JSON.stringify(ListRight));
  }
}
/**
 * ------------------------------------------------------------------
 * ListRight中的姓名信息同步到authorBox中
 * ------------------------------------------------------------------
 */
function updateAuthorBox(){
  var parent = document.getElementById("authorBox");
  var authorBoxColumn = document.querySelectorAll("#authorBox span");
  ListRight = JSON.parse(localStorage.getItem("ListRight"));

  if(authorBoxColumn.length > 1){
    for(var i = 0; i < authorBoxColumn.length; i++){
      if(i == 0){
        authorBoxColumn[0].style.display = "none";
      }else{
        parent.removeChild(authorBoxColumn[i]);
      }
    }
  }
  for(var i = 0; i < ListRight.length; i++){
    var newNode = authorBoxColumn[0].cloneNode(true);
    newNode.style.display = "inline-block";
    newNode.firstElementChild.innerHTML = ListRight[i];
    parent.appendChild(newNode);
  }
}
/**
 * ------------------------------------------------------------------
 * 将名单右侧列表信息清除
 * ------------------------------------------------------------------
 */
function clearDataFromListRight(){
  var parent = document.getElementById("nameListRight");
  var authorBox = document.querySelectorAll("#nameListRight span");
  if(authorBox.length >1){
    for(var i = 0; i < authorBox.length; i++){
        if(i != 0){
          parent.removeChild(authorBox[i]);
        }
    }
  }
}
/**
 * ------------------------------------------------------------------
 * 将localStorage中ListRight的信息更新到右侧列表
 * ------------------------------------------------------------------
 */
function updateToListRightFromLocalStorage(){
  var parent = document.getElementById("nameListRight");
  var authorBox = document.querySelectorAll("#nameListRight span");

  ListRight = JSON.parse(localStorage.getItem("ListRight"));
  for(var i = 0; i < ListRight.length; i++){
    var newNode = authorBox[0].cloneNode(true);
    newNode.style.display = "block";
    newNode.innerHTML = ListRight[i];
    parent.appendChild(newNode);
  }
  var activeTargetRight = document.querySelectorAll(".name-list-right span");
      setSelected(activeTargetRight,"active-right");
}
/**
 * ------------------------------------------------------------------
 * 将名单左侧列表信息清除
 * ------------------------------------------------------------------
 */
function clearDataFromListLleft(){
  var parent = document.getElementById("nameListLeft");
  var authorBox = document.querySelectorAll("#nameListLeft span");
  if(authorBox.length > 1){
    for(var i = 0; i < authorBox.length; i++){
        if(i != 0){
          parent.removeChild(authorBox[i]);
        }
    }
  }
}
/**
 * ------------------------------------------------------------------
 * 将localStorage中ListLeft的信息更新到左侧列表
 * ------------------------------------------------------------------
 */
function updateToListLeftFromLocalStorage(){
  var parent = document.getElementById("nameListLeft");
  var authorBox = document.querySelectorAll("#nameListLeft span");
  List = JSON.parse(localStorage.getItem("List"));
  for(var i = 0; i < List.length; i++){
      var newNode = authorBox[0].cloneNode(true);
      newNode.style.display = "block";
      newNode.innerHTML = List[i];
      parent.appendChild(newNode);
  }
  var activeTargetLeft = document.querySelectorAll(".name-list-left span");
      setSelected(activeTargetLeft,"active");
}
/**
 * ------------------------------------------------------------------
 * 橘黄色叉叉点击事件的绑定
 * ------------------------------------------------------------------
 */
function delEventer(){
  var author = document.querySelectorAll("#authorBox span");
  var parent = document.getElementById("authorBox");
  List = JSON.parse(localStorage.getItem('List'));
  ListRight = JSON.parse(localStorage.getItem('ListRight'))
  for(var i = 0; i < author.length; i++){
    var num;
    author[i].onclick = function(){
      parent.removeChild(this);
      List.push(this.firstElementChild.innerHTML);
      storage.setItem("List",JSON.stringify(List));
      num = ListRight.indexOf(this.firstElementChild.innerHTML);
      ListRight.splice(num,1);
      storage.setItem("ListRight",JSON.stringify(ListRight));
    }
  }
}
/**
* 数据模型的构建
*/
// 数据
var data = [];

class courseList{
  constructor(){
    // 声明一个变量用于保存被选中的作品栏
    this.selWorkBar = null;
    // 声明一个变量用于保存当前被选择的页面号码（初始页面为1）
    this.selPageIndex = null;
  }

  _changeToMyProjectTap(){
    $("#myProject").attr('class','my-project project-selected');
    $("#classProject").attr('class','my-project');
    $(".right-content").show();
    $(".class-project").hide();
  }
  _changeToClassProjectTap(){
    $("#myProject").attr('class','my-project');
    $("#classProject").attr('class','my-project project-selected');
    $(".right-content").hide();
    $(".class-project").show();

    if($(".class-project .item").length <= 1){
      $(".class-project").attr("class","null-resource");
    }

  }
  // 新建作品
  _createProject(){
    // shader层隐藏
    $("#shader").css("display","none");
    // 弹窗隐藏
    $("#memberWindow").css("display","none");
    // 临时对象
      var newObj  = {};
    // 存储对象元素
      newObj.title = $("#sourceGet").val();
    // 存储作者
      newObj.authorList = [];
      for(var i = 1; i < $("#authorBox span a").length; i++){
        newObj.authorList.push($("#authorBox span a")[i].innerHTML);
      }
      var list = newObj.authorList.join("、");
    // 存储时间戳
      newObj.dateTime = Date.parse(new Date());
    // 存入data中
      data.push(newObj);

      $(".item:first").find(".shader").attr("data-msg",newObj.authorList.toString());
      $(".item:first").find(".name-des").html(list);
      $(".item:first").find(".date").html(new Date(parseInt(newObj.dateTime)).toLocaleString().replace(/:\d{1,2}$/,' '));
      $(".item:first").find(".tap-des").html(newObj.title);
      var newNode = $(".item")[0].cloneNode(true);
      newNode.style.display = "inline-block";
      $(".null-resource").attr("class","class-project")
      $(".class-project").append(newNode);
  }
  _editProject(){}
  _delProject(){}

  initEventListener(){
    // 提交按钮点击事件
    $("#submitNewProject").bind("click",this._createProject);
    // 切换到班级作品
    $("#classProject").bind("click",this._changeToClassProjectTap);
    // 切换到我的作品
    $("#myProject").bind("click",this._changeToMyProjectTap);
  }
}



window.onload = function(){

    var a = new courseList;
    a.initEventListener();

  var createProject = document.getElementById("createProject"); //添加按钮
      shader = document.getElementById("shader");//遮罩层
      memberWindow = document.getElementById("memberWindow");//新建作品
      memberWindowCloseButton = document.getElementById("memberWindowCloseButton");//关闭按钮
      addUser = document.getElementById("addUser");//添加按钮
      addName2List = document.getElementById("addName2List");//添加成员按钮
      delName2List = document.getElementById("delName2List");//删除按钮
      activeTargetLeft = document.querySelectorAll(".name-list-left span");//左侧名单列表集合
      activeTargetRight = document.querySelectorAll(".name-list-right span");//右侧名单所有的列表集合
      nameListLeft = document.getElementById("nameListLeft");//左侧名单
      nameListRight = document.getElementById("nameListRight");//左侧名单
      nameList = document.getElementById("nameList");
      confirm = document.getElementById("confirm"); // 名单确认
      searchName = document.getElementById("searchName");//搜索框
      nameListCloseButton = document.querySelector("#nameList header i");
      storage = window.localStorage;
  /* 判断浏览器访问次数 用户第一次进入进入初始化名单列表*/
  if(localStorage.pagecount){
    localStorage.pagecount=Number(localStorage.pagecount) +1;
  }else{
     localStorage.pagecount=1;
  }
  if (localStorage.pagecount == 1) {
    var List = ['吴克羣','霍建华','张张站','李连杰','王宝强','李明','吴老二','张三丰','周杰伦','王小二','斯琴高娃','李四'];
    var ListRight = [];
    storage.setItem("List",JSON.stringify(List));
    storage.setItem("ListRight",JSON.stringify(ListRight));
  }
  /* 将localStorage数据读入到Dom中 */
  read2List();
  read2ListRight();
  /* 更新Dom节点 */
  setSelected(activeTargetLeft,"active");
  setSelected(activeTargetRight,"active-right");
  // 事件绑定
  /* 新建作品 */
  createProject.addEventListener("click",function(){
    shader.style.display = "block";
    memberWindow.style.display = "block";
    updateAuthorBox();
    delEventer();
  })
  /* 新建作品窗口关闭 */
  memberWindowCloseButton.addEventListener("click",function(){
    shader.style.display = "none";
    memberWindow.style.display = "none";
  })
  /* 新建窗口增加按钮事件响应 */
  addUser.addEventListener("click",function(){
    nameList.style.display = "block";
    shader.style.zIndex = 3;
    clearDataFromListRight();
    updateToListRightFromLocalStorage();
    clearDataFromListLleft();
    updateToListLeftFromLocalStorage();
    setSelected(activeTargetLeft,"active");
    setSelected(activeTargetRight,"active-right");
  })
  /* 姓名列表增加 */
  addName2List.addEventListener("click",function(){
    if(document.getElementById("active")){
      var selectedNameLeft = document.getElementById("active");
      selectedNameLeft.className = "";
      selectedNameLeft.id = "";
      var cNode = selectedNameLeft.cloneNode(true);
      nameListRight.appendChild(cNode);
      nameListLeft.removeChild(selectedNameLeft);
      var activeTargetRight = document.querySelectorAll(".name-list-right span");
      setSelected(activeTargetRight,"active-right");
    }else{
      alert("请选中要添加的姓名");
    }
  })
  /* 姓名列表删除*/
  delName2List.addEventListener("click",function(){
    if(document.getElementById("active-right")){
      var selectedNameRight= document.getElementById("active-right");
      selectedNameRight.className = "";
      selectedNameRight.id = "";
      var cNode = selectedNameRight.cloneNode(true);
      nameListLeft.appendChild(cNode);
      nameListRight.removeChild(selectedNameRight);
      var activeTargetLeft = document.querySelectorAll(".name-list-left span");
      setSelected(activeTargetLeft,"active");
    }else{
      alert("请选中要删除的姓名");
    }
  })
  /* 确认按钮 */
  confirm.addEventListener("click",function(){
    updateLeftNameList();
    updateRightNameList()
    setSelected(activeTargetLeft,"active");
    setSelected(activeTargetRight,"active-right");
    updateAuthorBox();
    delEventer();
    nameList.style.display = "none";
    shader.style.zIndex = 2;
  })
  /* header 关闭按钮 */
  nameListCloseButton.addEventListener("click",function(){
    nameList.style.display = "none";
    shader.style.zIndex = 2;
  })
  /* 课程列表 */
  var oLi = document.querySelectorAll(".course ul li");
  [].forEach.call(oLi,function(e,x){
        e.onclick = function(){
            for (let i = 0;i < oLi.length;i++){
                oLi[i].className = '';
                oLi[i].id = '';
            }
        this.className = "selected";
        };
    });

    function handle(){
        var List = JSON.parse(localStorage.getItem("List"));
        var word = document.getElementById("searchName").value;
        var value = "";
        for(var i = 1;i < List.length;i++){
            if(word!="" && List[i].match(word+".*") != null){
              // 有问题
                value += "<span>" + List[i] + "</span>";
            }

        }
        document.getElementById('nameListLeft').innerHTML=value;
    }
    function add(city){
        document.getElementById("searchName").value=city;
    }
    //firefox下检测状态改变只能用oninput,且需要用addEventListener来注册事件。
    if(/msie/i.test(navigator.userAgent))    //ie浏览器
        {document.getElementById("searchName").onpropertychange=handle
    } else{//非ie浏览器，比如Firefox
        document.getElementById("searchName").addEventListener("input",handle,false);
    }

    $("#nameList").bind("mousedown",function call(){
      $("#addName2List").attr("class","add-button button-selected");
    });

}
