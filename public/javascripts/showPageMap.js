mapboxgl.accessToken = mapToken;



let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [20.85336, 39.663259], // starting position [lng, lat]
    zoom: 12 // starting zoom
});


for (let shop of allShops) {
    let total = 0;
    let hasAll;
    if (shop.organization === "Μασούτης") {
        total = masoutisT;
        hasAll = masoutisHasAll;
    } else if (shop.organization === "My market") {
        total = myMarketT;
        hasAll = myMarketHasAll;
    }

    if (hasAll) {
        new mapboxgl.Marker()
            .setLngLat(shop.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setHTML(
                        `<h3><a href="${shop.site}"><strong>${shop.title}</strong></a></h3>
                     <h6>${shop.address}</h6>
                     <h3><strong>${total}&euro;</strong></h3>`
                    )
            )
            .addTo(map)
    }

}
