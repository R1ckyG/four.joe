var course;

exports.setCourse = function(c){
	course = c;
	Ti.API.debug('Setting course to ' + course.get('title'));
}

var submitQuestion = function(e){
  Ti.API.debug('adding question ' + $.chat_title_text.value + ' Question: ' + $.chat_content_text.value);
	var chats = course.get('chats'),
			birth = new Date(),
			chat = {
				title: $.chat_title_text.value,
				content: $.chat_content_text.value,
				user: Alloy.Models.user.get('firstname'),
				comments: [],
				created: birth.toString()
			};
	chats.push(chat);
	//course.save({'chats':chats});
}

