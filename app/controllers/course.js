var course,
		course_id,
    addChat = Alloy.createController('addchat');

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

var updateDataTable = function(selectedCourse){
  var numOfRows = $.topic_section.rowCount;
  Ti.API.debug('Topics: '+ numOfRows);
  for(var i = 0; i < numOfRows; i++){
    $.topic_list.deleteRow(0);
  }
  for(var i = 0; i < selectedCourse.get('questions').length; i++){
   var question = selectedCourse.get('questions')[i],
       label = Ti.UI.createLabel({
         text: question['title'], 
         font: {fontSize: '28dp'}
       }),
       row = Ti.UI.createTableViewRow({
         height: '43'
       });
    row.add(label);
    row.addEventListener('click', function(e){

    });
    $.topic_list.appendRow(row);
  }
  for(var i = 0; i < selectedCourse.get('chats').length; i++){
   var chat = selectedCourse.get('chats')[i],
       label = Ti.UI.createLabel({
         text: chat['title'], 
         font: {fontSize: '28dp'}
       }),
       row = Ti.UI.createTableViewRow({
         height: '43'
       });
    row.add(label);
    row.addEventListener('click', function(e){

    });
    $.topic_list.appendRow(row);
  }
  $.topic_list.appendRow(addClassRow);
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

