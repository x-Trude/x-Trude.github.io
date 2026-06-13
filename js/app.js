fetch(`products.json?ts=${Date.now()}`)
.then(res => res.json())
.then(data => {

    renderProducts(data.splash, "splash-grid");
    renderProducts(data.printsh1t, "print-grid");
    renderProducts(data.divers, "divers-grid");

    // 👉 centrage après rendu
    updateCarouselCentering("splash-grid");
    updateCarouselCentering("print-grid");
    updateCarouselCentering("divers-grid");
});

function renderProducts(products, containerId){

    const container = document.getElementById(containerId);

    products.forEach(product => {

        if (product.zoom === true) {

            container.innerHTML += `
                <div class="card zoomable" data-img="${product.image}">
                    <div class="thumb">
                        <img src="${product.image}">
                    </div>
                    <p>${product.title}</p>
                </div>
            `;
        }

        else {

            container.innerHTML += `
                <a class="card" href="${product.url}" target="_blank">
                    <div class="thumb">
                        <img src="${product.image}">
                    </div>
                    <p>${product.title}</p>
                </a>
            `;
        }
    });
}

function scrollCarousel(id, direction){

    const container = document.getElementById(id);

    const scrollAmount = container.clientWidth * 0.9;

    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function openLightbox(src){

    const img = document.getElementById("lightbox-img");
    const box = document.getElementById("lightbox");

    if(!img || !box) return;

    img.src = src;
    box.style.display = "flex";
}

document.addEventListener("click", function(e){

    const card = e.target.closest(".zoomable");
    if(!card) return;

    const img = card.querySelector("img");

    if(!img || !img.src){
        console.log("NO IMAGE FOUND");
        return;
    }

    openLightbox(img.src);
});


// ===============================
// 🔥 CENTRAGE AUTO CAROUSEL
// ===============================

function updateCarouselCentering(id) {
    const carousel = document.getElementById(id);
    if (!carousel) return;

    const items = carousel.children.length;

    carousel.classList.remove("centered");

    // estimation largeur d'une card (stable avec ton design)
    const cardWidth = 260;

    const totalWidth = items * cardWidth;

    if (totalWidth < carousel.offsetWidth) {
        carousel.classList.add("centered");
    }
}

window.addEventListener("resize", () => {
    updateCarouselCentering("splash-grid");
    updateCarouselCentering("print-grid");
    updateCarouselCentering("divers-grid");
});
