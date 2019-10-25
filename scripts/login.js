// document.getElementById("submitter").addEventListener("click", e =>
// {
// 	e.preventDefault();
// 	const email = document.getElementById("email").value;
// 	const password = document.getElementById("password").value;
// 	if (email.length && password.length && email.includes("@"))
// 		e.preventDefault();

// 	if (email === "admin@gmail.com" && password === "123123")
// 		location.href = "admin-dashboard-general.html";
// 	else
// 		alert("Bad password!")
// });


const api = "http://teamgandhi.000webhostapp.com/api";

document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.querySelector("#inputEmail").value;
  const password = document.querySelector("#inputPassword").value;

 
  var form = new FormData();
form.append("email", email);
form.append("password", password);

var settings = {
  "url": `${api}/login.php`,
  "method": "POST",
  "timeout": 0,
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
  "data": form
};

$.ajax(settings).done(function (response) {
	console.log( JSON.parse( response ) );
	const objResponse = ( JSON.parse( response ) )
	if(objResponse.res === "Incorrect credential") {
		alert("Wrong username or password!!")
	} else if(objResponse.res === "Login Successful" && objResponse.status === 200) {

		console.log( 'yeah' )
		
			sessionStorage.setItem( "wikiToken", objResponse.token )
			sessionStorage.setItem( "userEmail", email )
			setTimeout(() => {
				location.href = "dashboard-activity.html";
			}, 2000);
		
	} 
});
 
});

