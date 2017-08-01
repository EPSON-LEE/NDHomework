class addSelected{
  constructor(){
    this.courseTitleSelection = $("#courseList > li");
  }
  initDom(){
    this.courseTitleSelection.bind("click",function(){
      $("#courseList > li").attr("class","");
      this.className = "selected";
    })
  }
}
var bar = new addSelected();
