let token = sessionStorage.getItem('token');
let articleId = sessionStorage.getItem('id');
let content = document.getElementById('content')
//let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjpudWxsLCJsYXN0TmFtZSI6bnVsbCwiZW1haWwiOiJ0ZXN0QHRlc3QuZnIiLCJwYXNzd29yZCI6IiQyYiQxMCRyWGt5d05oZm9CVlM0ZVp1RThsQ2JlZlpNRi53YzgzZ3g5Ry9oWldpYkpCTy9Xc3kzY2NnZSIsImF2YXRhciI6bnVsbCwidGhlbWUiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjEtMDItMDdUMDE6MTE6MTQuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDItMDdUMDE6MTE6MTQuMDAwWiIsImlhdCI6MTYxMzEyOTU4MX0.1rE8GBoyeWuQ-OnoeKjfFsLLi6h_lUG_0FvN2vh0Crw";
//let articleId = 2;


let fetch_config = {
    method:"GET",
    headers: 
   
  {
      "Content-Type": "application/json", 
      "Authorization": "Bearer " + token
  }
  }
  
  fetch(`https://simplonews.brianboudrioux.fr/articles/${articleId}`,fetch_config)


 .then(function(response) {

 if (response.status == 400){
    document.location.href = '../views/home'
}
 else if(response.status == 403){
      document.location.href = '../login'
    }
    else{
      response.json()
      .then(function (data){
        kitty(data)
      })
      .catch(function(error){
        console.log(error)
      })
    
    }
})

.catch(function(error){
console.log(error)

})





 function kitty(data) {
 

  content.innerHTML = 

`<h2 id="title"> ${data.article.title}</h2>
<p id="resume"> 
          ${data.article.resume}
</p>
<img id="img" src='${data.article.img}'>
<p   id="content">
      ${data.article.content}
</p>
<h4 id="author">Auteur: ${data.article.author}</h4>`

}
