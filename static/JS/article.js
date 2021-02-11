let fetch_config = {
    method:"GET",
    headers: 
   
  {
      "Content-Type": "application/json", 
      "Authorization": "Bearer tokenValue"
  }
  }
  
  fetch("https://simplonews.brianboudrioux.fr/users",fetch_config)
.then(function(response) {
  
  
  
  if (response.status == 400){
      document.location.href = '../views/login'
  
    } 
   else{
      response.json()
      .then(function(data){
        let token = data.token;
       sessionStorage.getItem('token',token);
      }
      )}
    console.log(response)
    })