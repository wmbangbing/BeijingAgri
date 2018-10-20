//将对象数组去重，重构为对象{pro1：[hash], pro02: [hash]}
export function unique(objArr) {

  var result = {};

  var proObj = objArr[0];
  for(var pro in proObj){
    var hash = []; 
    for(var i = 0; i < objArr.length; i++){
      var obj = objArr[i];
      for(var pros in obj){
        if(pros === pro){
          var val = obj[pros];
          if(!hash[val]){
            var valueObj = {};
            valueObj.lable = val;
            valueObj.value = val;
            hash.push(valueObj);
            hash[val] = true;
          }
        }
      }
    }
    result[pro] = hash;
  }
  return result;
}

export function ArrayToObj(objArr){
  var result = {};

  var proObj = objArr[0];
  for(var pro in proObj){
    var hash = []; 
    for(var i = 0; i < objArr.length; i++){
      var obj = objArr[i];
      for(var pros in obj){
        if(pros === pro){
          var val = obj[pros];
          hash.push(val);
        }
      }
    }
    result[pro] = hash;
  }
  return result;
}