var addClasses = function(courses){
	var picker = $.courseColumn;
	for(var i = 0; i < courses.length; i++){
		var course = Alloy.Collections.courses.at(i);
		Ti.API.debug('Courses' + JSON.stringify(courses))
		var label = Ti.UI.createLabel({
			text: course.get('title'),
			height:'auto', 
      font:{fontSize:20,fontWeight:'bold'},
		});
    var row =  Ti.UI.createPickerRow();
    row.add(label);
		Ti.API.debug('Adding course: ' + course.get('title'));
		$.courseColumn.addRow(row); 
	}
};

var setClass = function(e){
	var course = Alloy.Collections.courses.at(e.rowIndex),
			courses	 = Alloy.Models.user.get('courses'),
      options = {
        success: function(resObj, restText, options) {
          Ti.API.debug('Success updating user' + resText);
        },
        error: function(model, error, options) {
          Ti.API.error('Error updating user');
          Alloy.Updates.updateUserViews(Alloy.Models.user);
        }
      };
  Ti.API.debug('selecting class: ' + JSON.stringify(course));
	if(courses){
		courses.push(course);
		Alloy.Models.user.set({'courses': courses}, options);
    Alloy.Updates.updateUserViews(Alloy.Models.user);
	}else{
		Alloy.Models.user.set({'courses': [course]}, options);
    Alloy.Updates.updateUserViews(Alloy.Models.user);
	}
};
var options = {
	success: function(resObj, resText, options) {
		addClasses(Alloy.Collections.courses);
		Ti.API.debug('Adding classes: ' + JSON.stringify(Alloy.Collections.courses));
	},
	error: function(model, error, options) {
		addClasses(Alloy.Collections.courses);
		Ti.API.debug('error sAdding classes: ' + error);
	},
}

Ti.API.debug('-- Fetching Courses --');
Alloy.Collections.courses.fetch(options);

