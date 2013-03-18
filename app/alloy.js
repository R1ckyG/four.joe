// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:

//Alloy.Collections.students = Alloy.createCollection('studentinfo');
Alloy.Collections.courses = Alloy.createCollection('course');
var options = {
	success: function(resObj, resText, options) {
		//addClasses();
		Ti.API.debug('Adding classes'+ JSON.stringify(Alloy.Collections.courses));
	},
	error: function(resObj, resText, options) {
		//addClasses();
		Ti.API.debug('error sAdding classes'+ JSON.stringify(Alloy.Collections.courses));
	},
}
//Alloy.Collections.courses.fetch(options);
//Ti.API.debug('Courses' + JSON.stringify(Alloy.Collections.courses))
Alloy.Models.user = Alloy.createModel('user');
options = {
  success: function(resObj, resText, options){
    //Alloy.Models.user.set('_id',resObj['_id']);
    //Alloy.Models.user.id = resObj['_id'];
    Ti.API.debug('Alloy.js succcess: ' + JSON.stringify(Alloy.Models.user)+ ' : '+JSON.stringify(resObj));
  },
  error: function(model, error, options){
    //Alloy.Models.user.set('_id', error);
    //model.id = error;
    Ti.API.debug('Alloy.js error: ' + error + ': ' + JSON.stringify(model));
  },
}
//Alloy.Models.user.fetch(options);
Alloy.Updates = {
  userFuncs: [],
  addUserFunc: function(f){
    var index = this.userFuncs.push(f) - 1;
    return index;
  },
  updateUserViews: function(user){
    for(var i in this.userFuncs){
      var f  = this.userFuncs[i];
      f(user);
    }
  }
}

// Alloy.Globals.someGlobalFunction = function(){};
