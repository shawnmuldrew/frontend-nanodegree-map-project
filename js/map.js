// DATA MODEL

var blue = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var red = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var green = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

var stationList = [
    {title: 'McKernan/Belgravia LRT Station',latitude: 53.5105176626514,longitude: -113.525670719744,address: '114 Street 76 Avenue NW',icon: blue,order: 12, northStop: '9982', southStop: '9981', imgSrc: 'img/LRT_Station_McKernan.jpg'},
    {title: 'Bay/Enterprise Square LRT Station',latitude: 53.5408338367352,longitude: -113.500257591202,address: '104 Street Jasper Avenue NW',icon: blue,order: 7, northStop: '1985', southStop: '1774', imgSrc: 'img/LRT_Station_Bay.jpg'},
    {title: 'Belvedere LRT Station',latitude: 53.5881416762881,longitude: -113.435304152645,address: '58 Street 129 Avenue NW',icon: blue,order: 2, northStop: '7830', southStop: '7692', imgSrc: 'img/LRT_Station_Belvedere.jpg'},
    {title: 'Central LRT Station',latitude: 53.540933109878,longitude: -113.495220359409,address: '101 Street Jasper Avenue NW',icon: blue,order: 6, northStop: '1863', southStop: '1935', imgSrc: 'img/LRT_Station_Central.jpg'},
    {title: 'Century Park LRT Station',latitude: 53.4572535293499,longitude: -113.515815605592,address: '111 Street 23 Avenue NW',icon: blue,order: 15, northStop: '4982', southStop: '4982', imgSrc: 'img/LRT_Station_Century_Park.jpg'},
    {title: 'Churchill LRT Station',latitude: 53.5461618022682,longitude: -113.489906967631,address: '99 Street 102 Avenue NW',icon: blue,order: 5, northStop: '1691', southStop: '1876', imgSrc: 'img/LRT_Station_Churchill.jpg'},
    {title: 'Clareview LRT Station',latitude: 53.6015653908153,longitude: -113.410802221039,address: '100 Clareview Transit Station NW',icon: blue,order: 1, northStop: '7977', southStop: '7977', imgSrc: 'img/LRT_Station_Clareview.jpg'},
    {title: 'Coliseum LRT Station',latitude: 53.5704958297835,longitude: -113.459210264724,address: '7628 118 Avenue NW',icon: blue,order: 3, northStop: '1742', southStop: '1889', imgSrc: 'img/LRT_Station_Coliseum.jpg'},
    {title: 'Corona LRT Station',latitude: 53.5408294776932,longitude: -113.504000779089,address: '107 Street Jasper Avenue NW',icon: blue,order: 8, northStop: '1926', southStop: '1891', imgSrc: 'img/LRT_Station_Corona.jpg'},
    {title: 'Grandin LRT Station',latitude: 53.5361496789029,longitude: -113.504462742382,address: '110 Street 98 Avenue NW',icon: blue,order: 9, northStop: '1754', southStop: '1925', imgSrc: 'img/LRT_Station_Grandin.jpg'},
    {title: 'Health Sciences/Jubilee LRT Station',latitude: 53.520384915746,longitude: -113.52581684413,address: '114 Street 83 Avenue NW',icon: blue,order: 11, northStop: '2014', southStop: '2019', imgSrc: 'img/LRT_Station_Health_Sciences.jpg'},
    {title: 'South Campus/Fort Edmonton LRT Station',latitude: 53.5025223521144,longitude: -113.528518164187,address: '11457 68 Avenue NW',icon: blue,order: 13, northStop: '2116', southStop: '2115', imgSrc: 'img/LRT_Station_South_Campus.jpg'},
    {title: 'Southgate LRT Station',latitude: 53.4853395036959,longitude: -113.516896977959,address: '111 Street 51 Avenue NW',icon: blue,order: 14, northStop: '2114', southStop: '2113', imgSrc: 'img/LRT_Station_Southgate.jpg'},
    {title: 'Stadium LRT Station',latitude: 53.5595244773473,longitude: -113.471393915512,address: '100 Stadium Transit Station NW',icon: blue,order: 4, northStop: '1981', southStop: '1723', imgSrc: 'img/LRT_Station_Stadium.jpg'},
    {title: 'University LRT Station',latitude: 53.5248259947652,longitude: -113.521801205501,address: '100 University Station NW',icon: blue,order: 10, northStop: '2969', southStop: '2316', imgSrc: 'img/LRT_Station_University.jpg'}
  ];

var Station = function(data) {
  this.title = ko.observable(data.title);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
  this.address = ko.observable(data.address);
  this.icon = ko.observable(data.icon);
  this.order = ko.observable(data.order);
  this.northStop = ko.observable(data.northStop);
  this.southStop = ko.observable(data.southStop);
  this.marker = ko.observable(data.marker);
  this.infowindow = ko.observable(data.infowindow);
  this.imgSrc = ko.observable(data.imgSrc);
};

// VIEW MODEL

