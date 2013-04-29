// Global URL variable
var BASE_URL = 'http://54.215.4.22:8000/api/v1',
    call_url,
    type;

var makeHTTPRequest = function(method, url, post_data, callback){
  var client = Ti.Network.createHTTPClient({
      onload: function(e) {
      	if (callback) callback(true, this.responseText, null);
      },
      onerror: function(e) {
          if (callback) callback(false, this.responseText, e.error);
      },
      timeout : 5000
  });
  client.open(method, url);
  client.send(post_data);
};

// Override the Backbone.sync method with the following
module.exports.sync = function(method, model, options) {
  var payload =model.toJSON();
  Ti.API.error(payload);
  //options = options || {};
  var error;

  switch(method) {
    // This case is called by the Model.fetch and Collection.fetch methods to retrieve data.
    case 'read':
      var id = model.get('id');
      Ti.API.debug('Performing rest.js read:' + model.urlRoot + ':' + type);
      if(model.name === 'user'){
				makeHTTPRequest('GET', BASE_URL + model.urlRoot + id, null, callback);
      }else{
      	makeHTTPRequest('GET', BASE_URL + model.urlRoot, null, callback);
      }
			break;
          
    // This case is called by the Model.save and Collection.create methods
    // to a initialize model if the IDs are not set.
    // For example, Model.save({text: 'Hola, Mundo'}) 
    // or Collection.create({text: 'Hola, Mundo'}) executes this code.
    case 'create':
      Ti.API.debug('Performing rest.js create');
      makeHTTPRequest('POST', call_url, payload, callback);
      break;
          
    // This case is called by the Model.destroy method to delete the model from storage.
    case 'delete':
      var id = model.get('id');
      Ti.API.debug('Performing rest.js delete');
      makeHTTPReqeust('POST', call_url + '/destroy/' + id, null, callback);
      break;
    // This case is called by the Model.save and Collection.create methods
    // to update a model if they have IDs set.
    case 'update':
      Ti.API.debug('Performing rest.js update');
      if(model.name === 'course'){
        payload = {
          'data': JSON.stringify(model)
        };
        makeHTTPRequest('PUT', BASE_URL + model.urlRoot + model.get('id'), payload, callback);
      }else{
        makeHTTPRequest('PUT', BASE_URL + model.urlRoot + model.get('id'), payload, callback);
      }
      // Twitter does not have a call to change a tweet.
      error = 'ERROR: Update method is not implemented!';         
      break;  
    default :
      error = 'ERROR: Sync method not recognized!';
  };

  if (error) {
      options.error(model, error, options);
      Ti.API.error(error);
      model.trigger('error');
  }
 
  // Simple default callback function for HTTP request operations.
  function callback(success, response, error) {	
    try{
      res = JSON.parse(response);
    }catch(e){
      return;
    }
    Ti.API.debug('Sync response: ' + response + JSON.stringify(options));
    if (success) {
        // Calls the default Backbone success callback
        // and invokes a custom callback if options.success was defined.
        options.success(res, JSON.stringify(res), options);
    } else {
        // res.errors is an object returned by the Twitter server
        var err = res.errors[0].message || error;
        Ti.API.error('ERROR: ' + err);
        // Calls the default Backbone error callback
        // and invokes a custom callback if options.error was defined.
        options.error(model, err, options);
        model.trigger('error');
    }
  };
};

// Perform some actions before creating the Model class
module.exports.beforeModelCreate = function(config, name) {
  type = name;
  config = config || {};
  // If there is a base_url defined in the model file, use it
  if (config.adapter.base_url) {
      call_url =  BASE_URL +config.adapter.base_url;
  }	
	Ti.API.debug('Making call with url: ' + call_url + 'name');
  return config;
};

// Perform some actions after creating the Model class 
module.exports.afterModelCreate = function(Model, name) {
    // Nothing to do
};
