var schoolCollection = Backbone.Collection.extend({}),
    user = Alloy.Models.user;
var schools;
Ti.API.debug('Users: ' + JSON.stringify(user));
var addSchools = function(e){
	Ti.API.debug(this.responseText);
  schools = new schoolCollection(JSON.parse(this.responseText));	
	alert('success');
  Alloy.Collections.schools = schools;
  
	var schoolColumn = $.schoolColumn;
  for(var i=0; i < schools.length; i++){
	  var row = Ti.UI.createPickerRow();
	  var school = schools.at(i);
    Ti.API.debug('Adding' + school.get('college')); 
	  var label = Ti.UI.createLabel({
		  text: school.get('college'),
		  height:'auto',
		  textAlign:'left'
	  });
  
	  row.add(label);
	  schoolColumn.addRow(row);
  }
};

var selectedSchool;
var setSchool = function(e){
	selectedSchool = Alloy.Collections.schools.at(e.rowIndex);
	Ti.API.debug('Selecting school ' + selectedSchool.get('college'));
};

var onSignUp = function(e){
	var ud = {
				firstname:$.firstname.value,
				lastname:$.lastname.value,
				email:$.email.value,
				username:$.username.value,
				password:$.password.value,
				school: selectedSchool.get('_id')
	}
  user = Alloy.createModel('user', ud);
	Alloy.Models.user = user;
  var options = {
    success: function(resObj, resText, options){
      Ti.API.debug(resText);
    },
    error: function(model, error, options){
      Ti.API.debug(error);
    },
  }
  Alloy.Models.user.save(null, options);
	Ti.API.debug('Users: ' + JSON.stringify(Alloy.Models.user));
};

var url = 'http://localhost:8000/api/v1/get_schools';
var xhr = Ti.Network.createHTTPClient({
		onload: addSchools, 
		onerror: function(e){
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout:5000
});
xhr.open('GET', url);
xhr.send();
