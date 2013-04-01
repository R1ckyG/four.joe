var course, chat;
exports.setChat = function(c, ch){
  Ti.API.debug('Incoming chat data: ' + JSON.stringify(c) + ': ' + ch);
  course = c;
  chat = c.get('chats')[ch];
  Ti.API.debug('Course ' + course.get('title') + ' chat: ' + chat['title']); 
	$.mainContainer.title = chat.title;
	$.chat_topic.text = chat.content;
}

$.mainContainer.addEventListener('focus', function(e){
	Ti.API.debug('Switched to chat view');
});
