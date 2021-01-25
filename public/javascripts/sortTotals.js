if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    sortTotals();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        sortTotals();
    });
}

function sortTotals() {
    const organizations = [
        { "name": "Μασούτης", "total": masoutisT, "hasAllProducts": masoutisHasAll },
        { "name": "myMarket", "total": myMarketT, "hasAllProducts": myMarketHasAll },
        { "name": "ΑΒ Βασιλόπουλος", "total": vasilopoulosT, "hasAllProducts": vasilopoulosHasAll },
        { "name": "Σκλαβενίτης", "total": sklavenitisT, "hasAllProducts": sklavenitisHasAll }
    ]

    // Auksousa taksinomisi me vasi tin timi
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < organizations.length - 1; i++) {
            if (organizations[i].total > organizations[i + 1].total) {
                let temp = organizations[i];
                organizations[i] = organizations[i + 1];
                organizations[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);


    const totalsList = document.getElementById("totals-list");

    for (let org of organizations) {
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        totalsList.appendChild(li);
        if (org.hasAllProducts) li.innerHTML = `<strong>${org.name}: ${org.total} €</strong>`;
        else li.innerHTML = `<strong>${org.name}: ${org.total} € <span style="color: red;"> &nbsp;&nbsp;*Το κατάστημα δε διαθέτει όλα τα προϊόντα της λίστας!</span></strong>`;
    }
};
