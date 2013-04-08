var course,
		course_id,
    addChat = Alloy.createController('addchat'),
		addQuestion = Alloy.createController('addquestion'),
    chat_controller = Alloy.createController('chat'),
		question_controller = Alloy.createController('question');

exports.setClass = function(selectedCourse){
	course = selectedCourse;
  $.mainContainer.title = course.get('title');
	Ti.API.debug('Course name ' + selectedCourse.get('id'));
	course_id = selectedCourse.get('id');
};

var addClassLabel =  Ti.UI.createLabel({
  color:'#900',
  font:{fontsize:24},
  text:'Add a chat/question',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  width:'auto', height:'auto',
});
var addClassRow = Ti.UI.createTableViewRow({
  className:'add_class',
  touchEnabled: true,
});
addClassRow.add(addClassLabel);
addClassRow.addEventListener('click', function(){
  //alert('this is working!!!');
  addChat.setCourse(course);
	var view = addChat.getView();
  Alloy.CFG.nav.open(view);  
});

var addQuestLabel =  Ti.UI.createLabel({
  color:'#900',
  font:{fontsize:24},
  text:'Add question',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  width:'auto', height:'auto',
});
var addQuestRow = Ti.UI.createTableViewRow({
  className:'add_class',
  touchEnabled: true,
});
addQuestRow.add(addQuestLabel);
addQuestRow.addEventListener('click', function(){
  //alert('this is working!!!');
  addQuestion.setCourse(course);
	var view = addQuestion.getView();
  Alloy.CFG.nav.open(view);  
});

var updateDataTable = function(selectedCourse){
  var numOfRows = $.topic_section.rowCount;
  Ti.API.debug('Topics: '+ numOfRows);
  for(var i = 0; i < numOfRows; i++){
    $.topic_list.deleteRow(0);
  }
  $.topic_list.addEventListener('click', function(e){
      if(e.rowData.className === 'chatRow'){
			  chat_controller.setChat(course, e.rowData.id);
        var view = chat_controller.getView();
        Alloy.CFG.nav.open(view); 
  		}else if(e.rowData.className === 'questRow'){
				question_controller.setQuestion(course, e.rowData.id);
				var view = question_controller.getView();
				Alloy.CFG.nav.open(view);
			}	
	});

	for(var i = 0; i < selectedCourse.get('questions').length; i++){
   var question = selectedCourse.get('questions')[i],
       label = Ti.UI.createLabel({
         text: question['title'], 
         font: {fontSize: '28dp'},
         textAlign: 'left',
         left: 5
       }),
       row = Ti.UI.createTableViewRow({
         height: '43',
         className: 'questRow'
       });
    row.add(label);
    row.id = i;
    $.topic_list.appendRow(row);
  }
  for(var i = 0; i < selectedCourse.get('chats').length; i++){
   var chat = selectedCourse.get('chats')[i],
       label = Ti.UI.createLabel({
         text: chat['title'], 
         font: {fontSize: '28dp'},
         textAlign: 'left',
         left: 5
       }),
       row = Ti.UI.createTableViewRow({
         height: '43',
         className: 'chatRow'
       });
    row.add(label);
    row.id = i;
    $.topic_list.appendRow(row);
  }
  $.topic_list.appendRow(addClassRow);
	$.topic_list.appendRow(addQuestRow);
};

$.mainContainer.addEventListener('focus', function(e) {
  Ti.API.debug('On focus' + JSON.stringify(course)+ course.get('title'));
  course = Alloy.Collections.courses.get(course_id);
	try{
    updateDataTable(course);
  }catch(e){
    Ti.API.error(e);
  }
  $.mainContainer.title = course.get('title');
});

