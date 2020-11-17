mapboxgl.accessToken = mapToken;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [20.853624, 39.664849], // starting position [lng, lat]
    zoom: 12 // starting zoom
});



new mapboxgl.Marker()
    .setLngLat([20.843286, 39.644403])
    //.setLngLat(allShops[0].geometry.coordinates[0], allShops[0].geometry.coordinates[1])
    .addTo(map)
