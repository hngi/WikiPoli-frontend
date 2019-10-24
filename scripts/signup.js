auth_token = "wikipoli_auth_token";

let data = 
{
	name: "Johnson",
	email: "jaycodist@sdt.com",
	password: "tester"
}
fetch("http://teamgandhi.000webhostapp.com/api/signup.php",
{
	method: 'POST',
	headers: 
	{
	  'Content-Type': 'application/json',
	  "origin": "wiki"
	},
	//body: JSON.stringify(data)
})
	.then(data => data.json()).then(json => console.log(json));
