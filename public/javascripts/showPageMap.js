mapboxgl.accessToken = mapToken;
const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;



// let map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
//     center: [20.85336, 39.663259], // starting position [lng, lat]
//     zoom: 11.5 // starting zoom
// });

// const loader = new Loader({
//     apiKey: googleMapsKey,
//     version: "weekly"
// });
// loader.load().then(() => {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: 20.85336, lng: 39.663259 },
//         zoom: 8
//     });
// });

// let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.6655, lng: 20.8559 },
        zoom: 8,
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
            var marker = new google.maps.Marker({
                position: { lat: shop.geometry.coordinates[1], lng: shop.geometry.coordinates[0] },
                title: `${shop.title} ${total}`,
            });
            marker.setMap(map);
        }
    }
}





initMap()



// function initMap() {
//     const myLatLng = { lat: 39.6655, lng: 20.8559 };
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 8,
//         center: { myLatLng },
//     });

// }
// initMap()


// for (let shop of allShops) {
//     let total = 0;
//     let hasAll;
//     if (shop.organization === "Μασούτης") {
//         total = masoutisT;
//         hasAll = masoutisHasAll;
//     } else if (shop.organization === "My market") {
//         total = myMarketT;
//         hasAll = myMarketHasAll;
//     }

//     if (hasAll) {
//         new mapboxgl.Marker()
//             .setLngLat(shop.geometry.coordinates)
//             .setPopup(
//                 new mapboxgl.Popup({ offset: 25 })
//                     .setHTML(
//                         `<h3><a href="${shop.site}"><strong>${shop.title}</strong></a></h3>
//                      <h6>${shop.address}</h6>
//                      <h3><strong>${total}&euro;</strong></h3>`
//                     )
//             )
//             .addTo(map)
//     }

// }
