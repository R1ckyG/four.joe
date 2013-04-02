var course, chat;
exports.setChat = function(c, ch){
  Ti.API.debug('Incoming chat data: ' + JSON.stringify(c) + ': ' + ch);
  course = c;
  chat = c.get('chats')[ch];
  Ti.API.debug('Course ' + course.get('title') 
							 + ' chat: ' + chat['title']); 
	$.mainContainer.title = chat.title;
	$.chat_topic.text = chat.content;
};

var updateView = function(){
	var count = $.comment_section.rowCount;
	for(var i = 0; i < count; i++){
		$.comment_table.deleteRow(0);
	}
	for(var i = 0; i < chat['comments'].length; i++){
	  var text = chat['comments'][i],
				label = Ti.UI.createLabel({
					text: text['text'],
					textAlign: 'left',
					font: {fontSize: '14dp'},
					left:5
				}),
				row = Ti.UI.createTableViewRow({
					height: '43',
				});
				row.add(label);
				row.info = text;
		$.comment_table.appendRow(row);
	}
};

$.comment_button.addEventListener('click', function(e){
	//TODO Check for user signed in
	var text = $.comment_text.value,
			time = new Date(),
			comment = {
				'text': text,
				'created': time.toString()
			};
	//TODO Validate text entered
	chat['comments'].push(comment);
	Ti.API.debug('Adding comment: ' + text);
	Ti.API.debug(JSON.stringify(course));
	//This is where you save the course
	course.save();
	updateView();
});

$.mainContainer.addEventListener('focus', function(e){
	Ti.API.debug('Switched to chat view');
});
