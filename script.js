/******************* React JS *******************/
var LoginUI = React.createClass({
	login: function() {
		window.open("login.html", "_blank", "width=600,height=500");
	},

	render: function() {
		return (
			<table id="signin-box">
				<tr>
					<td>Please signin before use </td>
					<td><a onClick={this.login}>Signin with instagram</a></td>
				</tr>
			</table>
			)
	}
});

var SearchUI = React.createClass({
	getInitialState: function() {
		var hashtag = "";

		return { 
			hashtag: ''
			};
	},

	handleTagsChange: function(e) {
		this.setState({hashtag: e.target.value});
	},

	handleSubmit: function(e) {
		e.preventDefault();
		var hashtag = this.state.hashtag;
		if (!hashtag) {
		  return;
		}

		tracking(fullname + " find " + hashtag);

		$.ajax({
			url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
			dataType: 'jsonp',
			type: 'GET',
			data: {access_token: access_token},
			success: function(data){
				$("#instagram-result").html("");

				if(data && data.data.length > 0){
					$.each(data.data, function(i, tag){
						ig_img[i] = tag.images.thumbnail.url;
						ig_like[i] = tag.user_has_liked;
						ig_mediaId[i] = tag.id;
					});

					ReactDOM.render(
					  <IGList />,
					  document.getElementById('instagram-result')
					);
				} else {
					alert("data not found!");
				}	
			},
			error: function(data){
				console.log(data);
			}
		});
	},

	render: function() {
		return (
			<form className="tagsForm" onSubmit={this.handleSubmit}>
				<input id="hashtag" type="text" placeholder="key hashtag" onChange={this.handleTagsChange} />
				<input type="submit" value="Search" />
			</form>
			)
	}
});

var IGList  = React.createClass({
	actionPhoto: function(index){
		if(ig_like[index]){
			$.ajax({
				url: "https://api.instagram.com/v1/media/" + ig_mediaId[index] + "/likes?access_token=" + access_token + "&_method=delete",
				type: 'POST',
				success: function(data){
				},
				error: function(data){
					console.log(data);
				}
			});

			ig_like[index] = false;
			$("#" + ig_mediaId[index] + " a").html("Like");

			tracking(fullname + " unlike " + ig_img[i]);
		} else {
			$.ajax({
				url: "https://api.instagram.com/v1/media/" + ig_mediaId[index] + "/likes",
				type: 'POST',
				data: {access_token: access_token},
				success: function(data){
				},
				error: function(data){
					console.log(data);
				}
			});

			ig_like[index] = true;
			$("#" + ig_mediaId[index] + " a").html("Unlike");

			tracking(fullname + " like " + ig_img[i]);
		}
	},

	render: function() {
		var html = [];
		if(ig_img.length > 0){
			for(var i=0; i<ig_img.length; i++){
				if(ig_like[i]){
					html.push(
						<tr>
							<td width="150"><img src={ig_img[i]} width="150" /></td>
							<td id={ig_mediaId[i]}><a onClick={this.actionPhoto.bind(this, i)}>Unlike</a></td>
						</tr>
					);
				} else {
					html.push(
						<tr>
							<td width="150"><img src={ig_img[i]} width="150" /></td>
							<td id={ig_mediaId[i]}><a onClick={this.actionPhoto.bind(this, i)}>Like</a></td>
						</tr>
					);
				}
			}
		}
		return (
			<table>
			{html}
			</table>
 		);
	}
});

if (typeof(Storage) !== "undefined") {
	if(window.localStorage.getItem("IGCode") != null){
		usercode = window.localStorage.getItem("IGCode");
	}
	if(window.localStorage.getItem("IGToken") != null){
		access_token = window.localStorage.getItem("IGToken");
	}
	if(window.localStorage.getItem("IGFullname") != null){
		fullname = window.localStorage.getItem("IGFullname");
	}

	if(usercode != "" && access_token != "" && fullname != ""){


		ReactDOM.render(
		  <SearchUI />,
		  document.getElementById('hashtag-form')
		);
	} else {
		ReactDOM.render(
		  <LoginUI />,
		  document.getElementById('signin')
		);
	}
} else {
	ReactDOM.render(
	  <LoginUI />,
	  document.getElementById('signin')
	);
}