var FavoriteView = Backbone.View.extend({
	tagName:"div",
	className:"col-sm-3",
	template:$("#favoriteTemplate").html(),
	
	events: {
		"click #delete": "deleteFavorite",
		"click .favoriteContainer" : "centerMap",
	},

	//Render an entry
	render:function () {
		var tmpl = _.template(this.template);

		this.$el.html(tmpl(this.model.toJSON()));
		return this;
	},

	// Delete an entry and reload so that markers get reset correctly.
	deleteFavorite:function () {
		this.model.destroy();
		this.remove();
		location.reload();
	},

	// Center map on entry that was clicked.
	centerMap:function(){
		var lat = this.model.toJSON().lat
		var lng = this.model.toJSON().lng
		console.log(lat, lng)
		map.setCenter(lat, lng)
		map.setZoom(8);
	}
});

var placesView = new PlacesView();