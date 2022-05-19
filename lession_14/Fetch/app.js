var getAPI = 'https://jsonplaceholder.typicode.com/posts';
fetch(getAPI)
    .then(function(reponse){
        return reponse.json();
    })
    .then(function(posts){
        var htmls= posts.map(function(post){
            return `<li>
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </li>`
        })
        var html = htmls.join("");
        document.getElementById('block').innerHTML = html;
    })