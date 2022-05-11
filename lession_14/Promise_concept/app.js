// var promise = new Promise() --> define object constructor


var promise = new Promise(
    //Executor
  function(resole,reject) {
    //Logic
    //Thành công: resole()
    resole([
        {
            id:1,
            name: "java"
        }
    ]);
    //Thất bại: reject()
    //reject();
  }
);

//Xử lí thao tác bất đồng bộ
// Khắc phục call back hell


promise
  .then(function(courses){
    console.log(courses)
  })    
  .catch(function(){
console.log("fail!")
  })
  .finally(function(){
console.log("done!")
  });