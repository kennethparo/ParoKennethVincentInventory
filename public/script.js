window.onload = function() {
	var sessionid = "";
	document.getElementById("login").onclick = function() {
		let un = document.getElementById('username').value;
		let pw = document.getElementById('password').value;
		let rq = new XMLHttpRequest();
		rq.onreadystatechange = function() {
			if(rq.readyState == 4) {
				sessionid = rq.responseText;
				let sid = document.getElementById('sid');
				sid.innerHTML = "Session ID: " + sessionid;
			}
		}
		rq.open("GET", "/login?username="+un+"&password="+pw, true);
		rq.send();
	};
	//		------ log out -----
	// document.getElementById("logout").onclick = function() {
	// 	let rq = new XMLHttpRequest();
	// 	rq.onreadystatechange = function() {
	// 		if(rq.readyState == 4) {
	// 			sessionid = "";
	// 			document.getElementById('sid').innerHTML = "Session ID:";
	// 		}
	// 	}
	// 	rq.open("GET", "/logout?id="+sessionid, true);
	// 	rq.send();
	// };
	//		------ for registration ------
	// let assets = document.getElementById("assets");
	// assets.onclick = function() {
	// 	let rq = new XMLHttpRequest();
	// 	rq.onreadystatechange = function() {
	// 		if(rq.readyState == 4) {
	// 			let container =  document.getElementById('container');
	// 			container.innerHTML = "";
	// 			container.innerHTML = rq.responseText;
	// 		}
	// 	}
	// 	rq.open("GET", "/assets?id="+sessionid, true);
	// 	rq.send();
	// };
	// document.getElementById("addasset").onclick = function() {
	// 	let rq = new XMLHttpRequest();
	// 	rq.onreadystatechange = function() {
	// 		if(rq.readyState == 4) {
	// 			alert(rq.responseText);
	// 		}
	// 	}
	// 	rq.open("POST", "/assets?id="+sessionid, true);
	// 	rq.setRequestHeader("Content-Type", "application/json");
	// 	rq.send(JSON.stringify({
	// 		name : document.getElementById('name').value,
	// 		price : document.getElementById('price').value,
	// 		location : document.getElementById('loc').value,
	// 		assignedto : document.getElementById('assignee').value,
	// 		type : document.getElementById('type').value
	// 	}));
	// }
}
