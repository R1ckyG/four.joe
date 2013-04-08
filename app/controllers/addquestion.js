var course;

exports.setCourse = function(c){
	course = c;
	Ti.API.debug('Setting course to ' + course.get('title'));
};

var submitQuestion = function(e){
	Ti.API.debug('adding question ' + $.question_title_text.value + ' Question: ' + $.question_content_text.value);
	var questions = course.get('questions'),
			created = new Date(),
			title = $.question_title_text.value,
			content = $.question_content_text.value;
	
	if(!title || !content){
		alert('Missing Input!1!1!');
		return;
	}
	var question = {
		title: title,
		text: content,
		time: created,
		user:{
			id: Alloy.Models.user.get('id'),
			firstname: Alloy.Models.user.get('firstname'),
			lastname: Alloy.Models.user.get('lastname')
		}
	};
	questions.push(question);
	course.save({'questions':questions});
}
