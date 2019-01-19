function validation () {
	var username = document.loginform.username.value;
	var password = document.loginform.password.value;
	if (username == "") {
		alert("Please input username!");
		return false;
	}
	if (password == "") {
		alert("Please input password!");
		return false;
	}
	window.open("StudentProfile.html");
}