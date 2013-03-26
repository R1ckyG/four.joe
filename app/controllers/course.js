var course,
    addChat = Alloy.createController('addchat');

exports.setClass = function(selectedCourse){
	course = selectedCourse;
  $.mainContainer.title = course.get('title');
	Ti.API.debug('Course name ' + selectedCourse.get('title'))
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
         text: question.get('title'), 
         font: {fontSize: '28dp'}
       }),
       row = Ti.UI.createTableViewRow({
         height: '43'
       });
    row.add(label);
    row.addEventListenerr('click', function(e){

    });
    $.topic_list.appendRow(row);
  }
  for(var i = 0; i < selectedCourse.get('chats').length; i++){
   var chat = selectedCourse.get('chats')[i],
       label = Ti.UI.createLabel({
         text: chat.get('title'), 
         font: {fontSize: '28dp'}
       }),
       row = Ti.UI.createTableViewRow({
         height: '43'
       });
    row.add(label);
    row.addEventListenerr('click', function(e){

    });
    $.topic_list.appendRow(row);
  }
  $.topic_list.appendRow(addClassRow);
};

$.mainContainer.addEventListener('focus', function(e) {
  Ti.API.debug('On focus');
  updateDataTable(course);
  $.mainContainer.title = course.get('title');
});

