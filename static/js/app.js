//Initialize map
map = new GMaps({
	div: '#map_canvas',
	lat: 37.790947,
	lng: -122.3932461
});

//Make it look cool
map.addStyle({
	styles: pale_style,
	mapTypeId: "pale_style"
})
map.setStyle("pale_style");

//Jquery
$( document ).ready(function() {
	//Make Search bar autocomplete
	$("#geocomplete").geocomplete({
		details: "form",
		types: ['geocode', 'establishment'],
	});
	//Hide unneeded forms
	$('#lat').css({'display':'none'})
	$('#lng').css({'display':'none'})
	$('#address').css({'display':'none'})

	//fix some annoying css stuff
	$('.row').css({'margin':'0'})
});
