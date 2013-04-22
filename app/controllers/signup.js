var schoolCollection = Backbone.Collection.extend({}),
    user = Alloy.Models.user,
    schools;

Ti.API.debug('Users: ' + JSON.stringify(user));

var addSchools = function(e){
	Ti.API.debug(this.responseText);
  schools = new schoolCollection(JSON.parse(this.responseText));	
  Alloy.Collections.schools = schools;
  selectedSchool = Alloy.Collections.schools.at(0); 
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
				password:$.password.value,
				school: {
					id: selectedSchool.get('_id'),
					name: selectedSchool.get('college')
				}
	}
  var options = {
    success: function(resObj, resText, options){
      Ti.API.debug('Setting id ' + JSON.stringify(resObj['_id']) + JSON.stringify( Alloy.Models.user));
			var home = Alloy.createController('home');
      home.getView().open();
		  var students = selectedCourse.get('students');
			students.push({
					id: Alloy.Models.user.get('id'),
					firstname: Alloy.Models.user.get('firstname'),
					lastname: Alloy.Models.user.get('lastname')
			});
			selectedCourse.save({'students': students});
		},
    error: function(model, error, options){
      Alloy.Models.user.set('_id', error);
      Ti.API.debug(error + ': ' + JSON.stringify( Alloy.Models.user));
      //TODO Error handling for signup
			alert('Problem creating account. Please try again later.');
    },
  };
  Alloy.Models.user.save(ud, options);
	Ti.API.debug('Users: ' + JSON.stringify(Alloy.Models.user));
};

var url = 'http://localhost:8000/api/v1/get_schools';
var xhr = Ti.Network.createHTTPClient({
		onload: addSchools, 
		onerror: function(e){
			Ti.API.debug(e.error);
			alert('Problem with network connection. Please try again later');
		},
		timeout:5000
});
xhr.open('GET', url);
xhr.send();
