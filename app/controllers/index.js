var settings = Alloy.createController('settings'),
		stats = Alloy.createController('signup'),
		courses = Alloy.createController('course'),
    addclass = Alloy.createController('addclass'),
    user = Alloy.Models.user,
    updateFuncIndex = -1;

//$.course.fetch(options);
function doClick(e) {  
    alert($.label.text);
}

function openSettings(e){
	var view = settings.getView();
	$.nav.open(view);
}

function openStats(e){
	var view = stats.getView();
	$.nav.open(view);
}

function debugClick(e){
  Ti.API.debug('Debug Info');
  Ti.API.debug('Old user: ' + JSON.stringify(user));
  user = Alloy.Models.user;
  Ti.API.debug('New user: ' + JSON.stringify(user));
  Ti.API.debug('Courses: ' + JSON.stringify(Alloy.Collections.courses));
}

function openClass(e){
	var view = courses.getView();
	if(e.row.className == 'add_class')return;
	Ti.API.debug(JSON.stringify(Alloy.Models.user.get('courses')) + ' index : ' + e.rowData.id);
	courses.setClass(Alloy.Models.user.get('courses')[e.index]);
	$.nav.open(view);
}

$.index.open();
$.index.addEventListener('close', function() {
    $.destroy();
});

var addClassLabel =  Ti.UI.createLabel({
  color:'#900',
  font:{fontsize:24},
  text:'Add a class',
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
  var view = addclass.getView();
  $.nav.open(view);  
});
//Ti.API.debug('Old table rows: ' + JSON.stringify($.course_list.getData()));
$.course_list.appendRow(addClassRow);
//Ti.API.debug('New table rows: ' + JSON.stringify($.course_list.getData()));

var updateUserCourses = function(courses) {
  var d = $.course_list.getData(),
      numOfCourse = $.course_section.rowCount;
  for(var i = 0; i < numOfCourse; i++){
    Ti.API.debug('Adding row ' + i + '/' + numOfCourse);
    $.course_list.deleteRow(0);
  }
  
  for(var i = 0; i < courses.length; i++){
    Ti.API.debug('Adding row ' + i);
    var course = courses[i]
    var name_label = Ti.UI.createLabel({
      text: course.get('title'),
      className: 'course_name',
      left: '8dp',
      font:{fontSize:'32dp'}
    });
    var message_label = Ti.UI.createLabel({
      text: '(N/A)',
      className: 'messages',
      right:'8dp',
      font:{fontSize:'28dp'}
    });
    var row = Ti.UI.createTableViewRow({
      className:'course_row',
      height: '50dp',
      layout: 'composite'
    });
		row.id =i;
    row.add(name_label);
    row.add(message_label);
    $.course_list.appendRow(row);
  }
  var addClassRow = Ti.UI.createTableViewRow({
    className:'add_class',
    touchEnabled: true,
  });
  addClassRow.add(addClassLabel);

	$.course_list.addEventListener('click', openClass) 
  addClassRow.addEventListener('click', function(){
    //alert('this is working!!!');
    var view = addclass.getView();
    $.nav.open(view);  
  });
 
  $.course_list.appendRow(addClassRow);
};
var updateHomeViews = function(user){
  var courses = user.get('courses');
  Ti.API.debug('Updating home views: ' + JSON.stringify(courses));
  updateUserCourses(user.get('courses'));
}
updateFuncIndex =  Alloy.Updates.addUserFunc(updateHomeViews);
