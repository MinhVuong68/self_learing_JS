

var courseApi = 'http://localhost:3000/courses';

function start(){
    getCourses(renderCourses);
    
    handleCreateform();

}

start();

//Functions
function getCourses(callback){
    fetch(courseApi)
        .then(function(repose){
            return repose.json();
        })
        .then(callback);
}

function createCourses(data,callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function(reponse){
            reponse.json();
        })
        .then(callback)
    }

function renderCourses(courses){
    var listCoursesBlock = document.querySelector('#list-courses');
    var html = courses.map(function(course){
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <button onclick="handleDeleteCourse(${course.id})">Xoa</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = html.join("");
}

function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
       
    }
    fetch(courseApi+'/'+id, options)
        .then(function(reponse){
            reponse.json();
        })
    
        .then(function(){
            //console.log("name")
            var courseItem = document.querySelector('.course-item-'+id);
            if(courseItem)
                courseItem.remove();
        })
}

function handleCreateform(){
    var createBtn = document.querySelector('#create');
   
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var formData = {
            name: name
        }
        createCourses(formData,function(){
            getCourses(renderCourses);
        })
        
    }
}