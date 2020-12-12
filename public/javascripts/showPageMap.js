function initMap() {
    let geocoder = new google.maps.Geocoder();
    let matrixOptions = {
        origins: [String], // technician locations
        destinations: [String], // customer address
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    };

    let dests = [];
    let allMarkers = [];
    let shopObject = {
        title: String,
        price: Number,
        address: String,
        distance: String,
        duration: String,
        result: Number
    }
    let shopInfo = [];

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.6655, lng: 20.8559 },
        zoom: 12,
    });

    let i = 0;
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
                icon: shop.image,
                url: `${shop.site}`
            });

            google.maps.event.addListener(marker, 'click', function () {
                window.location.href = this.url;
            });

            allMarkers.push(marker);
            marker.setMap(map);
            shopInfo[i] = {
                title: shop.title,
                price: total,
                address: shop.address
            }
            i++;

            // Vale ta coords tou kathe shop sto dests
            dests.push(`${shop.geometry.coordinates[1]},${shop.geometry.coordinates[0]}`)

        }


    }

    // destinations = pinakas me ola ta destinations
    matrixOptions.destinations = dests;

    let biasedUserAddress = userAddress + ' Ιωάννινα';

    function codeAddress() {
        geocoder.geocode({ address: biasedUserAddress }, function (results, status) {
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
                         ${marker.title}\nΑπόσταση:  ${response.rows[0].elements[i].distance.text}\nΧρόνος: ${response.rows[0].elements[i].duration.text}\n\nΚάντε κλικ για να κατευθυνθείτε στον ιστότοπο του καταστήματος
                         `);

                        // Prosthetw ta stoixeia sta objects
                        shopInfo[i].distance = `${response.rows[0].elements[i].distance.text}`;
                        shopInfo[i].duration = `${response.rows[0].elements[i].duration.text}`;
                        i++;

                    }
                }


            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });



    }

    codeAddress();
    for (let sh of shopInfo) {
        console.log(sh)
    }

}


initMap();