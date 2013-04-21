var course, chat;
exports.setChat = function(c, ch){
  Ti.API.debug('Incoming chat data: ' + JSON.stringify(c) + ': ' + ch);
  course = c;
  chat = c.get('chats')[ch];
  Ti.API.debug('Course ' + course.get('title') 
							 + ' chat: ' + chat['title']); 
	$.mainContainer.title = chat.title;
	$.chat_topic.text = chat.content;
	updateView();
};

var updateView = function(){
	var count = $.comment_section.rowCount;
	for(var i = 0; i < count; i++){
		$.comment_table.deleteRow(0);
	}
	for(var i = 0; i < chat['comments'].length; i++){
	  var text = chat['comments'][i],
				label = Ti.UI.createLabel({
					text: text['content'],
					textAlign: 'left',
					font: {fontSize: '14dp'},
					left:5
				}),
				row = Ti.UI.createTableViewRow({
					height: '43',
				});
				if(!text['content'])continue;
				row.add(label);
				row.info = text;
		$.comment_table.appendRow(row);
	}
};
/*
$.comment_button.addEventListener('click', function(e){
	//TODO Check for user signed in
	var text = $.comment_text.value,
			time = new Date(),
			comment = {
				'content': text,
				'time': time.toString(),
				'user': {
					id: Alloy.Models.user.get('id'),
					firstname: Alloy.Models.user.get('firstname'),
					lastname: Alloy.Models.user.get('lastname')
				}
			};
	//TODO Validate text entered
	chat['comments'].push(comment);
	Ti.API.debug('Adding comment: ' + text);
	Ti.API.debug(JSON.stringify(course));
	//This is where you save the course
	course.save();
	updateView();
});
*/
var tf = Ti.UI.createTextField({
	width: '100%',
	height: 32,
	width: 200,
	backgroundColor:'white',
	font:{fontSize: 13},
	borderRadius: 4,
	borderWidth: 1,
	borderColor: '#000',
	paddingLeft: 10
});

var cButton = Ti.UI.createButton({
	title: 'Submit',
	width: 80,
	height: 32,
});

cButton.addEventListener('click', function(){
  var text = tf.value;
	tf.value = '';
	Ti.API.debug('Adding text: ' + text);
	//TODO Validate user signed in
	if(!text){
		alert('No input');
		return;
	}
	var time = new Date(),
			comment = {
				'content': text,
				'time': time.toString(),
				'user': {
					id: Alloy.Models.user.get('id'),
					firstname: Alloy.Models.user.get('firstname'),
					lastname: Alloy.Models.user.get('lastname')
				}
			};
	//TODO Validate text entered
	chat['comments'].push(comment);
	Ti.API.debug('Adding comment: ' + text);
	Ti.API.debug(JSON.stringify(course));
	//This is where you save the course
	course.save();
	updateView();
});

var textField = Ti.UI.createTextField({
	color:'#336699',
	value:'Answer Question',
	height:35,
	width:300,
	bottom: 5,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	keyboardToolbar:[tf, cButton],
	keyboardToolbarColor: '#999',	
	keyboardToolbarHeight: 40
});

$.mainContainer.add(textField);

$.mainContainer.addEventListener('focus', function(e){
	Ti.API.debug('Switched to chat view');
});
