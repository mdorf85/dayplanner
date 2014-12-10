$(document).ready(function(){

  var baseLayer = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20
  });

  var mainEvent = L.marker(gon.mainEventLL).bindPopup('Main Event: ' + gon.mainEvent.name);
  var mainEventLayer = L.layerGroup([mainEvent]);

  var food_layers= [];
  var night_layers = [];
  var sights_layers = [];

  for (var i = 0; i < 5; i++)
  {
    food_layers.push(L.layerGroup([L.marker([gon.food[i].lat, gon.food[i].long]).bindPopup("Restaurant: " + gon.food[i].name)]));

    night_layers.push(L.layerGroup([L.marker([gon.night[i].lat, gon.night[i].long]).bindPopup("Nightlife: " + gon.night[i].name)]));

    sights_layers.push(L.layerGroup([L.marker([gon.sights[i].lat, gon.sights[i].long]).bindPopup("Sights: " + gon.sights[i].name)]));
  }

 //Add every single layerGroup to overlayMaps

  // var f1,f2,f3,f4,f5,n1,n2,n3,s1,s2,s3,s4,s5;

  var overlayMaps = {
    "Main Event": mainEventLayer,
    "f1": food_layers[0],
    "f2": food_layers[1],
    "f3": food_layers[2],
    "f4": food_layers[3],
    "f5": food_layers[4],
    "n1": night_layers[0],
    "n2": night_layers[1],
    "n3": night_layers[2],
    "n4": night_layers[3],
    "n5": night_layers[4],
    "s1": sights_layers[0],
    "s2": sights_layers[1],
    "s3": sights_layers[2],
    "s4": sights_layers[3],
    "s5": sights_layers[4]
  };

  var map = L.map('map', {
    center: gon.mainEventLL,
    zoom: 15,
    //layers: [regLayer]
    layers: [baseLayer],
    // autoPan: false
    // zoomControl: false
    });

  L.control.layers(null, overlayMaps).addTo(map); //makes control box

  $('p').find('a[href$="map-section"]').on('click', function(){
    $("span:contains('Main Event')").click();
  });

});


