function getByClass(className, parent) {
	parent || (parent = document);
	var descendants = parent.getElementsByTagName('*'),
		i = -1,
		e, result = [];
	while(e = descendants[++i]) {
		((' ' + (e['class'] || e.className) + ' ').indexOf(' ' + className + ' ') > -1) && result.push(e);
	}
	return result;
}

var outer_div = $("#detailsPanel_c");
var inner_div = $("#detailsPanel");
var map_div = document.createElement("div");
map_div.id = "map_div";
var overlay_div = $("#overlaydiv-body");
outer_div.style.left = "0";
inner_div.style.width = "100%";
map_div.style.width = "62%";
map_div.style.height = "100%";
overlay_div.childNodes[1].width = "38%";
overlay_div.childNodes[1].height = "100%";
overlay_div.childNodes[1].style.float = "left";
map_div.style.float = "right";
map_div.innerHTML = "    <link href=\"https://google-developers.appspot.com/maps/documentation/javascript/examples/default.css\" rel=\"stylesheet\">    <div id=\"map_canvas\"></div>";
overlay_div.appendChild(map_div);

function getPlaces() {

	var rows = getByClass("segonroute1");
	ret = [];
	for(var i = 0; i < rows.length; i++) {
		var r = rows[i];
		var searchTerm = r.childNodes[3].childNodes[1].childNodes[0].nodeValue.trim() + " " + r.childNodes[3].childNodes[2].nodeValue.trim();
		ret.push({
			searchTerm: searchTerm
		});
	}
	return ret;
}

function initialize() {
	var myLatLng = new google.maps.LatLng(0, -180);
	var mapOptions = {
		zoom: 3,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	var geocoder = new google.maps.Geocoder();
	var place_service = new google.maps.places.PlacesService(map);
	var flightPlanCoordinates = [
	new google.maps.LatLng(37.772323, -122.214897), new google.maps.LatLng(21.291982, -157.821856), new google.maps.LatLng(-18.142599, 178.431), new google.maps.LatLng(-27.46758, 153.027892)];
	flightPlanCoordinates = []
	places = getPlaces()
	var done = 0;
	for(var i = 0; i < places.length; i++) {
		setTimeout(
			function(){
				geocoder.geocode({
				'address': places[i].searchTerm
				}, function(results, status) {
				alert(status);
				alert(i);
				alert(places[i])
				if(status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: map,
						animation: google.maps.Animation.DROP,
						position: results[0].geometry.location
					});
					done++;
					if(done == places.length) {
						var flightPath = new google.maps.Polyline({
							path: flightPlanCoordinates,
							strokeColor: '#FF0000',
							strokeOpacity: 1.0,
							strokeWeight: 2
						});

						flightPath.setMap(map);
					}

				}
		});}, i*1000);
	};

}



var s = document.createElement("script");
s.type = 'text/javascript';
s.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&sensor=false&callback=initialize";
document.body.appendChild(s);