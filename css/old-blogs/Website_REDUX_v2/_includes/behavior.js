function date(id)
{ 
	date = new Date();
	year = date.getFullYear();
	month = date.getMonth();
	time = new Date();
	hr = time.getHours();
	min = time.getMinutes();
	sec = time.getSeconds();
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	d = date.getDate();
	day = date.getDay();
	days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
	ampm = " PM "
	if (hr < 12){
		ampm = " AM "
	}
	if (hr > 12){
		hr -= 12
	}
	if (hr < 10){
		hr = " " + hr
	}
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	res = '<a href="/archive" style="color:rgb(79,79,79)">' + months[month]+' '+d+', '+year+',</a> '+ hr + ":" + min + " "+ ampm;
	document.getElementById(id).innerHTML = res;
};