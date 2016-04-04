// DATA MODEL

var blue = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var red = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var green = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

var stationList = [
    {title: 'McKernan/Belgravia LRT Station',latitude: 53.5105176626514,longitude: -113.525670719744,address: '114 Street 76 Avenue NW',icon: blue,order: 12},
    {title: 'Bay/Enterprise Square LRT Station',latitude: 53.5408338367352,longitude: -113.500257591202,address: '104 Street Jasper Avenue NW',icon: blue,order: 7},
    {title: 'Belvedere LRT Station',latitude: 53.5881416762881,longitude: -113.435304152645,address: '58 Street 129 Avenue NW',icon: blue,order: 2},
    {title: 'Central LRT Station',latitude: 53.540933109878,longitude: -113.495220359409,address: '101 Street Jasper Avenue NW',icon: blue,order: 6},
    {title: 'Century Park LRT Station',latitude: 53.4572535293499,longitude: -113.515815605592,address: '111 Street 23 Avenue NW',icon: blue,order: 15},
    {title: 'Churchill LRT Station',latitude: 53.5461618022682,longitude: -113.489906967631,address: '99 Street 102 Avenue NW',icon: blue,order: 5},
    {title: 'Clareview LRT Station',latitude: 53.6015653908153,longitude: -113.410802221039,address: '100 Clareview Transit Station NW',icon: blue,order: 1},
    {title: 'Coliseum LRT Station',latitude: 53.5704958297835,longitude: -113.459210264724,address: '7628 118 Avenue NW',icon: blue,order: 3},
    {title: 'Corona LRT Station',latitude: 53.5408294776932,longitude: -113.504000779089,address: '107 Street Jasper Avenue NW',icon: blue,order: 8},
    {title: 'Grandin LRT Station',latitude: 53.5361496789029,longitude: -113.504462742382,address: '110 Street 98 Avenue NW',icon: blue,order: 9},
    {title: 'Health Sciences/Jubilee LRT Station',latitude: 53.520384915746,longitude: -113.52581684413,address: '114 Street 83 Avenue NW',icon: blue,order: 11},
    {title: 'South Campus/Fort Edmonton LRT Station',latitude: 53.5025223521144,longitude: -113.528518164187,address: '11457 68 Avenue NW',icon: blue,order: 13},
    {title: 'Southgate LRT Station',latitude: 53.4853395036959,longitude: -113.516896977959,address: '111 Street 51 Avenue NW',icon: blue,order: 14},
    {title: 'Stadium LRT Station',latitude: 53.5595244773473,longitude: -113.471393915512,address: '100 Stadium Transit Station NW',icon: blue,order: 4},
    {title: 'University LRT Station',latitude: 53.5248259947652,longitude: -113.521801205501,address: '100 University Station NW',icon: blue,order: 10}
  ];

var markers = [];
var infowindows = [];

var station = function(data) {
  this.title = ko.observable(data.title);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
  this.address = ko.observable(data.address);
  this.icon = ko.observable(data.icon);
};

// VIEW MODEL
var ViewModel = function() {
  var self = this;

  this.stationLocation = ko.observableArray([]);

  stationList.forEach(function(stationItem){
    self.stationLocation.push( new station(stationItem) );
    addMarker(stationItem);
  });

  this.currentStation = ko.observable(this.stationLocation()[0] );

  this.switchStation = function(clickedStation) {
    self.currentStation(clickedStation);
    setCurrentStation(map,self.currentStation().title,blue,green);
  };

  // Adds a marker to the map and push to the array.
  // Adds station information to infowindow and pushes to the array.
  function addMarker(stationItem) {
    var marker = new google.maps.Marker({
      position: {lat: stationItem.latitude, lng: stationItem.longitude},
      title: stationItem.title,
      icon: stationItem.icon,
      map: map
    });
    marker.addListener('click', function() {
      self.currentStation(stationItem);
      setCurrentStation(map,self.currentStation().title,blue,green);
    });
    var infowindow = new google.maps.InfoWindow({
    content: '<p><b>'+stationItem.title+'</b></p>'+'<p>'+stationItem.address+'</p>'
    });
    markers.push(marker);
    infowindows.push(infowindow);
  }

  // Set markers on map for all in the array.
  function setAllMarkersOnMap(map,colour) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setIcon(colour);
      markers[i].setMap(map);
    }
  }

  // Set current station to different colour.
  function setCurrentStation(map,currentStationTitle,baseColor,currentColor) {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].title == currentStationTitle) {
        markers[i].setIcon(currentColor);
      console.log('nextThree: '+getNextTrains());
        infowindows[i].setContent(infowindows[i].getContent()+getNextTrains());
        infowindows[i].open(map,markers[i]);
      } else {
        markers[i].setIcon(baseColor);
        infowindows[i].close(map,markers[i]);
      }
      markers[i].setMap(map);
    }
  }

  // ETS AJAX request
  function getNextTrains() {
    var nextThree; 
    var etsUrl = 'https://data.edmonton.ca/resource/xeux-ngrz.json?$query=SELECT%20arrival_time_2%20WHERE%20stop_id=%222316%22%20AND%20stop_headsign=%22Century%20Park%22%20GROUP%20BY%20arrival_time_2%20ORDER%20BY%20arrival_time_2%20ASC';
    $.ajax({
      url: etsUrl,
      dataType: 'json',
      async: false,
      success: function(data) {
    //$.getJSON(etsUrl, function(data) {
      arrivalTimes = data;
      console.log(arrivalTimes.length);
      console.log(timeNow());
      var i = 0;
      var arrivalTime = arrivalTimes[i].arrival_time_2;
      while (timeNow() > arrivalTime) {
        i++;
        arrivalTime = arrivalTimes[i].arrival_time_2;
        if (i > arrivalTimes.length) {
          break;
        }
      }
      nextThree = '<p> Next Three Trains: <br>'+arrivalTimes[i].arrival_time_2+'<br>'+arrivalTimes[i+1].arrival_time_2+'<br>'+arrivalTimes[i+2].arrival_time_2+'</p>';
      }
    });//.error(function(){
     // console.log("Could not load data!!!");
    //});
    console.log('Test: '+nextThree);
    return nextThree;
};

  function timeNow() {
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
      s = (d.getSeconds()<10?'0':'') + d.getSeconds();
  return h + ':' + m + ':' + s;
}

};

// VIEW
function initMap() {
  var myLatLng = {lat: 53.524009, lng: -113.512305};
  var mapDiv = document.getElementById('map');

  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(mapDiv, {
    center: myLatLng,
    zoom: 12 
  });
  ko.applyBindings(new ViewModel());
}


