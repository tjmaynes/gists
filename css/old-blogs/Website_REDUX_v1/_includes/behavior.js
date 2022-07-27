function theme()
{
	//test for Internet Explorer 6.x
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
	{
		var ieversion = new Number(RegExp.$1);
		if (ieversion <= 8)
		{
			/*redirect to /IE/error.html*/
			window.location = "http://www.tjmaynes.com/ie.html";
		}
		else
		{
			var image_array = ["1", "2", "3", "4", "5", "6", "7", "9", "10"];
			var random_number = Math.floor(Math.random()*image_array.length); 
			var image_random = image_array[random_number];
			var image = "/images/" + image_random + ".png";
			document.getElementById('front-image').setAttribute('src', image);
		}
	}
	else
	{
		var image_array = ["1", "2", "3", "4", "5", "6", "7", "9", "10"];
		var random_number = Math.floor(Math.random()*image_array.length); 
		var image_random = image_array[random_number];
		var image = "/images/" + image_random + ".png";
		document.getElementById('front-image').setAttribute('src', image);
	}
};