var ViewModel = function() {
  var self = this;

  this.stationLocation = ko.observableArray([]);

  // Load observable array
  stationList.forEach(function(stationItem){
    var marker = new google.maps.Marker({
      position: {lat: stationItem.latitude, lng: stationItem.longitude},
      title: stationItem.title,
      icon: stationItem.icon,
      map: map
    });
    var infowindow = new google.maps.InfoWindow({
    content: ''
    });
    stationItem.marker = marker;
    stationItem.infowindow = infowindow;
    var nextStation = new Station(stationItem);
    nextStation.marker().addListener('click', function() {
      self.currentStation(nextStation);
      setCurrentStation(map,self.currentStation().title(),blue,green);
    });
    self.stationLocation.push(nextStation);
  });

  // Filter stations
  this.filter = ko.observable("");
  this.filteredStations = ko.computed(function() {
    var filter = this.filter().toLowerCase();
    if (!filter) {
      return ko.utils.arrayFilter(this.stationLocation(), function(aStation) {
        aStation.marker().setVisible(true);
        return true
      });
    } else {
      return ko.utils.arrayFilter(this.stationLocation(), function(aStation) {
        if (aStation.title().toLowerCase().indexOf(filter) === 0) {
          return true
        } else {
          aStation.marker().setVisible(false);
          return false
        };
      });
    }
  }, this);

// Set initial station
//  this.currentStation = ko.observable([]);
  this.currentStation = ko.observable(this.stationLocation()[0] );

  this.switchStation = function(clickedStation) {
    self.currentStation(clickedStation);
    setCurrentStation(map,self.currentStation().title(),blue,green);
  };

  // Set current station 
  // - Change colour of pin
  // - Add station information to infowindow
  // - Lookup next three arrival times for south and north bound trains
  // - Open infowindow (inside JSON call to ensure data is retrived before window is opened
  function setCurrentStation(map,currentStationTitle,baseColor,currentColor) {
    for (var i = 0; i < self.stationLocation().length; i++) {
      if (self.stationLocation()[i].title() == currentStationTitle) {
        self.stationLocation()[i].marker().setIcon(currentColor);
        var stationInfo = '<p><b>'+self.currentStation().title()+'</b></p>'+'<p>'+self.currentStation().address()+'</p>';
        self.stationLocation()[i].infowindow().setContent(stationInfo); 
        getNextTrains('north',self.currentStation().northStop(),self.stationLocation()[i]); 
        getNextTrains('south',self.currentStation().southStop(),self.stationLocation()[i]);
      } else {
        self.stationLocation()[i].marker().setIcon(baseColor);
        self.stationLocation()[i].infowindow().close(map,self.stationLocation()[i].marker());
      }
      self.stationLocation()[i].marker().setMap(map);
    }
  }

  // ETS JSON request
  // Two calls to the API are needed to complete this request and populate the infowindow.
  // The first call is to get the next three arrival times for north bound trains and the second
  // call is to get the next three arrival times for south bound trains. Due to this, extra logic
  // was needed in the success section to ensure the window is populated and opened only after both
  // asynchronous calls are completed.
  // Note: Decided to build standard ajax call instead of getjson call so that certain aspects of
  // application could be tested with synchronous set to true.  
  //
  function getNextTrains(direction,stop_id,stationClicked) {  
    var nextThree; 
    if (direction == 'south') {
      var stop_headsign = 'Century%20Park';
    } else {
      var stop_headsign = 'Clareview';
    }
    var etsUrl = 'https://data.edmonton.ca/resource/xeux-ngrz.json?$query=SELECT%20arrival_time_2%20WHERE%20stop_id=%22'+stop_id+'%22%20AND%20stop_headsign=%22'+stop_headsign+'%22%20GROUP%20BY%20arrival_time_2%20ORDER%20BY%20arrival_time_2%20ASC';
    $.ajax({
      url: etsUrl,
      dataType: 'json',
      success: function(data) {
        arrivalTimes = data;
        var i = 0;
        if (arrivalTimes.length > 0) {
          var arrivalTime = arrivalTimes[i].arrival_time_2;
          while (timeNow() > arrivalTime) {
            i++;
            arrivalTime = arrivalTimes[i].arrival_time_2;
            if (i > arrivalTimes.length) {
              break;
            }
          }
          if (direction == 'south') {
            nextThree = '<p> South Trains: <br>'+arrivalTimes[i].arrival_time_2+'<br>'+arrivalTimes[i+1].arrival_time_2+'<br>'+arrivalTimes[i+2].arrival_time_2+'</p>';
          } else {
            nextThree = '<p> North Trains: <br>'+arrivalTimes[i].arrival_time_2+'<br>'+arrivalTimes[i+1].arrival_time_2+'<br>'+arrivalTimes[i+2].arrival_time_2+'</p>';
          }
        } else {
            nextThree = 'No Train Times Available';
        }
        if (direction == 'south') {
          stationClicked.infowindow().setContent(stationClicked.infowindow().getContent()+nextThree);
          stationClicked.infowindow().open(map,stationClicked.marker());
        } else {
          stationClicked.infowindow().setContent(stationClicked.infowindow().getContent()+nextThree);
        }
      },
      error: function(jqXHR, exception) {
        if (direction == 'south') {
          nextThree = '<p> South Trains: <br>Unable to access ETS stop times</p>';
          stationClicked.infowindow().setContent(stationClicked.infowindow().getContent()+nextThree);
          stationClicked.infowindow().open(map,stationClicked.marker());
        } else {
          nextThree = '<p> North Trains: <br>Unable to access ETS stop times</p>';
          stationClicked.infowindow().setContent(stationClicked.infowindow().getContent()+nextThree);
        }
        console.log('Status: '+jqXHR.status+' Exception: '+exception);
      }
    });
  };

  // Get current time. Used to determine next train times
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


