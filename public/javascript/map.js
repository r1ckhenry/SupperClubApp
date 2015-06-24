var map;
var geocoder;
var locations = [];

var styles =
    [{"stylers":[{"visibility":"simplified"},{"saturation":20},{"weight":3.2},{"lightness":25}]}]

function initialize(){
  var latlng = new google.maps.LatLng(51.50722, -0.12750);
  var mapOptions = {
    zoom: 14,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  map.setOptions({styles: styles});
  addMarker(map);
}

function addMarker(map) {
  var geocoder = new google.maps.Geocoder();
  var showMarkerFromGeocoderResults = function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      var marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map
      });
      map.setCenter(results[0].geometry.location);
    } else {
      console.log('no geocode for you');
    }
  }
  var geocoderOptions = { address: document.getElementsByTagName('address')[0].innerHTML };
  geocoder.geocode(geocoderOptions, showMarkerFromGeocoderResults)
}

google.maps.event.addDomListener(window, "load", initialize);