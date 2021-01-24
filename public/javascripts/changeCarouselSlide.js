const leaflets = ['myMarket', 'Μασούτης', 'Express Market'];
let currentIndex = 0;
let shopTitle = document.getElementById('shop-title');

document.getElementById("previous-button").onclick = function () {
    currentIndex--;
    if (currentIndex < 0) currentIndex = leaflets.length - 1;
    shopTitle.textContent = leaflets[currentIndex];
}

document.getElementById("next-button").onclick = function () {
    currentIndex++;
    if (currentIndex > leaflets.length - 1) currentIndex = 0;
    shopTitle.textContent = leaflets[currentIndex];
}