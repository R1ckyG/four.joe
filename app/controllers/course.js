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
  font:{fontsize:'28dp'},
  text:'Add Chat',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  width:'auto', height:'auto',
	left:'3%'
});
var addClassRow = Ti.UI.createTableViewRow({
  className:'add_class',
  touchEnabled: true,
	height: 43
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
  font:{fontsize:'28dp'},
  text:'Add Question',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  width:'auto', height:'auto',
	left:'3%'
});
var addQuestRow = Ti.UI.createTableViewRow({
  className:'add_class',
  touchEnabled: true,
	height: '43'
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
       aView = Ti.UI.createView({layout:'horizontal'}),
			 icon = Ti.UI.createLabel({
				 text: 'Q:',
				 font:{
				 	 fontSize: '28dp',
				 	 fontFamily: 'Helvetica',
					 fontWeight: 'bold',
				 	 fontStyle: 'italic'
				 },
				 left: 5,
    	   color: '#3299BB'
			 }),
			 label = Ti.UI.createLabel({
         text: question['title'], 
         font: {fontSize: '24dp'},
         textAlign: 'left',
         left: 5
       }),
       row = Ti.UI.createTableViewRow({
         height: '43',
         className: 'questRow',
       	 title: question['title'],
				 color:'white',
			 	 font:{fontSize:'0dp'}
			 });
		aView.add(icon);
		aView.add(label);
    row.add(aView);
    row.id = i;
    $.topic_list.appendRow(row);
  }
  for(var i = 0; i < selectedCourse.get('chats').length; i++){
   var chat = selectedCourse.get('chats')[i],
       label = Ti.UI.createLabel({
         text: chat['title'], 
         font: {fontSize: '24dp'},
         textAlign: 'left',
         left: 5
       }),
       row = Ti.UI.createTableViewRow({
         height: '43',
         title: chat['title'], 
				 className: 'chatRow',
       	 backgroundGradient:{
				 	 startPoint: { x: '50%', y: '0%' },
					 endPoint: { x: '50%', y: '100%' },
					 colors: ['#889294','#C4C4C4']
				 },
			   font:{fontSize:'0dp'},
			 	 color: '#889294'
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

