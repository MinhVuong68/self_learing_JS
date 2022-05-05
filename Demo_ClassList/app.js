var boxElement = document.querySelector('.box');

// add
setTimeout(()=>{
    boxElement.classList.add('red');
},3000)

setInterval(()=>{
    boxElement.classList.toggle('red')
},1000)