exports.definition = {
    config : {
      "defaults": {
         "title": "-",
         "description": "-"
       },
       "adapter": {
         "type": "rest",
         "collection_name": "courses",
         "base_url" : "/courses/",
       }
    },

    extendModel: function(Model) {		
        _.extend(Model.prototype, {
           // Extend, override or implement Backbone.Model 
					 urlRoot: '/course/',
					 name:'course',
           parse: function(response, options) {
             response.id = response._id;
             return response;
           },	
				});
		
        return Model;
    },

    extendCollection: function(Collection) {		
        _.extend(Collection.prototype, {
            // Extend, override or implement Backbone.Collection 
 					 urlRoot: '/courses/',	
					 name: 'courses',
        });
		
        return Collection;
    }
}