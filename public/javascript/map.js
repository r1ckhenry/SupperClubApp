var map;
var geocoder;
var locations = [];

var styles =
    [{"featureType":"all","elementType":"labels","stylers":[{"lightness":63},{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000bff"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"color":"#4a4a4a"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"weight":"0.01"},{"color":"#727272"},{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"color":"#545454"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"color":"#7c7c7c"},{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text","stylers":[{"color":"#404040"}]},{"featureType":"landscape","elementType":"all","stylers":[{"lightness":16},{"hue":"#ff001a"},{"saturation":-61}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"color":"#828282"},{"weight":"0.01"}]},{"featureType":"poi.government","elementType":"labels.text","stylers":[{"color":"#4c4c4c"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#00ff91"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#999999"},{"visibility":"on"},{"weight":"0.01"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#ff0011"},{"lightness":53}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#626262"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"color":"#676767"},{"weight":"0.01"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#0055ff"}]}]

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
        map: map,
        draggable:true,
        animation: google.maps.Animation.DROP
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

