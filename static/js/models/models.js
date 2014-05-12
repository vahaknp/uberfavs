//Favorite model with defaults set to Uber HQ
var Favorite = Backbone.Model.extend({
	defaults:{
		lng:"-122.3932461",
		lat:"37.790947",
		address:"182 Howard St #8 San Francisco, CA 94105",
		name:"Uber"
	},
	idAttribute: "_id"

});

//Places model, collection of Favorites
var Places = Backbone.Collection.extend({
	model:Favorite,
	url:'/favorites'
});

var places = []