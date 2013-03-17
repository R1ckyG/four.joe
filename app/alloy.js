// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:

Alloy.Collections.students = Alloy.createCollection('studentinfo');
Alloy.Models.user = Alloy.createModel('user');
var options = {
  success: function(resObj, resText, options){
    Alloy.Models.user.set('_id',resObj['_id']);
    Ti.API.debug(resText);
  },
  error: function(model, error, options){
    Alloy.Models.user.set('_id', error);
    Ti.API.debug(error + JSON.stringify( Alloy.Models.user));
  },
}
Alloy.Models.user.save(null, options);
// Alloy.Globals.someGlobalFunction = function(){};
