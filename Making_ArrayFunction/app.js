

// }

// var coureses = [
//     {
//         id: 1,
//         name: "Javascript",
//         coin: 0
//     },
//     {
//         id: 2,
//         name: "HTML, CSS",
//         coin: 0
//     },
//     {
//         id: 3,
//         name: "ReactJS",
//         coin: 0
//     },
//     {
//         id: 4,
//         name: "PHP",
//         coin: 0
//     },
//     {
//         id: 5,
//         name: "NodeJS",
//         coin: 200
//     },

//     {
//         id: 6,
//         name: "PHP",
//         coin: 200
//     },
    

// ]

//for(var i of coureses){
//    console.log(i)
//}


//coureses.forEach(function(course,index,array){
//    console.log(course,index,array)
//    console.log(typeof array)
//})


//let kq = coureses.every((course,index,array) => course.coin == 0 )
//console.log(kq);


// let kq = coureses.filter(function(course,index,array){
//     console.log(course.name);
//     return course.name == "PHP"
// })



// console.log(kq);

// Array.prototype.map2 = function(callback){
//     var arrayLength = this.length;
//     for(var i=0;i<arrayLength;i++){
//         callback(this[i]);
//     }
// }


// function myFunction(course){
//     console.log(course);
// }

// courses.map2(myFunction);

// var htmls = courses.map2(function(course){
//     console.log(course);
// })

// function myFunction(param){
//     param('Học lập trình');
// }

// function myCallBack(value){
//     console.log('Value:',value);
// }

// myFunction(myCallBack);
    




// courses.forEach(function(){})

// Array.prototype.map2 = function(param){
//     var output = [];
//     for(var i = 0;i<this.length;i++){
//         var result = param(this[i]);
//         output.push(result);
//     }
//     return output;
// }



// var html = courses.map2(function(course){
//     return `<h2>${course}</h2>`
// });

// console.log(html);

//  var coureses = [
//     {
//         id: 1,
//         name: "Javascript",
//         coin: 0
//     },
//     {
//         id: 2,
//         name: "HTML, CSS",
//         coin: 0
//     },
//     {
//         id: 3,
//         name: "ReactJS",
//         coin: 0
//     },
//     {
//         id: 4,
//         name: "PHP",
//         coin: 0
//     },
//     {
//         id: 5,
//         name: "NodeJS",
//         coin: 0
//     },

//     {
//         id: 6,
//         name: "PHP",
//         coin: 0
//     },
//  ]

 

 //var result = coureses.map2(function(course){
//
 //})S


//  var result = coureses.every(function(course){
//      return course.coin === 0;
//  })
//  console.log(result)



//  Array.prototype.every2 = function(param){
//     var result = true;
//     for(var i=0;i<this.length;i++){
//         var result = param(this[i]);
//         if(result === false)
//             break;
//     }
//     return result;
// }

// var result = coureses.every2(function(course){
//     return course.coin === 0;
// })

// console.log(result);

var courses = [
    'Javascript',
    'PHP',
    'Ruby'
]



 var coureses2 = [
    {
        id: 1,
        name: "Javascript",
        coin: 0
    },
    {
        id: 2,
        name: "HTML, CSS",
        coin: 10
    },
    {
        id: 3,
        name: "ReactJS",
        coin: 0
    },
    {
        id: 4,
        name: "PHP",
        coin: 0
    },
    {
        id: 5,
        name: "NodeJS",
        coin: 10
    },

    {
        id: 6,
        name: "PHP",
        coin: 20
    },
 ]


 var topic = [
     {
         topic: "Font-end",
         courses:[
             {
                 title: "HTML-CSS",
                 id: 1
             },
             {
                 title: "Javascript",
                 id: 2
             }
         ]
     },
     {
         topic: "Back-end",
         courses: [
             {
                 title: "PHP",
                 id: 3
             },
             {
                 title: "NodeJS",
                 id: 4
             }
         ]
     }
 ]

 
 var newCourses = topic.reduce((coureses,topic) => coureses.concat(topic.courses)
 ,[])

 var htmls = newCourses.map(function(course){
     return `
        <div>
            <h2>${course.title}</h2>
        </div>
     `
 })

 //console.log(newCourses)
 console.log(htmls.join(''))




// Array.prototype.reduce2 = function(callback,initialValue){
//     var result = 0;
//     for(var index in this){
//         if(this.hasOwnProperty(index)){
//             var result = initialValue;
//             result = callback(result,this[index])
          
//             initialValue = result  
//         }

//     }
//     return result
// }
  
// var result = coureses2.reduce2(function(accumulator,currentValue){
//     return accumulator + currentValue.coin;
// },0)
// console.log(result)


// var result = coureses2.reduce(function(accumulator,currentValue){
//     return accumulator + currentValue.coin;
// },0)

// console.log(result)



//  Array.prototype.map2 = function(callback){
//      var arr = [];
//     for(var index in this){
//         if(this.hasOwnProperty(index)){
//             arr.push(callback(this[index]))
//         }
//     }
//      return arr;
//  }

//  var result = coureses2.map2(function(course){
//     return {
//         id: course.id,
//         name: `Khóa học: ${course.name}`,
//         coinText: `Gia: ${course.coin}`
//     }
//  })

//  console.log(result)

//  var newCourses = coureses2.map(function(course){
//     return {
//         id: course.id,
//         name: `Khóa học: ${course.name}`,
//         coin: course.coin,
//         coinText: `Giá: ${course.coin}`
//     }
//  })

//  console.log(newCourses)

// Array.prototype.some2 = function(callback){
//     var result = false;
//     for(var index in this){
//         if(this.hasOwnProperty(index)){
//             var temp = callback(this[index])
//             if(temp == true)
//                 return temp;
//         }
//     }
//     return result;
// }


// var result = coureses2.some(function(course){
//     return course.coin == 1;
// })

// console.log(result)




// var result = coureses2.some(function(course){
//      return course.coin == 100
//  })

//  console.log(result);



//var result = coureses2.filter(function(course){
//    return course.coin === 0
// })

// console.log(result)

//  Array.prototype.filter2 = function(callback){
//     var arrResult = [];
//     for(var index in this){
//         if(this.hasOwnProperty){
//             if(callback(this[index],index,this)==true){
//                 arrResult.push(this[index])
//             }
//         }
//     }
//     return arrResult
//  }

//  var result = coureses2.filter2(function(course,index,arr){
//     return course.coin > 0;
//  })
// console.log(result);


// Array.prototype.forEach2 = function(callback){
//     for(var index in this){
//         if(this.hasOwnProperty(index)){
//             callback(this[index],index,this);
//         }
//     }
// }


// courses.forEach2(function(course,index,arr){
//     console.log(course,index,arr)
// })


// Array.prototype.map2 = function(param){
//     var result = [];

//     for(var i =0;i<this.length;i++){
//         var elem = param(this[i]);
//         result.push(elem);
//     }
//     return result;
// }

// var html = courses.map2(function(course){
//     return `<h1>${course}</h2>`
// })

// document.getElementById("a").innerHTML = html.join('</br>');

