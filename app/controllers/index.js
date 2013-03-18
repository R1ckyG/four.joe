var settings = Alloy.createController('settings'),
		stats = Alloy.createController('signup'),
		courses = Alloy.createController('course'),
    addclass = Alloy.createController('addclass'),
    user = Alloy.Models.user;



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
}

function openClass(e){
	var view = courses.getView();
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
$.course_section.add(addClassRow);