
let objCount = 0;
a.result = [];
for(let index in a){
  if(typeof(a[index] == 'object')){
    objCount++;
    a.result.push(objCount);
  }
}
