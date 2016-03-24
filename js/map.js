  // LRT Stations
var stations = [
    {title: 'McKernan/Belgravia LRT Station',latitude: 53.5105176626514,longitude: -113.525670719744,address: '114 Street 76 Avenue NW'},
    {title: 'Bay/Enterprise Square LRT Station',latitude: 53.5408338367352,longitude: -113.500257591202,address: '104 Street Jasper Avenue NW'},
    {title: 'Belvedere LRT Station',latitude: 53.5881416762881,longitude: -113.435304152645,address: '58 Street 129 Avenue NW'},
    {title: 'Central LRT Station',latitude: 53.540933109878,longitude: -113.495220359409,address: '101 Street Jasper Avenue NW'},
    {title: 'Century Park LRT Station',latitude: 53.4572535293499,longitude: -113.515815605592,address: '111 Street 23 Avenue NW'},
    {title: 'Churchill LRT Station',latitude: 53.5461618022682,longitude: -113.489906967631,address: '99 Street 102 Avenue NW'},
    {title: 'Clareview LRT Station',latitude: 53.6015653908153,longitude: -113.410802221039,address: '100 Clareview Transit Station NW'},
    {title: 'Coliseum LRT Station',latitude: 53.5704958297835,longitude: -113.459210264724,address: '7628 118 Avenue NW'},
    {title: 'Corona LRT Station',latitude: 53.5408294776932,longitude: -113.504000779089,address: '107 Street Jasper Avenue NW'},
    {title: 'Grandin LRT Station',latitude: 53.5361496789029,longitude: -113.504462742382,address: '110 Street 98 Avenue NW'},
    {title: 'Health Sciences/Jubilee LRT Station',latitude: 53.520384915746,longitude: -113.52581684413,address: '114 Street 83 Avenue NW'},
    {title: 'South Campus/Fort Edmonton LRT Station',latitude: 53.5025223521144,longitude: -113.528518164187,address: '11457 68 Avenue NW'},
    {title: 'Southgate LRT Station',latitude: 53.4853395036959,longitude: -113.516896977959,address: '111 Street 51 Avenue NW'},
    {title: 'Stadium LRT Station',latitude: 53.5595244773473,longitude: -113.471393915512,address: '100 Stadium Transit Station NW'},
    {title: 'University LRT Station',latitude: 53.5248259947652,longitude: -113.521801205501,address: '100 University Station NW'}
  ];

var markers = [];

var mapLocation = function(data) {
  this.title = ko.observable(data.title);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
  this.address = ko.observable(data.address);
};

var ViewModel = function() {
  var self = this;

  this.mapLocationList = ko.observableArray([]);

  stations.forEach(function(stationItem){
    self.mapLocationList.push( new mapLocation(stationItem) );
  });

  this.currentMapLocation = ko.observable(this.mapLocationList()[0] );

  this.switchMapLocation = function(clickedMapLocation) {
    self.currentMapLocation(clickedMapLocation);
    setMapOnAll(map);
  };

};

ko.applyBindings(new ViewModel());

function initMap() {
  var myLatLng = {lat: 53.524009, lng: -113.512305};
  var mapDiv = document.getElementById('map');

  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(mapDiv, {
    center: myLatLng,
    zoom: 12 
  });

  // Create the markers
  for (var i=0; i < stations.length; i++) {
    var station = stations[i];
    addMarker({lat: station.latitude, lng: station.longitude},'http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
  }

};

  // Adds a marker to the map and push to the array.
  function addMarker(location,icon) {
    var marker = new google.maps.Marker({
      position: location,
      icon: icon,
      map: map
    });
    markers.push(marker);
  }
  

  // Set markers on map for all in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      markers[i].setMap(map);
    }
  }

