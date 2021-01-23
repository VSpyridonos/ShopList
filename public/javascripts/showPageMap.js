let testShop = []
let results = []

function initMap() {
    var infoWindow = new google.maps.InfoWindow();
    let geocoder = new google.maps.Geocoder();
    let matrixOptions = {
        origins: [String],
        destinations: [String],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    };

    let dests = [];
    let allMarkers = [];
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
        } else if (shop.organization === "Σκλαβενίτης") {
            total = sklavenitisT;
            hasAll = sklavenitisHasAll;
        }

        if (hasAll) {
            var marker = new google.maps.Marker({
                position: { lat: shop.geometry.coordinates[1], lng: shop.geometry.coordinates[0] },
                title: `${shop.title}\nΔιεύθυνση: ${shop.address}\nΣύνολο: ${total} €`,
                icon: shop.image,
                url: `${shop.site}`
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent(this.get('title'));
                infoWindow.open(map, this);
            });

            google.maps.event.addListener(marker, 'dblclick', function () {
                window.open(this.url);
            });

            allMarkers.push(marker);
            marker.setMap(map);
            let shopObject = {
                title: shop.title,
                price: total,
                address: shop.address,
                image: shop.image
            }
            shopInfo.push(shopObject)
            i++;

            // Vale ta coords tou kathe shop sto dests
            dests.push(`${shop.geometry.coordinates[1]},${shop.geometry.coordinates[0]}`)

        }


    }

    // destinations = pinakas me ola ta destinations
    matrixOptions.destinations = dests;

    let shopInfo2 = []

    function codeAddress() {

        geocoder.geocode({ address: userAddress }, function (results, status) {
            //console.log(biasedUserAddress)
            if (status == 'OK') {
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: userAddress,
                    icon: 'http://maps.google.com/mapfiles/kml/pal3/icon48.png'
                });


                const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
                matrixOptions.origins = [String(userAddress)]


                // Call Distance Matrix service
                service.getDistanceMatrix(matrixOptions, callback);

                // Callback function used to process Distance Matrix response
                function callback(response, status) {
                    if (status !== "OK") {
                        alert("Error with distance matrix");
                        return;
                    }
                    let i = 0;
                    for (let marker of allMarkers) {
                        marker.setTitle(`
                         ${marker.title}\nΑπόσταση:  ${response.rows[0].elements[i].distance.text}\nΧρόνος: ${response.rows[0].elements[i].duration.text}\n\nΚάντε διπλό κλικ για να κατευθυνθείτε στον ιστότοπο του καταστήματος
                         `);

                        // Prosthetw ta stoixeia sta objects

                        shopObject = {
                            title: shopInfo[i].title,
                            price: shopInfo[i].price,
                            address: shopInfo[i].address,
                            image: shopInfo[i].image,
                            distance: `${response.rows[0].elements[i].distance.text}`,
                            duration: `${response.rows[0].elements[i].duration.text}`
                        }

                        shopInfo2.push(shopObject);

                        i++;

                        if (i == shopInfo.length) {
                            for (let sh of shopInfo2) {
                                let result = parseInt(sh.price) * 0.8 + parseInt(sh.duration.slice(0, 2).trim()) * 0.2;
                                results.push(result)
                            }
                        }
                        let min = 1000;
                        let index = 0;
                        for (let i = 0; i < results.length; i++) {
                            if (results[i] < min) {
                                min = results[i];
                                index = i;
                            }
                        }
                        window.onload = function () {

                            document.getElementById("recommendationImage").src = shopInfo2[index].image;

                            document.getElementById("recommendationTitle").innerHTML = `${shopInfo2[index].title}`;

                            document.getElementById("recommendationAddress").innerHTML = `Διεύθυνση: ${shopInfo2[index].address}`;

                        }

                    }
                }

            }

        });

    }

    codeAddress();

}

initMap();