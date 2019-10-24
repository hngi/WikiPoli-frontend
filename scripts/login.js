document.getElementById("submitter").addEventListener("click", e =>
{
	e.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	if (email.length && password.length && email.includes("@"))
		e.preventDefault();

	if (email === "admin@gmail.com" && password === "123123")
		location.href = "admin-dashboard-general.html";
	else
		alert("Bad password!")
});