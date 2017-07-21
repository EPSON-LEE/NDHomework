/* 添加栏右侧设置选中 */
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

function read2ListRight(){
  ListRight = JSON.parse(localStorage.getItem('ListRight'));
  var nameListNode = document.getElementById("nameListRight")
  for(var i = 0; i < ListRight.length; i++){
    var CNode = nameListNode.firstElementChild.cloneNode(true);
    CNode.innerHTML = ListRight[i];
    CNode.style.display = "block";
    nameListNode.appendChild(CNode);
  }
  var activeTargetRight = document.querySelectorAll(".name-list-right span");
      setSelected(activeTargetRight,"active-right");
}
/* 左侧数据写入浏览器 */
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
/* 右侧数据写入浏览器 */
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
/* 更新新建作品栏目窗口 */
function updateAuthorBox(){
  var authorColumn = document.getElementById("authorBox");
  ListRight = JSON.parse(localStorage.getItem('ListRight'));
  var authorBoxNum = document.querySelectorAll(".author-box span");
  for(var j = 0; j < authorBoxNum.length; j++){
    if(j != 0){
        authorColumn.removeChild(authorBoxNum[j]);
    }
  }
  authorBoxNum[0].style.display = "none";
  for(var i = 0; i<ListRight.length; i++){
    if(i == 0){
      authorColumn.firstElementChild.style.display= "inline-block";
      authorColumn.firstElementChild.class = "del";
    }else{
      var newNode = authorColumn.firstElementChild.cloneNode(true);
      newNode.style.display= "inline-block";
      newNode.lastElementChild.class = "del";
      authorColumn.appendChild(newNode);
    }
    authorColumn.firstElementChild.firstElementChild.innerHTML = ListRight[i];
  }
  setSelected(activeTargetLeft,"active");
  setSelected(activeTargetRight,"active-right");
}

window.onload = function(){
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
  /* 将数据读入到Dom中 */
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
    // updateAuthorBox();
  })
  /* 新建作品窗口关闭 */
  memberWindowCloseButton.addEventListener("click",function(){
    shader.style.display = "none";
    memberWindow.style.display = "none";
  })
  /* 新建窗口增加按钮事件响应 */
  addUser.addEventListener("click",function(){
    nameList.style.display = "block";
    shader.style.zIndex = 3 ;
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
    nameList.style.display = "none";
    shader.style.zIndex = 2;
    // 更新 新建窗口节点
  })
}
