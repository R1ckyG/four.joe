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
        });
		
        return Model;
    },

    extendCollection: function(Collection) {		
        _.extend(Collection.prototype, {
            // Extend, override or implement Backbone.Collection 
        });
		
        return Collection;
    }
}