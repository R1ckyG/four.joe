exports.definition = {
	config: {
    columns:{
      'firstname': 'text',
      'lastname': 'text',
      email: 'text',
      school: 'text',
      point:'integer' 
    },
    defaults:{
      'firstname': 'foo',
      'lastname': 'bar',
      email: 'XX',
      school: 'XX',
      point: 0,
    },
		adapter: {
			type: "sql",
			collection_name: "studentinfo"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		  customProperty: 'student',
    });
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}

