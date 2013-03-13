var settings = Alloy.createController('settings'),
		stats = Alloy.createController('signup'),
		courses = Alloy.createController('course');

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

function openClass(e){
	var view = courses.getView();
	$.nav.open(view);
}

$.index.open();
