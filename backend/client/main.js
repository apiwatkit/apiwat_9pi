IGAction = new Mongo.Collection('IGAction');

if(Meteor.isClient){

	Template.api.helpers({
		'actionList': function(){

			return IGAction.find({});
		}
	});

	if(getParameterByName("p") != null){
		IGAction.insert({record: getParameterByName("p")});
	}
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}