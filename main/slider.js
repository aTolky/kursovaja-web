document.addEventListener('DOMContentLoaded', function () {
    const workCardsContainer = document.getElementById('work-cards-container');
    const workCards = document.getElementById('work-cards');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pagination = document.getElementById('pagination');
    let currentIndex = 0;
    let worksData = [];
    let itemsPerSlide = 1;

    fetch('./works.json')
        .then(response => response.json())
        .then(data => {
            worksData = data.works;
            updateItemsPerSlide();
            displayWorks();
            createPagination();
        });

    function updateItemsPerSlide() {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1280) {
            itemsPerSlide = 3;
        } else if (screenWidth >= 768) {
            itemsPerSlide = 2;
        } else {
            itemsPerSlide = 1;
        }
    }

    function displayWorks() {
        const start = currentIndex * itemsPerSlide;
        const end = start + itemsPerSlide;
        const worksToDisplay = worksData.slice(start, end);

        workCards.innerHTML = '';

        worksToDisplay.forEach(work => {
            const workCard = document.createElement('div');
            workCard.className = 'work-card';
            workCard.id = work.id;

            let resultsHTML = '';
            work.results.forEach(result => {
                resultsHTML += `<div class="result"><strong>${result.value}</strong><span>${result.description}</span></div>`;
            });

            let systemsHTML = '';
            work.systems.forEach(system => {
                systemsHTML += `<img src="${system.img}" alt="${system.alt}">`;
            });

            workCard.innerHTML = `
                <div class="work-header">
                    <img src="../image/${work.header}Logo.png" alt="${work.header}">
                </div>
                <p>${work.description}</p>
                <div class="work-results">${resultsHTML}</div>
                <div class="systems"><span>СИСТЕМЫ:</span>${systemsHTML}</div>
            `;

            workCards.appendChild(workCard);
        });

        // Устанавливаем ширину work-cards в зависимости от количества элементов
        workCards.style.width = `${worksData.length * (100 / itemsPerSlide)}%`;
        workCards.style.transform = `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`;
    }

    function updateIndex(offset) {
        const totalItems = worksData.length;
        currentIndex += offset;

        // Если вышли за пределы, возвращаемся к началу или концу
        if (currentIndex < 0) {
            currentIndex = totalItems - itemsPerSlide;
        } else if (currentIndex >= totalItems - itemsPerSlide) {
            currentIndex = 0;
        }

        displayWorks();
        updatePagination();
    }

    function createPagination() {
        const totalPages = Math.ceil(worksData.length / itemsPerSlide);
        pagination.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const page = document.createElement('div');
            page.className = 'page';
            page.dataset.index = i;

            if (i === currentIndex) {
                page.classList.add('active');
            }

            page.addEventListener('click', function() {
                currentIndex = Number(page.dataset.index);
                displayWorks();
                updatePagination();
            });

            pagination.appendChild(page);
        }
    }

    function updatePagination() {
        const pages = document.querySelectorAll('.pagination .page');
        pages.forEach(page => {
            page.classList.remove('active');
        });
        if (pages[currentIndex]) {
            pages[currentIndex].classList.add('active');
        }
    }

    prevBtn.addEventListener('click', function () {
        updateIndex(-1);
    });

    nextBtn.addEventListener('click', function () {
        updateIndex(1);
    });

    window.addEventListener('resize', function () {
        updateItemsPerSlide();
        displayWorks();
        createPagination();
    });

    // Начальная инициализация
    updateItemsPerSlide();
    displayWorks();
    createPagination();
});
