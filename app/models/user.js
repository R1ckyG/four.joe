exports.definition = {
    config: {
    	'defaults':{
        'firstname': '--',
        'lastname': '--',
        'password': 'pass',
        'email': '--',
        'school': '--',
    	},
      'adapter': {
          // Name of the custom sync adapter
          'type': 'rest',
          // Passed parameter processed when beforeModelCreate is called
          'base_url': '/user/'
      }
    },		
    extendModel: function(Model) {		
        _.extend(Model.prototype, {
            // Due to JSON parsing errors, use id_str instead of id.
            // The IDs are too large to store as integers using the JavaScript spec.
          	
          	initialize: function(){
          		Ti.API.debug('Creating user model');
          		this.on('invalid', function(model, error){
          			alert(error);
          		});
          		/*Dont forget to notify the server*/
          	},
          	validate: function(attribs){
          		var message = '',
          				fire = false;

          		if(attribs.firstname === undefined){
          			message =+ 'No firstname defined\n';
          			fire = true;
          		}
          		if(attribs.lastname === undefined){
          			message =+ 'No lastname defined\n';
          			fire = true;
          		}
          		if(attribs.email === undefined){
          			message =+ 'No email defined\n';
          			fire = true;
          		}
          		if(attribs.username === undefined){
          			message =+ 'No username defined\n';
          			fire = true;
          		}
          		if(attribs.password === undefined){
          			message =+ 'No password defined\n';
          			fire = true;
          		}
          		if(attribs.school === undefined){
          			message =+ 'No school defined\n';
          			fire = true;
          		}
          		Ti.API.debug(message);
          		if(fire)return message;
          	}

		}); // end extend
        return Model;
	}
}