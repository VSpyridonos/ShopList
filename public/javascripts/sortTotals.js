document.addEventListener('DOMContentLoaded', sortTotals);

function sortTotals() {
    const organizations = [
        { "name": "Μασούτης", "total": parseFloat(masoutisT), "hasAllProducts": masoutisHasAll },
        { "name": "myMarket", "total": parseFloat(myMarketT), "hasAllProducts": myMarketHasAll },
        { "name": "ΑΒ Βασιλόπουλος", "total": parseFloat(vasilopoulosT), "hasAllProducts": vasilopoulosHasAll },
        { "name": "Σκλαβενίτης", "total": parseFloat(sklavenitisT), "hasAllProducts": sklavenitisHasAll }
    ]

    // Auksousa taksinomisi me vasi tin timi
    let swapped;
    let n = organizations.length - 1;
    do {
        swapped = false;
        for (let i = 0; i < n; i++) {
            if (organizations[i].total > organizations[i + 1].total) {
                let temp = organizations[i];
                organizations[i] = organizations[i + 1];
                organizations[i + 1] = temp;
                swapped = true;
            }
        }
        n--;
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
