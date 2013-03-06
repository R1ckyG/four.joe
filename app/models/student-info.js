exports.definition = {
	config: {
    columns:{
      'first-name': 'text',
      'last-name': 'text',
      email: 'text',
      school: 'text',
      point:'integer' 
    },
    defaults:{
      'first-name': 'foo',
      'last-name': 'bar',
      email: '--',
      school: '--',
      point: 0,
    },
		adapter: {
			type: "sql",
			collection_name: "student-info"
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

