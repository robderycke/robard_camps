// #region *** DOM references                           ***********
const backToTopBtn = document.querySelector('.js-back-to-top');
const routesContainer = document.querySelector('.js-routes-container');
const filterButtons = document.querySelectorAll('.js-filter-btn');
// #endregion

// Dataset met objecten & mock data voor de routes
const routesData = [
    { id: 1, title: "Natuurpark De Blaarmeersen", distance: 4.2, duration: "1u", difficulty: "Eenvoudig", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80", desc: "Een vlakke, ontspannende route door een prachtig moerasbosrijke habitat." },
    { id: 2, title: "Stadswandeling Gent", distance: 3.5, duration: "50m", difficulty: "Eenvoudig", img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80", desc: "Verken de historische pleinen, burchten en verborgen groene steegjes langs de Leie." },
    { id: 3, title: "Heuvelrug Panorama Trail", distance: 14.5, duration: "3.5u", difficulty: "Gemiddeld", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80", desc: "Een prachtige panoramische route met lichte stijging over onverharde veldwegen." },
    { id: 4, title: "Hoge Venen Survival", distance: 26.8, duration: "7u", difficulty: "Zwaar", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80", desc: "Uitdagende hoogtemeters en modderige houten vlonderpaden die uithoudingsvermogen eisen." }
];

// #region *** Callback-Visualisation - show___         ***********
const showBackToTopButton = () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('c-back-to-top--visible');
    } else {
        backToTopBtn.classList.remove('c-back-to-top--visible');
    }
};

const showRoutes = (routes) => {
    if (!routesContainer) return;
    
    routesContainer.innerHTML = "";

    if (routes.length === 0) {
        routesContainer.innerHTML = `<div class="col-12 text-center text-muted py-5"><p>Geen routes gevonden die aan deze afstand voldoen.</p></div>`;
        return;
    }

    let htmlString = "";
    for (const route of routes) {
        htmlString += `
            <div class="col-md-6 col-lg-3">
                <div class="card c-route-card h-100 shadow-sm">
                    <img src="${route.img}" class="card-img-top c-route-card__img" alt="${route.title}">
                    <div class="card-body p-3">
                        <h3 class="h6 fw-bold c-route-card__title">${route.title}</h3>
                        <p class="card-text text-muted small">${route.desc}</p>
                        <div class="d-flex justify-content-between text-muted x-small mt-2 border-top pt-2">
                            <span><i class="bi bi-geo-alt-fill"></i> ${route.distance}km</span>
                            <span><i class="bi bi-clock"></i> ${route.duration}</span>
                            <span><i class="bi bi-bar-chart-fill"></i> ${route.difficulty}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    routesContainer.innerHTML = htmlString;
};

const showActiveFilterButton = (activeButton) => {
    filterButtons.forEach(btn => {
        btn.classList.remove('c-btn--primary');
        btn.classList.add('btn-outline-secondary');
    });
    activeButton.classList.add('c-btn--primary');
    activeButton.classList.remove('btn-outline-secondary');
};
// #endregion

// #region *** Callback-No Visualisation - callback___  ***********
const callbackFilterDistance = (e) => {
    const targetButton = e.currentTarget;
    const maxDistanceRule = targetButton.getAttribute('data-max-distance');
    
    showActiveFilterButton(targetButton);

    if (maxDistanceRule === "all") {
        showRoutes(routesData);
    } else if (maxDistanceRule === "5") {
        const filtered = routesData.filter(route => route.distance <= 5);
        showRoutes(filtered);
    } else if (maxDistanceRule === "20") {
        const filtered = routesData.filter(route => route.distance > 5 && route.distance <= 20);
        showRoutes(filtered);
    } else if (maxDistanceRule === "999") {
        const filtered = routesData.filter(route => route.distance > 20);
        showRoutes(filtered);
    }
};
// #endregion

// #region *** Data Access - get___                     ***********
// #endregion

// #region *** Event Listeners - listenTo___            ***********
const listenToScroll = () => {
    window.addEventListener('scroll', showBackToTopButton);
};

const listenToUiInteractions = () => {
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

const listenToFilters = () => {
    filterButtons.forEach(button => {
        button.addEventListener('click', callbackFilterDistance);
    });
};
// #endregion

// #region *** Init / DOMContentLoaded                  ***********
const init = () => {
    console.log('Robard Camps application initialization loaded.');
    listenToScroll();
    listenToUiInteractions();
    
    if (routesContainer) {
        showRoutes(routesData);
        listenToFilters();
    }
};

document.addEventListener('DOMContentLoaded', init);
// #endregion