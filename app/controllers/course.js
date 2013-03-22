var course;

exports.setClass = function(selectedCourse){
	course = selectedCourse;
  //updateDataTable(course);
	Ti.API.debug('Course name ' + selectedCourse.get('title'))
};

var updateDataTable = function(selectedCourse){
  var numOfRows = $.topic_section.rowCount;
  Ti.API.debug('Topics: '+ numOfRows);
  for(var i = 0; i < numOfRows; i++){
    $.topic_list.deleteRow(0);
  }
};

$.mainContainer.addEventListener('focus', function(e) {
  Ti.API.debug('On focus');
  updateDataTable(course);
});

