var map = {
	map: null,
	path: null,
	coords: [],
	
	init: function() {
		// Create a map object and specify the DOM element for display.
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 56.19815, lng: 15.5325},
			scrollwheel: true,
			zoom: 22
		});
	    window.dispatchEvent(mapsLoaded);
	},

	update: function(coords) {
		this.coords.push(coords);

		this.path = new google.maps.Polyline({
	    	path: this.coords,
    		geodesic: true,
	    	strokeColor: '#0A0',
	    	strokeOpacity: 0.5,
	    	strokeWeight: 1
	    });
		this.path.setMap(this.map);			
	},
};

var mapsLoaded = new CustomEvent('mapsLoaded', {detail: map, bubbles: false});

window.addEventListener('mapsLoaded', function(e) {
	'use strict';
    
    var ws = new WebSocket('ws://localhost:8080');
	var map = e.detail;

    ws.onopen = function() {
        console.log('WebSocket is open');
        ws.send('start');
    };
  
    ws.onclose = function() {
        console.log('WebSocket is closed');
    };
    
    ws.onmessage = function(event) {
        console.log(map.path);
        var data = JSON.parse(event.data);

        map.update(data);
    };
});