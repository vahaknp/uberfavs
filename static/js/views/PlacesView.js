var PlacesView = Backbone.View.extend({
		el:$("body"),

		events:{
			"click #add":"addFavorite",
		},

		initialize:function(){
			this.collection = new Places(favorites);
			this.collection.fetch();
			this.render();

			this.collection.on("add", this.renderFavorite, this);
			this.collection.on("remove", this.removeFavorite, this);
			this.collection.on("reset", this.render, this);
		},

		render: function(){
			var that = this;
			_.each(this.collection.models, function(item){
				that.renderFavorite(item);
			}, this);
		},

		//Add a favorite based on info from the autocomplete google bar
		addFavorite:function (e) {
			e.preventDefault();
		 
			var formData = {};
			$("#addFavorite div").children("input").each(function (i, el) {
				if ($(el).val() !== "") {
					formData[el.id] = $(el).val();
				}
			});
		 
			places.push(formData);
			
			this.collection.create(formData);
		},

		// Remove Favorite
		removeFavorite: function(removedFavorite){
			var removedFavoriteData = removedFavorite.attributes;
		 
			_.each(removedFavoriteData, function(val, key){
				if(removedFavoriteData[key] === removedFavorite.defaults[key]){
					delete removedFavoriteData[key];
				}
			});
		 
			_.each(favorites, function(favorite){
				if(_.isEqual(favorite, removedFavoriteData)){
					favorites.splice(_.indexOf(favorites, favorite), 1);
				}
			});
		},

		//Render and add marker on map
		renderFavorite:function(item){
			var favoriteView = new FavoriteView({
				model: item
			});
			this.$('#favorites').append(favoriteView.render().el);

			var lat = item.toJSON().lat
			var lng = item.toJSON().lng
			var name = item.toJSON().name

			map.addMarker({
				lat: lat,
				lng: lng,
				title: name
			});
		}
});

