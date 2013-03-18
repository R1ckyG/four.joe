var addClasses = function(courses){
	var picker = $.courseColumn;
	for(var i = 0; i < courses.length; i++){
		var course = Alloy.Collections.courses.at(i);
		Ti.API.debug('Courses' + JSON.stringify(courses))
		var label = Ti.UI.createLabel({
			text: course.get('title'),
			height:'auto', width: 'auto',
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		});
		Ti.API.debug('Adding course: ' + course.get('title'));
		//picker.add(course); 
	}
};

var setClass = function(e){
	var course = Alloy.Collections.courses.at(e.rowIndex),
			courses	 = Alloy.Models.user.get('courses');
	if(courses){
		courses.push(course);
		Alloy.Models.user.set('courses', courses);
	}else{
		Alloy.Models.user.set('courses', [course]);
	}
};
var options = {
	success: function(resObj, resText, options) {
		addClasses(Alloy.Collections.courses);
		Ti.API.debug('Adding classes: ' + JSON.stringify(Alloy.Collections.courses));
	},
	error: function(model, error, options) {
		addClasses();
		Ti.API.debug('error sAdding classes: ' + error);
	},
}

Ti.API.debug('-- Fetching Courses --');
Alloy.Collections.courses.fetch(options);

