var weburl = "https://localhost/apiwat_9pi/";
var client_id = "7c27de9ecf8f448e93dd5df72b76137c";
var usercode = "";
var access_token = "";
var fullname = "";
var ig_img = [];
var ig_like = [];
var ig_mediaId = [];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function tracking(action){
	$.ajax({
		url: "https://localhost:3000/",
		dataType: 'jsonp',
		type: 'POST',
		data: {
			p: new Date() + " " + action
		},
		success: function(data){
		},
		error: function(data){
			console.log(data);
		}
	});
}