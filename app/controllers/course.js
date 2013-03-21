var course;

exports.setClass = function(selectedCourse){
	course = selectedCourse;
	Ti.API.debug('Course name ' + selectedCourse.get('title'));
}
