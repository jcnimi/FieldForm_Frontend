var btn_submit = document.getElementById("btnsubmit");
btn_submit.addEventListener("click", function(e) {
  e.preventDefault();
  var v_password = document.getElementById("password").value;
  var v_userName = document.getElementById("username").value;
  var obj = {
    username: v_userName,
    password: v_password
  };

  fetch("https://cdwebapsvr.fincadrc.com:8002/users/login2", {
    method: "POST",
    body: JSON.stringify(obj),
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
  })
    .then(response => response.json())
    .then(result => {
        console.log( JSON.stringify(result))
     
        if(result !== null && result.status === 'success'){
            let userId = result.data.user_id;
            let fullname = result.data.fullname;
            let branch = result.data.branch_name;
            let group = result.data.user_group;
            //set session info
            sessionStorage.setItem("sessionid", "xxx"); // will change it to jwt token 
            //sessionStorage.setItem("group", JSON.stringify(result.data.user_group));
            window.location.replace(`loan-request.htm?userid=${userId}&name=${fullname}&branch=${branch}&group=${group}`);
        }
    }).catch(error => {
        // handle the error
        console.log(error)
    })
    ;

});
