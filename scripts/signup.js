auth_token = "wikipoli_auth_token";

let data = 
{
	email: "oladipoumar1@gmail.com",
	password: "Horlerdipo"
}
fetch("http://teamgandhi.000webhostapp.com/wikipoli-api/Api/login.php",
{
	method: 'POST',
	body: JSON.stringify(data)
})
	.then(data => data.json()).then(data => console.log(data));