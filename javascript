var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        subdomains:['mt0','mt1','mt2','mt3']});

var url = 'Nepal.json';

// Set style function that sets fill color property
function style(feature) {
    return {
        fillColor: 'blue',
        fillOpacity: 0.5,
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        dashArray: '3'
    };
}
    var highlight = {
        'fillColor': 'yellow',
        'weight': 2,
        'opacity': 1
    };

	function forEachFeature(feature, layer) {

		var popupContent = "<p><b>DISTRICT: </b>"+ feature.properties.ADM2NM_1 +
			"</br>DISTRICT CODE: "+ feature.properties.ADM2CD +
			"</br>PROVINCE: "+ feature.properties.ADM1NM +
			"</br>PROVINCE CODE: "+ feature.properties.ADM1CD +'</p>';
	
		layer.bindPopup(popupContent);
	
		layer.on("click", function (e) {
			theLayer.setStyle(style); //resets layer colors
			layer.setStyle(highlight);  //highlights selected.
		});
	}	
	var map = L.map('map', {
		center: [27.68723120070982, 85.32372326123497],
		zoom: 7,
		layers: [osm]
	});
	// Null variable that will hold layer
var theLayer = L.geoJson(null, {onEachFeature: forEachFeature, style: style});

$.getJSON(url, function(data) {
	theLayer.addData(data);
});

var baseLayers = {
	'OpenStreetMap': osm,
	'OpenStreetMap.HOT': osmHOT,
	'googlemap': googleSat
};
theLayer.addTo(map);
var overlayMaps = {
    "District Boundary":theLayer
};
var layerControl = L.control.layers(baseLayers, overlayMaps).addTo(map);

var marker = L.marker([27.68723120070982, 85.32372326123497]).addTo(map)
		.bindPopup('Himalayan College of Geomatics Engineering<br> You are here this very moment')
		.openPopup();


		var popup = L.popup();

function onMapClick(e) {
	popup.setLatLng(e.latlng).setContent("LatLong detail" + e.latlng.toString()).openOn(map);
}
map.on('click', onMapClick);

