## Edmonton Subway Transit Map

This website lists the Edmonton Subway stops on the Metro north south line. It was built to improve my JavaScript skills as part of Udacity's Front-End Nanodegree. 
The website uses the Knockout Javascript library to allow dynamic updating of the UI based on the user's actions.

### Station List

The site contains a list of all the subway stations on the Metro Line. Clicking a station highlights the marker on the map, brings up a information window with the next three train arrival times, and shows a picture of the station.
 
### Map

Displays a marker for each station on the Metro Line. Clicking on a marker highlights the marker on the map, brings up a information window with the next three train arrival, and shows a picture of the station.

### Filter

The station list can be filtered by using the Filter input box. If the currently selected station is filtered off the map, the current station is reset to null (initial state).


### Edmonton Transit API

The City of Edmonton makes available a number of datasets through their open data portal. 

The stop times for each station were gathered through a json call to the [ETS Bus Schedule GTFS Data Feed - Stop Times](https://data.edmonton.ca/Transit/ETS-Bus-Schedule-GTFS-Data-Feed-Stop-Times/ebvt-eg97) data feed.

The stop ids for each station were identified directly from the [ETS Bus Schedule GTFS Data Feed - Stops](https://data.edmonton.ca/Transit/ETS-Bus-Schedule-GTFS-Data-Feed-Stops/4vt2-8zrq) data feed.

Each time a station is clicked, two API calls are generated to find the next three train arrival times going north and south. As the stop ids are different for each station the API calls must be dynamically generated.

API Issue Notes:
The ETS data sets were structured in such a way that stop times between the three different schedules (Weekday, Saturday, Sunday) could not be separated. The way the data sets were flattened the releationships between stop times and schedules could not be linked through any of the data sets. Due to this the train arrival times are not completely accurate. For project purposes, though, the API calls satisfy the exercise.
