import { fetchData } from "./comonlib.js";
var btn_submit = document.getElementById("btnsubmit");
btn_submit.addEventListener("click", async function(e) {
  e.preventDefault();
  var v_password = document.getElementById("password").value;
  var v_userName = document.getElementById("username").value;
  var obj = {
    username: v_userName,
    password: v_password
  };

  try {
    const url = `/users/login2`;
    const result = await fetchData(url, 'POST');
    if(result !== null && result.status === 'success'){
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
    }
  } catch(error) {
    // handle the error
    console.log(error)
  }
});
