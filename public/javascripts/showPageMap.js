//mapboxgl.accessToken = mapToken;
//const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;
//const axios = require('axios');
//const User = require('../../models/user');



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

//let map;
//let geocoder;

// const matrixOptions = {
//     origins: ["41.8848274,-87.6320859", "41.878729,-87.6301087", "41.8855277,-87.6440611"], // technician locations
//     destinations: ["233 S Wacker Dr, Chicago, IL 60606"], // customer address
//     travelMode: 'DRIVING',
//     unitSystem: google.maps.UnitSystem.IMPERIAL
// };


function initMap() {
    let geocoder = new google.maps.Geocoder();
    let matrixOptions = {
        origins: [String], // technician locations
        destinations: [String], // customer address
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    };

    dests = []
    allMarkers = []

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.6655, lng: 20.8559 },
        zoom: 12,
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
        } else if (shop.organization === "ΑΒ Βασιλόπουλος") {
            total = vasilopoulosT;
            hasAll = vasilopoulosHasAll;
        }

        if (hasAll) {
            var marker = new google.maps.Marker({
                position: { lat: shop.geometry.coordinates[1], lng: shop.geometry.coordinates[0] },
                title: `${shop.title}\nΣύνολο: ${total}€`,
                icon: shop.image
            });
            allMarkers.push(marker);
            marker.setMap(map);

            // Vale ta coords tou kathe shop sto dests
            dests.push(`${shop.geometry.coordinates[1]},${shop.geometry.coordinates[0]}`)

        }


    }

    // destinations = pinakas me ola ta destinations
    matrixOptions.destinations = dests;

    function codeAddress() {
        geocoder.geocode({ address: userAddress }, function (results, status) {
            if (status == 'OK') {
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: userAddress,
                    icon: 'http://maps.google.com/mapfiles/kml/pal3/icon48.png'
                });


                const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
                matrixOptions.origins = [String(userAddress)]

                console.log(matrixOptions.origins[0])

                // Call Distance Matrix service
                service.getDistanceMatrix(matrixOptions, callback);

                // Callback function used to process Distance Matrix response
                function callback(response, status) {
                    if (status !== "OK") {
                        alert("Error with distance matrix");
                        return;
                    }
                    console.log('response = ', response);
                    let i = 0;
                    for (let marker of allMarkers) {
                        marker.setTitle(`
                         ${marker.title}\nΑπόσταση:  ${response.rows[0].elements[i].distance.text}\nΧρόνος: ${response.rows[0].elements[i].duration.text}`);
                        i++;
                        console.log(`${response.rows[0].elements[i].distance.text}`)
                    }
                }




            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });


        console.log("TEST2")
    }

    codeAddress();
    console.log("TEST3")







    // await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    //     params: {
    //         address: req.user.address,
    //         key: gkey
    //     }
    // })
    //     .then(function (response) {
    //         console.log(response);

    //         let lat = response.data.results[0].geometry.location.lat;
    //         let lng = response.data.results[0].geometry.location.lng;

    //         var marker = new google.maps.Marker({
    //             position: { lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng },
    //             title: `${req.user.address}`,
    //         });
    //         marker.setMap(map);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // console.log("TEST3")
}

// function codeAddress() {
//     geocoder.geocode({ 'address': req.user.address }, function (results, status) {
//         if (status == 'OK') {
//             var marker = new google.maps.Marker({
//                 map: map,
//                 position: results[0].geometry.location
//             });
//         } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }




initMap();
//codeAddress();



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
