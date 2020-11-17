mapboxgl.accessToken = mapToken;



let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [20.85336, 39.663259], // starting position [lng, lat]
    zoom: 12 // starting zoom
});


for (let shop of allShops) {
    new mapboxgl.Marker()
        .setLngLat(shop.geometry.coordinates)
        //.setLngLat(allShops[0].geometry.coordinates[0], allShops[0].geometry.coordinates[1])
        .addTo(map)

}
